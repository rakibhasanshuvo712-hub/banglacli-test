/**
 * Single source of truth for the studio's public details.
 * Update these values once and every page, the footer and the layout stay in sync.
 *
 * The placeholder phone/email values below are safe defaults for a demo site —
 * replace them with the studio's real contact details before going live.
 */
export const site = {
  name: "Bloom & Stem",
  established: 2014,
  yearsInBusiness: 12,
  city: "Dhaka",
  phone: {
    label: "+880 1XXX XXXX",
    href: "tel:+8801000000000",
  },
  email: "hello@bloomandstem.example",
  address: {
    short: "12 Petal Lane, Gulshan",
    cityLine: "Dhaka 1212, Bangladesh",
    full: "12 Petal Lane, Gulshan, Dhaka 1212, Bangladesh",
  },
  hours: "Mon – Sat · 9 AM – 8 PM",
} as const;
