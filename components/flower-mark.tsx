export function FlowerMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="7.5" r="5.4" fill="currentColor" opacity="0.95" />
      <circle cx="24.2" cy="13.6" r="5.4" fill="currentColor" opacity="0.72" />
      <circle cx="21" cy="23.2" r="5.4" fill="currentColor" opacity="0.9" />
      <circle cx="11" cy="23.2" r="5.4" fill="currentColor" opacity="0.72" />
      <circle cx="7.8" cy="13.6" r="5.4" fill="currentColor" opacity="0.95" />
      <circle cx="16" cy="16" r="3.4" fill="#E7C27B" />
    </svg>
  );
}
