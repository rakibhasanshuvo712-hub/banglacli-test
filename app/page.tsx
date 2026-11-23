import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import { FlowerMark } from "@/components/flower-mark";
import { BloomSketch, LeafSprig, RoundSeal } from "@/components/ornaments";
import { OrderForm } from "@/components/order-form";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/data";
import { imageSrc } from "@/lib/images";
import { site } from "@/lib/site";

const promises = [
  "Same-day delivery",
  "Hand-tied daily",
  "Locally grown",
  "Rated 4.9 / 5",
];

const reasons = [
  {
    title: "Picked at their peak",
    text: "We visit our partner farms each morning and choose only the freshest stems.",
    icon: "✿",
  },
  {
    title: "Arranged by hand",
    text: "Every bouquet is tied by a florist who cares about the little details.",
    icon: "✦",
  },
  {
    title: "Delivered with care",
    text: "Chilled, wrapped and hand-delivered so it arrives as beautiful as it left.",
    icon: "❋",
  },
];

const testimonials = [
  {
    quote:
      "The Velvet Rose arrived absolutely stunning — and an hour earlier than promised. My mother cried happy tears.",
    name: "Shamim Ahmed",
    role: "Dhaka",
  },
  {
    quote:
      "Beautiful flowers, thoughtful packaging and the loveliest handwritten note. This is my new go-to florist.",
    name: "Nusrat Rahman",
    role: "Chattogram",
  },
  {
    quote:
      "I ordered at 11 AM and had fresh tulips on my desk by lunch. The quality is genuinely exceptional.",
    name: "Tanvir Hassan",
    role: "Dhaka",
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-12 pb-28 sm:pt-20 sm:pb-36">
        <div
          className="pointer-events-none absolute -top-44 -left-40 h-[38rem] w-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,218,216,0.9), transparent 68%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-16 -right-24 h-[34rem] w-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,161,90,0.17), transparent 66%)",
          }}
          aria-hidden="true"
        />
        <LeafSprig
          className="pointer-events-none absolute -top-16 -right-10 hidden h-[26rem] w-[19rem] text-rose/10 lg:block"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="relative z-10">
            <span className="eyebrow rise">
              {site.name} · Est. {site.established}
            </span>
            <h1 className="rise rise-d1 mt-6 font-display text-[clamp(3.5rem,7.6vw,6.5rem)] leading-[0.92] font-semibold tracking-tight text-plum">
              Where every
              <br />
              <span className="script text-rose">bloom</span> tells a
              <br />
              story.
            </h1>
            <p className="rise rise-d2 mt-7 max-w-lg text-base leading-relaxed text-plum/65 sm:text-lg">
              Fresh, hand-picked flowers arranged with intention and delivered
              with love. Because the little gestures say the most.
            </p>
            <p className="rise rise-d2 mt-3 font-script text-2xl text-gold">
              a little love, delivered
            </p>
            <div className="rise rise-d3 mt-8 flex flex-wrap items-center gap-4">
              <Link href="#collections" className="btn-primary">
                Explore collections <span aria-hidden="true">→</span>
              </Link>
              <Link href="#order" className="btn-outline">
                Place an order
              </Link>
            </div>

            <div className="rise rise-d4 mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-3xl border border-plum/[0.07] bg-white/55 px-7 py-6 backdrop-blur-sm">
              {[
                ["30+", "Fresh varieties"],
                ["2.4k", "Smiles delivered"],
                ["4.9", "Average rating"],
              ].map(([value, label], index) => (
                <Fragment key={label}>
                  {index > 0 ? <span className="hidden h-10 w-px bg-plum/10 sm:block" /> : null}
                  <div>
                    <p className="font-display text-3xl font-semibold">{value}</p>
                    <p className="micro-label mt-1 text-plum/50">{label}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mr-0">
            <div
              className="absolute -inset-3 rounded-[3rem] border border-rose/20"
              aria-hidden="true"
            />
            <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-cream-deep shadow-[0_45px_90px_-45px_rgba(61,31,42,0.75)]">
              <Image
                src={imageSrc("1508610048659-a06b669e3321")}
                alt="A lush hand-tied bouquet of fresh flowers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-7 text-cream">
                <span className="micro-label text-blush">The studio edit</span>
                <p className="mt-1 font-display text-2xl leading-tight">
                  Fresh from the morning market
                </p>
              </div>
            </div>

            <div className="photo-frame float-slow absolute -top-8 -right-6 hidden h-44 w-36 overflow-hidden rounded-[1.6rem] border-4 border-cream shadow-xl sm:block">
              <Image
                src={imageSrc("1526047932273-341f2a7631f9")}
                alt="Close-up of delicate seasonal blooms"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>

            <div className="photo-frame float-slower absolute -bottom-10 -left-8 hidden h-48 w-40 overflow-hidden rounded-[1.6rem] border-4 border-cream shadow-xl sm:block">
              <Image
                src={imageSrc("1518895949257-7621c3c786d7")}
                alt="Florist preparing a fresh bouquet"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <RoundSeal
              id="hero-seal"
              className="absolute -left-12 top-[30%] hidden h-28 w-28 lg:block"
            />

            <div className="glass absolute -right-3 bottom-8 flex items-center gap-3 rounded-2xl border border-plum/10 px-4 py-3 shadow-lg sm:-right-8">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-blush text-rose">
                <FlowerMark className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Hand-tied today</p>
                <p className="text-[11px] text-plum/55">With love, in Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMISE STRIP ============ */}
      <div className="relative border-y border-plum/10 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-5 py-5 sm:px-8 sm:gap-x-10">
          {promises.map((promise, index) => (
            <Fragment key={promise}>
              {index > 0 ? (
                <span className="hidden h-3 w-px bg-plum/15 sm:block" aria-hidden="true" />
              ) : null}
              <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-plum/60 uppercase">
                <span className="text-gold">✦</span> {promise}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ============ COLLECTIONS ============ */}
      <section id="collections" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The collection"
              title={
                <>
                  blooms for <span className="script text-rose">every</span> feeling
                </>
              }
              description="Thoughtful arrangements for the big days, the small moments and everything in between."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.id} className="h-full" delay={index * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Link href="/models" className="btn-outline">
              See all signature models <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section id="story" className="scroll-mt-24 bg-cream-deep py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="photo-frame relative aspect-[5/4] overflow-hidden rounded-[2.5rem] shadow-[0_35px_80px_-45px_rgba(61,31,42,0.7)]">
              <Image
                src={imageSrc("1457089328109-e5d9bd499191")}
                alt="Fresh blooms being prepared in the flower studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-plum/35 via-transparent to-transparent" />
            </div>
            <div className="absolute -right-4 -bottom-8 w-52 rounded-2xl border border-cream/20 bg-plum p-5 text-cream shadow-xl sm:-right-8">
              <span className="micro-label text-blush">Our journey</span>
              <p className="font-display text-4xl font-semibold">
                {site.yearsInBusiness}{" "}
                <span className="script text-2xl text-blush">years</span>
              </p>
              <p className="mt-1 text-[11px] leading-relaxed tracking-[0.14em] text-cream/70 uppercase">
                of growing beautiful things
              </p>
            </div>
          </Reveal>

          <Reveal className="relative" delay={120}>
            <LeafSprig className="pointer-events-none absolute -top-16 -right-8 h-52 w-40 text-rose/10" />
            <span className="eyebrow">Our story</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
              Grown with passion,
              <br />
              <span className="script text-rose">delivered</span> with love
            </h2>
            <p className="mt-6 leading-relaxed text-plum/65">
              What began as a tiny stall at the corner of a Dhaka market has
              grown into a studio built around one simple belief: flowers should
              mean something. Every stem we choose and every ribbon we tie is a
              little love letter to the person on the other end.
            </p>

            <div className="mt-9 space-y-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="group flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lg text-rose shadow-sm ring-1 ring-plum/5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    {reason.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-plum/60">{reason.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          className="pointer-events-none absolute top-1/3 -left-56 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,218,216,0.5), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Kind words"
              title={
                <>
                  loved by <span className="script text-rose">many</span>
                </>
              }
              description="Real notes from people who let us be part of their special moments."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} className="h-full" delay={index * 100}>
                <figure className="soft-card relative flex h-full flex-col overflow-hidden rounded-[28px] p-8">
                  <BloomSketch className="pointer-events-none absolute -right-10 -bottom-12 h-44 w-44 text-rose/[0.05]" />
                  <div className="relative flex items-start justify-between">
                    <span className="font-display text-5xl leading-none text-blush">“</span>
                    <span className="pt-1 text-[11px] tracking-[0.25em] text-gold" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                  </div>
                  <blockquote className="relative mt-3 flex-1 text-sm leading-relaxed text-plum/75">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="relative mt-7 flex items-center gap-3 border-t border-plum/10 pt-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cream-deep font-display text-sm font-semibold text-rose">
                      {testimonial.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{testimonial.name}</span>
                      <span className="block text-xs text-plum/45">{testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ORDER ============ */}
      <section id="order" className="scroll-mt-24 bg-cream-deep py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="eyebrow">Place your order</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              surprise someone
              <br />
              <span className="script text-rose">special</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-plum/65">
              Pick a bouquet, tell us where to go, and we&apos;ll take care of the
              rest. Same-day delivery is available across the city.
            </p>
            <div className="photo-frame relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg lg:block">
              <Image
                src={imageSrc("1468327768560-75b778cbb551")}
                alt="A beautiful bouquet ready for delivery"
                fill
                sizes="45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/25 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Suspense
              fallback={
                <div
                  className="min-h-[520px] rounded-[32px] border border-plum/10 bg-white/60"
                  aria-hidden="true"
                />
              }
            >
              <OrderForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Get in touch"
                align="left"
                title={
                  <>
                    let&apos;s <span className="script text-rose">bloom</span> together
                  </>
                }
                description="Special requests, bulk orders or just a hello — we'd love to hear from you."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={site.phone.href} className="btn-primary">Call the studio</a>
                <a
                  href={`mailto:${site.email}`}
                  className="btn-outline"
                >
                  Send an email
                </a>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: "✆",
                  title: "Give us a call",
                  lines: [site.phone.label, site.hours],
                  wide: false,
                },
                {
                  icon: "✉",
                  title: "Write to us",
                  lines: [site.email, "We reply within 24 hours"],
                  wide: false,
                },
                {
                  icon: "⌂",
                  title: "Visit the studio",
                  lines: [
                    `${site.address.full} — come say hello, the kettle is always on.`,
                  ],
                  wide: true,
                },
              ].map((item, index) => (
                <Reveal
                  key={item.title}
                  className={`h-full ${item.wide ? "sm:col-span-2" : ""}`}
                  delay={index * 90}
                >
                  <div className="soft-card h-full rounded-[28px] p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-xl text-rose">
                      {item.icon}
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-plum/60">{item.lines[0]}</p>
                    {item.lines[1] ? (
                      <p className="mt-1 text-xs text-plum/40">{item.lines[1]}</p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
