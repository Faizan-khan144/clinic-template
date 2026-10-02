import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { brand, nav } from '../brand.js'
import Logo, { Wordmark } from './Logo.jsx'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 120], [0, 1])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={reduce ? undefined : { backdropFilter: 'blur(0px)' }}
      >
        <motion.div style={{ scaleX: height }} className="absolute inset-0 origin-top border-b border-ink/8 bg-white/85 backdrop-blur-xl" />

        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label={brand.name}>
            <Logo size={32} />
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[13.5px] font-medium text-graphite transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-green transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${brand.phone.replace(/\s/g, '')}`}
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-forest sm:inline-flex"
            >
              <Phone size={14} strokeWidth={2.2} />
              Call now
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/12 text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-paper lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <Wordmark />
            </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/12"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 pt-6">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ink/8"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-[26px] font-bold tracking-[-0.02em] text-ink"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={`tel:${brand.phone.replace(/\s/g, '')}`}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-green py-4 text-[15px] font-semibold text-white"
              >
                <Phone size={16} />
                {brand.phone}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}