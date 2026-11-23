import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { FlowerMark } from "@/components/flower-mark";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-source",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-source",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bloom & Stem — Fine Flowers, Thoughtfully Arranged",
    template: "%s | Bloom & Stem",
  },
  description:
    "Hand-picked, hand-tied flowers delivered fresh across the city. Discover signature bouquets and same-day delivery from Bloom & Stem.",
  openGraph: {
    title: "Bloom & Stem — Fine Flowers, Thoughtfully Arranged",
    description:
      "Fresh, hand-picked flowers delivered with love. Every petal tells a story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body className="min-h-screen bg-cream font-body text-plum antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>

        <div className="relative z-50 border-b border-cream/10 bg-plum py-2.5 text-center">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 text-[10px] font-medium tracking-[0.22em] text-cream/75 uppercase">
            <FlowerMark className="h-3.5 w-3.5 shrink-0 text-blush" />
            <span>Fresh, hand-tied &amp; delivered across {site.city}</span>
            <span className="hidden h-3 w-px bg-cream/25 sm:block" />
            <span className="hidden sm:inline">Same day · before 2 PM</span>
          </div>
        </div>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
