import Link from "next/link";
import { FlowerMark } from "@/components/flower-mark";
import { NewsletterForm } from "@/components/newsletter-form";
import { LeafSprig } from "@/components/ornaments";
import { site } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/#collections", label: "Collections" },
  { href: "/models", label: "Signature Models" },
  { href: "/#story", label: "Our Story" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum text-cream">
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-rose/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <LeafSprig className="pointer-events-none absolute top-10 left-1/2 hidden h-80 w-60 -translate-x-1/2 text-blush/[0.06] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8">
        <div className="grid gap-12 border-b border-cream/15 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-plum">
                <FlowerMark className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl font-semibold">
                Bloom <span className="text-blush">&</span> Stem
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Fine flowers, thoughtfully arranged. Hand-picked from local growers
              and delivered with a little extra love.
            </p>
            <p className="mt-6 font-script text-2xl text-gold">with love, always</p>
          </div>

          <div>
            <h3 className="micro-label text-blush">Explore</h3>
            <span className="mt-4 block h-px w-10 bg-gold/50" />
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blush"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="micro-label text-blush">Visit us</h3>
            <span className="mt-4 block h-px w-10 bg-gold/50" />
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li>{site.address.short}</li>
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
              </li>
            </ul>
          </div>

          <div>
            <h3 className="micro-label text-blush">Bloom notes</h3>
            <span className="mt-4 block h-px w-10 bg-gold/50" />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              Seasonal inspiration, care tips and first dibs on new arrangements.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pointer-events-none relative mt-2 select-none overflow-hidden text-center font-display text-[clamp(4rem,13vw,11rem)] leading-none font-semibold tracking-tight text-cream/[0.045]">
          Bloom &amp; Stem
        </div>

        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <p>© Bloom &amp; Stem Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-blush">Instagram</a>
            <a href="#" className="transition-colors hover:text-blush">Facebook</a>
            <a href="#" className="transition-colors hover:text-blush">Pinterest</a>
          </div>
          <p>Made with blooms &amp; care in Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
