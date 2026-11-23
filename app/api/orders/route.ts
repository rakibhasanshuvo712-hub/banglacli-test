import { NextResponse } from "next/server";
import { Resend } from "resend";
import { products } from "@/lib/data";

type OrderBody = {
  name: string;
  phone: string;
  email: string;
  address: string;
  bouquet: string;
  note: string;
  website: string;
};

const PHONE_PATTERN = /^[+\d][\d\s-]{6,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  address: 300,
  bouquet: 120,
  note: 1000,
  website: 100,
} as const;

function textField(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BS-${stamp}-${suffix}`;
}

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid order details. Please try again." }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid order details. Please try again." }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  // Honeypot: real users never see or fill this field.
  if (textField(body.website, LIMITS.website)) {
    return NextResponse.json({ ok: true, id: "ignored" }, { status: 202 });
  }

  const order: OrderBody = {
    name: textField(body.name, LIMITS.name),
    phone: textField(body.phone, LIMITS.phone),
    email: textField(body.email, LIMITS.email),
    address: textField(body.address, LIMITS.address),
    bouquet: textField(body.bouquet, LIMITS.bouquet),
    note: textField(body.note, LIMITS.note),
    website: "",
  };

  const invalid: string[] = [];
  if (!order.name) invalid.push("name");
  if (!PHONE_PATTERN.test(order.phone)) invalid.push("phone");
  if (order.email && !EMAIL_PATTERN.test(order.email)) invalid.push("email");
  if (!order.address) invalid.push("address");
  if (!products.some((product) => product.name === order.bouquet)) invalid.push("bouquet");

  if (invalid.length > 0) {
    return NextResponse.json(
      {
        error: `Please check: ${invalid.join(", ")}.`,
        fields: invalid,
      },
      { status: 400 },
    );
  }

  const product = products.find((item) => item.name === order.bouquet)!;
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL;
  const sender = process.env.ORDER_FROM_EMAIL || "Bloom & Stem <onboarding@resend.dev>";

  if (!apiKey || !recipient) {
    console.error(
      "Order notifications are not configured. Set RESEND_API_KEY and ORDER_NOTIFICATION_EMAIL.",
    );
    return NextResponse.json(
      {
        error:
          "Online ordering is being set up. Please call the studio to place your order right now.",
      },
      { status: 503 },
    );
  }

  const orderId = createOrderId();
  const placedAt = new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  const price = `৳ ${product.price.toLocaleString("en-BD")}`;

  const text = [
    `New order ${orderId}`,
    `Placed: ${placedAt} (Dhaka time)`,
    "",
    `Bouquet: ${product.name}`,
    `Price: ${price}`,
    `Stems: ${product.stems}`,
    "",
    `Customer: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email || "Not provided"}`,
    `Delivery address: ${order.address}`,
    "",
    `Note: ${order.note || "None"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#3d1f2a;max-width:600px;margin:auto">
      <h1 style="font-size:22px;margin:0 0 6px">New flower order · ${orderId}</h1>
      <p style="color:#8b6b76;font-size:13px;margin:0 0 24px">Placed ${escapeHtml(placedAt)} (Dhaka time)</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7;width:150px"><strong>Bouquet</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(product.name)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7"><strong>Price</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(price)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7"><strong>Customer</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(order.name)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7"><strong>Phone</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(order.phone)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(order.email || "Not provided")}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e2e7;vertical-align:top"><strong>Delivery address</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0e2e7">${escapeHtml(order.address)}</td></tr>
        <tr><td style="padding:10px 0;vertical-align:top"><strong>Note</strong></td><td style="padding:10px 0">${escapeHtml(order.note || "None")}</td></tr>
      </table>
      <p style="margin-top:28px;font-size:12px;color:#8b6b76">Reply to this email to contact the customer directly.</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: order.email || undefined,
      subject: `New order ${orderId} — ${product.name} (${price})`,
      text,
      html,
    });

    if (error) {
      console.error("Resend failed to send order notification:", error);
      return NextResponse.json(
        { error: "We couldn't send your order right now. Please try again or call the studio." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? orderId }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error while sending order notification:", error);
    return NextResponse.json(
      { error: "We couldn't send your order right now. Please try again or call the studio." },
      { status: 500 },
    );
  }
}
