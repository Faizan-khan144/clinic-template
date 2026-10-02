import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { useRef } from 'react'
import { hero, brand } from '../brand.js'
import { Magnetic } from './Interactive.jsx'
import { responsiveSrc } from './SmartImage.jsx'
import { MaskLines } from './Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-paper pt-24 pb-12 sm:pb-20 lg:min-h-[100svh] lg:justify-end lg:pt-0"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
      >
        <motion.img
          src={hero.image}
          srcSet={responsiveSrc(hero.image)}
          sizes="100vw"
          alt="Verdant Clinic reception"
          className="h-full w-full object-cover"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/55 to-white/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/35 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 sm:px-8 lg:h-full lg:justify-end"
        style={reduce ? undefined : { y: textY, opacity: textOpacity }}
      >
        <motion.div
          className="mb-6 flex items-center justify-between gap-4 border-b border-ink/8 pb-4 lg:mb-7"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="flex items-center gap-2 text-[11.5px] font-medium text-graphite">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            Same-day appointments available
          </span>
          <a
            href={`tel:${brand.phone.replace(/\s/g, '')}`}
            className="text-[11.5px] font-semibold text-green underline-offset-4 hover:underline"
          >
            {brand.phone}
          </a>
        </motion.div>

        <motion.div
          className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 px-4 py-2 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-graphite uppercase">
            {hero.eyebrow}
          </span>
        </motion.div>

        <MaskLines
          lines={hero.headline}
          delay={0.12}
          className="block text-[clamp(2.6rem,9.5vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.045em] text-ink"
        />

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-md text-[15px] leading-relaxed text-graphite sm:text-[17px]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.54, ease: EASE }}
          >
            <Magnetic>
              <a
                href={hero.primary.href}
                data-cursor="Book"
                className="group inline-flex items-center gap-2.5 rounded-full bg-green px-7 py-4 text-[14.5px] font-semibold text-white transition-colors hover:bg-forest"
              >
                <CalendarCheck size={17} strokeWidth={2.1} />
                {hero.primary.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={hero.secondary.href}
                data-cursor="View"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-7 py-4 text-[14.5px] font-semibold text-ink backdrop-blur-md transition-colors hover:bg-white"
              >
                {hero.secondary.label}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-5 bottom-6 z-10 hidden items-center gap-2.5 sm:right-8 sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[11px] font-medium tracking-[0.18em] text-slate uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-ink/12">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-green"
            animate={reduce ? undefined : { y: ['-100%', '250%'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}