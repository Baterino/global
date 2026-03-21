/**
 * Decorative illustration for error pages (404, 401) — low battery / unavailable energy.
 */
interface ErrorPageIllustrationProps {
  className?: string
}

export function ErrorPageIllustration({ className }: ErrorPageIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="10"
        width="62"
        height="28"
        rx="4"
        stroke="#10064B"
        strokeWidth="2.5"
      />
      <path
        d="M66 18h6a2 2 0 012 2v8a2 2 0 01-2 2h-6"
        stroke="#10064B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Single charge bar — critically low */}
      <rect x="12" y="18" width="16" height="12" rx="2" fill="#10064B" opacity="0.95" />
      {/* Dashed empty zone */}
      <path
        d="M34 24h28"
        stroke="#d4d4d8"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </svg>
  )
}
