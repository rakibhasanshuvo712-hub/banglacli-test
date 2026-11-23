import Image from "next/image";
import Link from "next/link";
import { BloomSketch } from "@/components/ornaments";
import type { Product } from "@/lib/data";
import { imageSrc } from "@/lib/images";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      id={product.id}
      className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[28px] border border-plum/[0.07] bg-white shadow-[0_22px_60px_-40px_rgba(61,31,42,0.55)] transition-all duration-500 hover:-translate-y-2 hover:border-rose/25 hover:shadow-[0_34px_80px_-38px_rgba(61,31,42,0.45)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={imageSrc(product.image)}
          alt={`${product.name} floral arrangement`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-80" />

        {product.tag ? (
          <span className="absolute top-4 left-4 rounded-full border border-gold/40 bg-white/92 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-plum uppercase shadow-sm backdrop-blur">
            {product.tag}
          </span>
        ) : null}

        <span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/20 text-cream backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream group-hover:text-plum">
          <span aria-hidden="true">✳</span>
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 pt-20 text-cream">
          <span className="text-xs tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
            {product.stems} · hand-tied
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-lg text-plum shadow-lg transition-transform duration-500 group-hover:scale-110">
            ↗
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden p-6">
        <BloomSketch className="pointer-events-none absolute -right-8 -bottom-10 h-36 w-36 text-rose/[0.06]" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="text-[10px] font-semibold tracking-[0.22em] text-rose uppercase">
              {product.category}
            </span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold text-plum">
            {product.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/60">
            {product.description}
          </p>
        </div>

        <div className="relative mt-6 flex items-center justify-between border-t border-plum/10 pt-4">
          <div>
            <span className="block text-[9px] font-semibold tracking-[0.2em] text-plum/40 uppercase">
              From
            </span>
            <span className="font-display text-xl font-semibold text-plum">
              ৳ {product.price.toLocaleString("en-BD")}
            </span>
          </div>
          <Link
            href={`/?bouquet=${product.id}#order`}
            className="inline-flex items-center gap-2 rounded-full border border-plum/15 px-4 py-2 text-[10px] font-semibold tracking-[0.16em] text-plum uppercase transition-all duration-300 hover:border-plum hover:bg-plum hover:text-cream"
            aria-label={`Order ${product.name}`}
          >
            Order <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
