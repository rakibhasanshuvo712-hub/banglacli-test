import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ModelsGallery } from "@/components/models-gallery";
import { BloomSketch, FlourishDivider, LeafSprig, RoundSeal } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/data";
import { imageSrc } from "@/lib/images";

export const metadata: Metadata = {
  title: "Signature Models",
  description:
    "Explore the signature floral models at Bloom & Stem — from velvet roses to seasonal garden arrangements.",
};

export default function ModelsPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute -top-40 -right-24 h-[34rem] w-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,218,216,0.85), transparent 68%)",
          }}
          aria-hidden="true"
        />
        <LeafSprig className="pointer-events-none absolute top-10 -left-10 hidden h-80 w-56 text-rose/10 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <span className="eyebrow rise">Our signature models</span>
            <h1 className="rise rise-d1 mt-6 font-display text-[clamp(3.2rem,7vw,6rem)] leading-[0.94] font-semibold tracking-tight">
              Find the bloom
              <br />
              that <span className="script text-rose">speaks</span> for you
            </h1>
            <p className="rise rise-d2 mt-6 max-w-lg text-base leading-relaxed text-plum/65 sm:text-lg">
              Each model is a little different — a distinct shape, mood and
              palette, hand-finished by our florists every single day.
            </p>
            <p className="rise rise-d2 mt-3 font-script text-2xl text-gold">
              made just for you
            </p>
            <div className="rise rise-d3 mt-8 flex flex-wrap gap-4">
              <Link href="#gallery" className="btn-primary">
                Browse the collection <span aria-hidden="true">↓</span>
              </Link>
              <Link href="/#order" className="btn-outline">
                Order a favourite
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rounded-[3rem] border border-rose/20" aria-hidden="true" />
            <div className="photo-frame relative aspect-[5/4] overflow-hidden rounded-[2.5rem] shadow-[0_40px_90px_-45px_rgba(61,31,42,0.7)]">
              <Image
                src={imageSrc("1462275646964-a0e3386b89fa")}
                alt="A curated selection of fresh flowers in the studio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-transparent" />
              <span className="micro-label absolute right-6 bottom-6 text-cream/85">
                The signature edit · 01
              </span>
            </div>
            <RoundSeal
              id="models-seal"
              text="SIX SIGNED STYLES · HAND FINISHED · "
              className="absolute -right-8 -bottom-10 hidden h-28 w-28 sm:block"
            />
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="scroll-mt-24 bg-cream-deep py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The models"
              title={
                <>
                  six ways to <span className="script text-rose">say it</span>
                </>
              }
              description="Filter by flower family to find the arrangement that fits your moment."
            />
          </Reveal>
          <div className="mt-12">
            <ModelsGallery products={products} />
          </div>
        </div>
      </section>

      {/* ============ CUSTOM NOTE ============ */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <BloomSketch className="pointer-events-none absolute -top-20 -left-16 h-96 w-96 text-rose/[0.06]" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="eyebrow justify-center">Something in mind?</span>
            <h2 className="mt-5 font-display text-4xl leading-tight font-semibold sm:text-5xl">
              Every model can be made <span className="script text-rose">yours</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-plum/65">
              Swap a flower, change the palette, add a handwritten note — tell us
              what you&apos;re imagining and our florists will bring it to life.
            </p>
            <FlourishDivider className="mx-auto mt-7" />
            <Link href="/#contact" className="btn-primary mt-8">
              Request a custom arrangement <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
