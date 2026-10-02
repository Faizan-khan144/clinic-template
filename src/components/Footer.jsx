import { ArrowUpRight } from 'lucide-react'
import { brand, nav } from '../brand.js'
import Logo from './Logo.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-16 pb-8 text-white sm:px-8 sm:pt-20 pb-safe">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-white/12 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={34} />
              <span className="flex flex-col leading-none">
                <span className="text-[16px] font-extrabold tracking-[-0.02em]">Verdant</span>
                <span className="mt-[3px] text-[8.5px] font-semibold tracking-[0.34em] text-leaf uppercase">
                  Clinic
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">{brand.description}</p>
          </div>

          <a
            href={`mailto:${brand.email}`}
            className="group inline-flex w-fit items-center gap-3 text-[clamp(1.4rem,4.5vw,2.4rem)] font-bold tracking-[-0.03em]"
          >
            {brand.email}
            <ArrowUpRight
              size={26}
              className="text-leaf transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-white/70 transition-colors hover:text-leaf"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-white/70">
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-leaf">
                  {brand.phone}
                </a>
              </li>
              <li>{brand.address}</li>
              <li>{brand.location}</li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">Hours</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-white/70">
              {brand.hours.map((h) => (
                <li key={h.days}>
                  {h.days} — {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 pt-7 text-[12.5px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {year} {brand.name}. All rights reserved.
          </p>
          <p>Care without the wait.</p>
        </div>
      </div>
    </footer>
  )
}