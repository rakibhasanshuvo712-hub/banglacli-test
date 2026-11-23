"""One-off, checked source updates for the Bloom & Stem app refresh."""

from pathlib import Path

ROOT = Path(__file__).parent / "nextjs-website"


def replace(relative_path: str, old: str, new: str) -> None:
    path = ROOT / relative_path
    text = path.read_text(encoding="utf-8")
    if old not in text:
        raise SystemExit(f"Expected snippet not found in {relative_path}:\n{old!r}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"updated {relative_path}")


# Product card "Order" links preselect the clicked bouquet in the order form.
replace(
    "components/product-card.tsx",
    'href="/#order"',
    "href={`/?bouquet=${product.id}#order`}",
)

# Home page: shared studio details + Suspense boundary for useSearchParams.
replace(
    "app/page.tsx",
    'import { Fragment } from "react";',
    'import { Fragment, Suspense } from "react";',
)
replace(
    "app/page.tsx",
    'import { imageSrc } from "@/lib/images";',
    'import { imageSrc } from "@/lib/images";\nimport { site } from "@/lib/site";',
)
replace(
    "app/page.tsx",
    '<span className="eyebrow rise">Bloom &amp; Stem · Est. 2024</span>',
    "<span className=\"eyebrow rise\">\n              {site.name} · Est. {site.established}\n            </span>",
)
replace(
    "app/page.tsx",
    '                12 <span className="script text-2xl text-blush">years</span>',
    '                {site.yearsInBusiness}{" "}\n                <span className="script text-2xl text-blush">years</span>',
)
replace(
    "app/page.tsx",
    "          <Reveal delay={120}>\n            <OrderForm />\n          </Reveal>",
    """          <Reveal delay={120}>
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
          </Reveal>""",
)
replace(
    "app/page.tsx",
    '<a href="tel:+8801000000000" className="btn-primary">Call the studio</a>',
    '<a href={site.phone.href} className="btn-primary">Call the studio</a>',
)
replace(
    "app/page.tsx",
    '                  href="mailto:hello@bloomandstem.example"',
    "                  href={`mailto:${site.email}`}",
)
replace(
    "app/page.tsx",
    '                  lines: ["+880 1XXX XXXX", "Mon – Sat · 9 AM – 8 PM"],',
    "                  lines: [site.phone.label, site.hours],",
)
replace(
    "app/page.tsx",
    '                  lines: ["hello@bloomandstem.example", "We reply within 24 hours"],',
    '                  lines: [site.email, "We reply within 24 hours"],',
)
replace(
    "app/page.tsx",
    '                    "12 Petal Lane, Gulshan, Dhaka 1212 — come say hello, the kettle is always on.",',
    '                    `${site.address.full} — come say hello, the kettle is always on.`,',
)

# Layout banner uses the shared city.
replace(
    "app/layout.tsx",
    'import { Navbar } from "@/components/navbar";',
    'import { Navbar } from "@/components/navbar";\nimport { site } from "@/lib/site";',
)
replace(
    "app/layout.tsx",
    "<span>Fresh, hand-tied &amp; delivered across Dhaka</span>",
    "<span>Fresh, hand-tied &amp; delivered across {site.city}</span>",
)

# Footer contact details use the shared config.
replace(
    "components/footer.tsx",
    'import { LeafSprig } from "@/components/ornaments";',
    'import { LeafSprig } from "@/components/ornaments";\nimport { site } from "@/lib/site";',
)
replace(
    "components/footer.tsx",
    """              <li>12 Petal Lane, Gulshan</li>
              <li>Dhaka 1212, Bangladesh</li>
              <li>Mon – Sat · 9:00 AM – 8:00 PM</li>
              <li>
                <a href="tel:+8801000000000" className="transition-colors hover:text-blush">
                  +880 1XXX XXXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@bloomandstem.example"
                  className="transition-colors hover:text-blush"
                >
                  hello@bloomandstem.example
                </a>
              </li>""",
    """              <li>{site.address.short}</li>
              <li>{site.address.cityLine}</li>
              <li>{site.hours}</li>
              <li>
                <a href={site.phone.href} className="transition-colors hover:text-blush">
                  {site.phone.label}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-blush"
                >
                  {site.email}
                </a>
              </li>""",
)

# Do not reserve vertical space for an empty newsletter status message.
replace(
    "components/newsletter-form.tsx",
    """      <p
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`mt-2 text-xs ${status === "error" ? "text-blush" : "text-cream/80"}`}
      >
        {message}
      </p>""",
    """      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-2 text-xs ${status === "error" ? "text-blush" : "text-cream/80"}`}
        >
          {message}
        </p>
      ) : null}""",
)

print("all updates applied")
