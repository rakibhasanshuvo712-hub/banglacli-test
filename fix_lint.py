"""Replace the effect-based bouquet preselection with derived state."""

from pathlib import Path

path = Path(__file__).parent / "nextjs-website/components/order-form.tsx"
text = path.read_text(encoding="utf-8")

changes = [
    (
        'import { useEffect, useState } from "react";',
        'import { useState } from "react";',
    ),
    (
        """  // "Order" links on product cards carry ?bouquet=<id> so the chosen
  // arrangement is preselected when the visitor reaches the form.
  useEffect(() => {
    const requestedId = searchParams.get("bouquet");
    if (!requestedId) return;
    const match = products.find((product) => product.id === requestedId);
    if (match) {
      setForm((previous) => ({ ...previous, bouquet: match.name }));
    }
  }, [searchParams]);
""",
        """  // "Order" links carry ?bouquet=<id>. Until the visitor picks a bouquet
  // themselves, the linked arrangement stays selected — including after
  // client-side navigation to a different product.
  const [bouquetChanged, setBouquetChanged] = useState(false);
  const requestedBouquet = products.find(
    (product) => product.id === searchParams.get("bouquet"),
  );
  const activeBouquet =
    !bouquetChanged && requestedBouquet
      ? requestedBouquet.name
      : form.bouquet;
""",
    ),
    (
        "        body: JSON.stringify(form),",
        "        body: JSON.stringify({ ...form, bouquet: activeBouquet }),",
    ),
    (
        "          Thanks, {form.name.split(\" \")[0]}! Your {form.bouquet} order has reached",
        "          Thanks, {form.name.split(\" \")[0]}! Your {activeBouquet} order has reached",
    ),
    (
        "            setForm(initialState);\n            setOrderId(\"\");",
        "            setForm(initialState);\n            setBouquetChanged(false);\n            setOrderId(\"\");",
    ),
    (
        """            value={form.bouquet}
            onChange={(event) => update("bouquet", event.target.value)}""",
        """            value={activeBouquet}
            onChange={(event) => {
              update("bouquet", event.target.value);
              setBouquetChanged(true);
            }}""",
    ),
]

for old, new in changes:
    if old not in text:
        raise SystemExit(f"Expected snippet not found:\n{old!r}")
    text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
print("order form updated")
