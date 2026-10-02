import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { process } from '../brand.js'
import { FadeUp, MaskLines } from './Reveal.jsx'

function Step({ step, index }) {
  return (
    <div className="grid gap-4 border-t border-ink/10 py-8 sm:grid-cols-12 sm:gap-8 sm:py-11">
      <div className="sm:col-span-4">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-green text-[12px] font-bold text-white">
            {index + 1}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.16em] text-green uppercase">
            {step.meta}
          </span>
        </div>
      </div>

      <div className="sm:col-span-8">
        <h3 className="text-[24px] font-bold tracking-[-0.025em] text-ink sm:text-[32px]">{step.title}</h3>
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-slate sm:text-base">{step.body}</p>
      </div>
    </div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 65%'] })

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden bg-paper px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <FadeUp>
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-8 bg-leaf" />
                  <span className="text-[11px] font-semibold tracking-[0.22em] text-green uppercase">
                    {process.kicker}
                  </span>
                </div>
              </FadeUp>

              <MaskLines
                lines={['Four steps,', 'no queue.']}
                className="block text-[clamp(2rem,6.5vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.035em] text-ink"
              />

              <motion.div
                className="mt-10 hidden lg:block"
                style={reduce ? undefined : { scaleY: scrollYProgress }}
              >
                <div className="h-40 w-px origin-top bg-green/25" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {process.steps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.05}>
                <Step step={step} index={i} />
              </FadeUp>
            ))}
            <div className="border-t border-ink/10" />
          </div>
        </div>
      </div>
    </section>
  )
}