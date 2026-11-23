"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FlowerMark } from "@/components/flower-mark";
import { BloomSketch, FlourishDivider } from "@/components/ornaments";
import { products } from "@/lib/data";

type OrderFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  bouquet: string;
  note: string;
  website: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const initialState: OrderFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  bouquet: products[0].name,
  note: "",
  website: "",
};

export function OrderForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<OrderFormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  // "Order" links carry ?bouquet=<id>. Until the visitor picks a bouquet
  // themselves, the linked arrangement stays selected — including after
  // client-side navigation to a different product.
  const [bouquetChanged, setBouquetChanged] = useState(false);
  const requestedBouquet = products.find(
    (product) => product.id === searchParams.get("bouquet"),
  );
  const activeBouquet =
    !bouquetChanged && requestedBouquet
      ? requestedBouquet.name
      : form.bouquet;

  function update(field: keyof OrderFormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
    if (status !== "submitting") setStatus("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please add your name, phone number and delivery address.");
      setStatus("error");
      return;
    }
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address, or leave it blank.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bouquet: activeBouquet }),
      });
      const result: { id?: string; error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setOrderId(result.id || "");
      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We couldn't reach the studio. Please try again or call us.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-plum/10 bg-white p-10 text-center shadow-[0_30px_80px_-45px_rgba(61,31,42,0.6)]">
        <BloomSketch className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 text-rose/[0.07]" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-blush text-2xl text-rose">
          ✓
        </span>
        <h3 className="relative mt-6 font-display text-4xl font-semibold">
          Your blooms are on the way
        </h3>
        <FlourishDivider className="relative mt-5" />
        <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-plum/60">
          Thanks, {form.name.split(" ")[0]}! Your {activeBouquet} order has reached
          our studio. We&apos;ll call {form.phone} to confirm the details.
        </p>
        {orderId ? (
          <p className="relative mt-5 rounded-full bg-cream-deep px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-plum/60 uppercase">
            Order {orderId}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setBouquetChanged(false);
            setOrderId("");
            setStatus("idle");
          }}
          className="btn-outline relative mt-8"
        >
          Place another order
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-[32px] border border-plum/10 bg-white p-6 shadow-[0_30px_80px_-45px_rgba(61,31,42,0.6)] sm:p-9"
    >
      <BloomSketch className="pointer-events-none absolute -top-14 -right-12 h-56 w-56 text-rose/[0.05]" />

      <div className="relative mb-8 flex items-start justify-between gap-5 border-b border-plum/10 pb-6">
        <div>
          <span className="micro-label text-rose">The order card</span>
          <h3 className="mt-2 font-display text-3xl font-semibold">Make it yours</h3>
          <p className="mt-1 text-xs text-plum/50">A few details and we&apos;ll take it from here.</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream-deep text-rose">
          <FlowerMark className="h-6 w-6" />
        </span>
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="order-name" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
            Full name
          </label>
          <input
            id="order-name"
            className="field"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            disabled={submitting}
            maxLength={120}
            required
          />
        </div>
        <div>
          <label htmlFor="order-phone" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
            Phone number
          </label>
          <input
            id="order-phone"
            type="tel"
            className="field"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+880 1XXX XXXX"
            autoComplete="tel"
            disabled={submitting}
            maxLength={40}
            required
          />
        </div>
        <div>
          <label htmlFor="order-email" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
            Email <span className="font-normal tracking-normal text-plum/40 normal-case">(optional)</span>
          </label>
          <input
            id="order-email"
            type="email"
            className="field"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={submitting}
            maxLength={160}
          />
        </div>
        <div>
          <label htmlFor="order-bouquet" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
            Choose a bouquet
          </label>
          <select
            id="order-bouquet"
            className="field"
            value={activeBouquet}
            onChange={(event) => {
              update("bouquet", event.target.value);
              setBouquetChanged(true);
            }}
            disabled={submitting}
          >
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name} — ৳ {product.price.toLocaleString("en-BD")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative mt-5">
        <label htmlFor="order-address" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
          Delivery address
        </label>
        <input
          id="order-address"
          className="field"
          value={form.address}
          onChange={(event) => update("address", event.target.value)}
          placeholder="House, street, area, city"
          autoComplete="street-address"
          disabled={submitting}
          maxLength={300}
          required
        />
      </div>

      <div className="relative mt-5">
        <label htmlFor="order-note" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] uppercase">
          A little note <span className="font-normal tracking-normal text-plum/40 normal-case">(optional)</span>
        </label>
        <textarea
          id="order-note"
          className="field min-h-24 resize-y"
          value={form.note}
          onChange={(event) => update("note", event.target.value)}
          placeholder="Anything we should know?"
          disabled={submitting}
          maxLength={1000}
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="order-website">Website</label>
        <input
          id="order-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" className="relative mt-4 rounded-xl bg-blush/50 px-4 py-3 text-sm text-plum">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn-primary relative mt-7 w-full disabled:opacity-60" disabled={submitting}>
        {submitting ? (
          <>
            <span
              className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent align-middle"
              aria-hidden="true"
            />{" "}
            Sending your order…
          </>
        ) : (
          <>
            Confirm my order <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      <p className="relative mt-4 text-center text-xs text-plum/45">
        Same-day delivery available on orders placed before 2 PM.
      </p>
    </form>
  );
}
