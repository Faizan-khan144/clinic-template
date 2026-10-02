export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Verdant Clinic"
    >
      <defs>
        <linearGradient id="vc-mark" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#14532D" />
        </linearGradient>
      </defs>

      <rect width="40" height="40" rx="12" fill="url(#vc-mark)" />

      <path
        d="M20 10.5c4.7 0 8.5 3.4 8.5 7.6 0 5.4-4.3 9.6-8.5 12.9-4.2-3.3-8.5-7.5-8.5-12.9 0-4.2 3.8-7.6 8.5-7.6Z"
        fill="#fff"
        fillOpacity="0.14"
      />

      <rect x="17.6" y="9.5" width="4.8" height="21" rx="2.4" fill="#fff" />
      <rect x="9.5" y="17.6" width="21" height="4.8" rx="2.4" fill="#fff" />

      <path
        d="M12.2 27.4c0-4.6 3.4-8.6 8.2-9.4-1 5.3-4 8.3-8.2 9.4Z"
        fill="#BEF264"
        fillOpacity="0.9"
      />
      <path d="M12.6 27.2c2.6-2.2 4.9-3.8 7.4-5" stroke="#14532D" strokeOpacity="0.35" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="text-[16px] font-extrabold tracking-[-0.02em] text-ink">Verdant</span>
      <span className="mt-[3px] text-[8.5px] font-semibold tracking-[0.34em] text-green uppercase">Clinic</span>
    </span>
  )
}
