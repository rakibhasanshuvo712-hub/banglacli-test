import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 160;

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid signup details." }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid signup details." }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  // Honeypot — bots fill this hidden field, real visitors never do.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error(
      "Newsletter signups are not configured. Set RESEND_API_KEY and RESEND_AUDIENCE_ID.",
    );
    return NextResponse.json(
      {
        error:
          "Signups are temporarily unavailable. Please email the studio and we'll add you.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      // Subscribing twice should be a success, not an error, for the visitor.
      const alreadySubscribed = /already|exist/i.test(error.message);
      if (!alreadySubscribed) {
        console.error("Resend failed to add newsletter contact:", error);
        return NextResponse.json(
          { error: "We couldn't save your email right now. Please try again." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (cause) {
    console.error("Unexpected error while adding newsletter contact:", cause);
    return NextResponse.json(
      { error: "We couldn't save your email right now. Please try again." },
      { status: 500 },
    );
  }
}
