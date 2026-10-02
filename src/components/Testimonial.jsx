import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { testimonial } from '../brand.js'
import { responsiveSrc } from './SmartImage.jsx'
import { FadeUp } from './Reveal.jsx'

export default function Testimonial() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
      <motion.img
        src={testimonial.image}
        srcSet={responsiveSrc(testimonial.image)}
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
          <span className="mx-auto mb-10 block text-[64px] leading-none font-bold text-leaf/50">&#8220;</span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <blockquote className="text-[clamp(1.3rem,3.6vw,2.15rem)] leading-[1.28] font-semibold tracking-[-0.02em] text-balance">
            {testimonial.quote}
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.22}>
          <div className="mt-10 flex flex-col items-center gap-1">
            <span className="h-px w-10 bg-leaf" />
            <p className="mt-4 text-[13.5px] font-semibold text-white">{testimonial.author}</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}