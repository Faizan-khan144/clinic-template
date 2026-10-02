import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { responsiveSrc } from './SmartImage.jsx'

const EASE = [0.16, 1, 0.3, 1]

export function MaskLines({ lines, className = '', delay = 0, start = '12%' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: `-${start} 0px` })
  const reduce = useReducedMotion()

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={reduce ? false : { y: '112%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function FadeUp({ children, delay = 0, y = 26, className = '', duration = 0.85 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, className = '', duration = 1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration, delay, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxImage({ src, alt, className = '', imgClassName = '', sizes = '(max-width: 640px) 100vw, 50vw', strength = 40 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-haze ${className}`}>
      <motion.img
        src={src}
        srcSet={responsiveSrc(src)}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y }}
        className={`h-[118%] w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function SectionHead({ kicker, title, body, align = 'left', className = '' }) {
  return (
    <div className={`${className}`}>
      {kicker && (
        <FadeUp>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-leaf" />
            <span className="text-[11px] font-semibold tracking-[0.22em] text-green uppercase">
              {kicker}
            </span>
          </div>
        </FadeUp>
      )}
      <MaskLines
        lines={Array.isArray(title) ? title : [title]}
        className="block text-[clamp(2rem,7vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance"
      />
      {body && (
        <FadeUp delay={0.15} className={align === 'center' ? 'mx-auto mt-7 max-w-2xl' : 'mt-7 max-w-2xl'}>
          <p className="text-[15px] leading-relaxed text-slate sm:text-base">{body}</p>
        </FadeUp>
      )}
    </div>
  )
}