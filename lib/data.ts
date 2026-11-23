export type Product = {
  id: string;
  name: string;
  category: "Roses" | "Seasonal" | "Tulips" | "Lilies";
  description: string;
  price: number;
  image: string;
  tag?: string;
  stems: string;
  lifecycle: string;
};

export const products: Product[] = [
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    category: "Roses",
    description:
      "Twenty-four velvety red roses, hand-tied with eucalyptus and finished in signature ivory wrap.",
    price: 2499,
    image: "1561181286-d3fee7d55364",
    tag: "Bestseller",
    stems: "24 roses",
    lifecycle: "7–10 days",
  },
  {
    id: "seasonal-whisper",
    name: "Seasonal Whisper",
    category: "Seasonal",
    description:
      "A soft, ever-changing mix of the season's freshest blooms in a blush-toned arrangement.",
    price: 1899,
    image: "1490750967868-88aa4486c946",
    stems: "18 blooms",
    lifecycle: "6–9 days",
  },
  {
    id: "tulip-reverie",
    name: "Tulip Reverie",
    category: "Tulips",
    description:
      "Ten premium tulips in cheerful assorted shades, gathered into an airy, modern bundle.",
    price: 1299,
    image: "1494972308805-463bc619d34e",
    tag: "Seasonal pick",
    stems: "10 tulips",
    lifecycle: "5–8 days",
  },
  {
    id: "lily-grace",
    name: "Lily Grace",
    category: "Lilies",
    description:
      "Five fragrant white lilies with delicate greenery — a quiet expression of purity and grace.",
    price: 1699,
    image: "1519378058457-4c29a0a2efac",
    stems: "5 lilies",
    lifecycle: "8–12 days",
  },
  {
    id: "blush-cascade",
    name: "Blush Cascade",
    category: "Roses",
    description:
      "Romantic pale pink roses spilling over a ceramic vase, accented with tiny wax flowers.",
    price: 2199,
    image: "1523438885200-e635ba2c371e",
    tag: "New arrival",
    stems: "16 roses",
    lifecycle: "7–10 days",
  },
  {
    id: "garden-muse",
    name: "Garden Muse",
    category: "Seasonal",
    description:
      "A lush garden-style arrangement of textured blooms, foliage and playful seasonal accents.",
    price: 1549,
    image: "1487070183336-b863922373d4",
    stems: "Mixed",
    lifecycle: "6–9 days",
  },
];
