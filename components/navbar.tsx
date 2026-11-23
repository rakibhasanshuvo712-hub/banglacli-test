"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FlowerMark } from "@/components/flower-mark";

const links = [
  { href: "/", label: "Home" },
  { href: "/#collections", label: "Collections" },
  { href: "/models", label: "Models" },
  { href: "/#story", label: "Our Story" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled || open
          ? "bg-cream/80 backdrop-blur-xl border-b border-plum/10 shadow-[0_4px_20px_-5px_rgba(61,31,42,0.1)] py-3"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 relative z-50" 
          onClick={() => setOpen(false)}
        >
          <div className="relative grid h-12 w-12 place-items-center">
            <div className="absolute inset-0 rounded-full bg-plum/5 rotate-0 transition-transform duration-700 group-hover:rotate-180" />
            <span className="grid h-10 w-10 place-items-center rounded-full bg-plum text-cream transition-all duration-500 group-hover:bg-rose">
              <FlowerMark className="h-5 w-5" />
            </span>
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight text-plum">
            Bloom<span className="text-rose font-serif">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active =
              link.href === "/models"
                ? pathname === "/models"
                : link.href === "/" && pathname === "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full hover:text-rose ${
                  active ? "text-rose bg-rose/5" : "text-plum/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
            <Link href="/#order" className="btn-primary !px-7 !py-2.5 text-[12px] uppercase tracking-[0.15em] font-bold">
            Order
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`h-[1.5px] w-6 bg-plum transition-all duration-300 ${open ? "rotate-45 translate-y-[7.5px]" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-plum transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-plum transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-cream/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-plum hover:text-rose transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
