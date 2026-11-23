"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website }),
      });
      const result: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setEmail("");
      setStatus("success");
      setMessage("You're on the list — thank you!");
    } catch (cause) {
      setStatus("error");
      setMessage(
        cause instanceof Error
          ? cause.message
          : "We couldn't reach the studio. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="mt-5" noValidate>
      <div className="flex gap-2 rounded-full border border-cream/20 bg-cream/10 p-1.5 transition-colors focus-within:border-blush/70">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
            setMessage("");
          }}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          autoComplete="email"
          maxLength={160}
          disabled={status === "submitting"}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-cream outline-none placeholder:text-cream/40 disabled:opacity-60"
        />
        <button
          type="submit"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-base text-plum transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blush disabled:opacity-60"
          aria-label="Subscribe to bloom notes"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span
              className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-plum border-t-transparent"
              aria-hidden="true"
            />
          ) : (
            <span aria-hidden="true">→</span>
          )}
        </button>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-2 text-xs ${status === "error" ? "text-blush" : "text-cream/80"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
