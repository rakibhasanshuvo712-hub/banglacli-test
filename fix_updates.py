from pathlib import Path

root = Path(__file__).parent / "nextjs-website"

page = root / "app/page.tsx"
text = page.read_text(encoding="utf-8")
text = text.replace(
    '          className="pointer-events-none absolute -top-16 -right-10 hidden h-[26rem] w-[19rem] text-rose/10 lg:block"\n          aria-hidden="true"\n',
    '          className="pointer-events-none absolute -top-16 -right-10 hidden h-[26rem] w-[19rem] text-rose/10 lg:block"\n',
)
page.write_text(text, encoding="utf-8")

models = root / "app/models/page.tsx"
text = models.read_text(encoding="utf-8")
text = text.replace('import { FlowerMark } from "@/components/flower-mark";\n', "")
models.write_text(text, encoding="utf-8")

navbar = root / "components/navbar.tsx"
text = navbar.read_text(encoding="utf-8")
text = text.replace('scrolled ? "h-17" : "h-20"', 'scrolled ? "h-[4.25rem]" : "h-20"')
navbar.write_text(text, encoding="utf-8")

print("updates applied")
