import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, MapPin, MessageCircle, Phone } from 'lucide-react'
import { brand } from '../brand.js'
import { mapsLink, whatsappLink } from '../lib/clinic.js'

const telHref = `tel:${brand.phone.replace(/\s/g, '')}`

export default function MobileBar() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const actions = [
    { label: 'Call', href: telHref, Icon: Phone, className: 'text-ink' },
    { label: 'WhatsApp', href: whatsappLink(), Icon: MessageCircle, className: 'text-forest' },
    { label: 'Directions', href: mapsLink, Icon: MapPin, className: 'text-forest' },
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? false : { y: 90 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: 90 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-ink/10 bg-white/95 p-1.5 shadow-[0_10px_30px_-8px_rgba(12,20,16,0.28)] backdrop-blur-md">
            {actions.map(({ label, href, Icon, className }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                data-cursor="Tap"
                className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-bold tracking-wide uppercase ${className} transition-colors active:bg-mist`}
              >
                <Icon size={17} strokeWidth={2.2} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function BookPill() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href="#contact"
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="Book"
      className="hidden items-center gap-2.5 rounded-full bg-green px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-forest xl:inline-flex"
    >
      <CalendarCheck size={16} strokeWidth={2.2} />
      Book same-day slot
    </motion.a>
  )
}
