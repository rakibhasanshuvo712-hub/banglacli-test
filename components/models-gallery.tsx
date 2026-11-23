"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import type { Product } from "@/lib/data";

const categories = ["All", "Roses", "Seasonal", "Tulips", "Lilies"] as const;

type Category = (typeof categories)[number];

export function ModelsGallery({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Category>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((product) => product.category === active),
    [active, products],
  );

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter arrangements by category"
      >
        {categories.map((category) => {
          const selected = category === active;
          const count =
            category === "All"
              ? products.length
              : products.filter((product) => product.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={selected}
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                selected
                  ? "bg-plum text-cream shadow-lg shadow-plum/20"
                  : "border border-plum/15 bg-white text-plum/65 hover:-translate-y-0.5 hover:border-rose/40 hover:text-plum"
              }`}
            >
              {category}
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] ${
                  selected ? "bg-gold/25 text-blush" : "bg-cream-deep text-plum/45"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-7 text-center text-[10px] font-semibold tracking-[0.2em] text-plum/45 uppercase">
        Showing {visible.length} of {products.length} signature models
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <Reveal key={product.id} className="h-full" delay={index * 70}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
