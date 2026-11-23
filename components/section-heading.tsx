import { FlourishDivider } from "@/components/ornaments";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}>
      <span className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-plum sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-plum/60 sm:text-lg">
          {description}
        </p>
      ) : null}
      <FlourishDivider className={`mt-7 ${centered ? "justify-center" : ""}`} />
    </div>
  );
}
