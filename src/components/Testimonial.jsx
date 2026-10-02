import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../brand.js'
import { responsiveSrc } from './SmartImage.jsx'
import { FadeUp } from './Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

export default function Testimonial() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const item = testimonials.items[active]

  const pick = (next) => {
    const count = testimonials.items.length
    setActive(((next % count) + count) % count)
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40"
      aria-roledescription="carousel"
      aria-label="Patient stories"
    >
      <motion.img
        src={testimonials.items[0].image}
        srcSet={responsiveSrc(testimonials.items[0].image)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-[0.16]"
        style={reduce ? undefined : { y }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink/95" />

      <div className="relative mx-auto max-w-4xl text-center">
        <FadeUp>
          <span className="text-[11px] font-semibold tracking-[0.22em] text-leaf/80 uppercase">
            {testimonials.kicker}
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="mt-5 text-[clamp(1.6rem,4.4vw,2.6rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
            {testimonials.title}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-leaf text-leaf" aria-hidden="true" />
            ))}
            <span className="sr-only">Rated five out of five</span>
          </div>
        </FadeUp>

        <div className="relative mt-10 min-h-[280px] sm:min-h-[230px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="text-[clamp(1.2rem,3.2vw,1.95rem)] leading-[1.3] font-semibold tracking-[-0.02em] text-balance"
              aria-live="polite"
            >
              <span className="block text-[52px] leading-[0.6] font-bold text-leaf/50" aria-hidden="true">
                &#8220;
              </span>
              {item.quote}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <FadeUp delay={0.15}>
          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="h-px w-10 bg-leaf" />
            <p className="mt-4 text-[14px] font-semibold text-white">{item.author}</p>
            <p className="text-[12.5px] text-white/45">{item.meta}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {testimonials.items.map((t, i) => (
              <button
                key={t.author}
                onClick={() => pick(i)}
                aria-label={`Show story from ${t.author}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-leaf' : 'w-2 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
