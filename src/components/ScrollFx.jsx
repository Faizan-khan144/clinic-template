import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function HighlightText({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 82%', 'end 55%'] })

  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = (i + 1) / words.length
        return (
          <WordProgress
            key={i}
            word={word + (i < words.length - 1 ? ' ' : '')}
            range={[start, end]}
            progress={scrollYProgress}
            reduce={reduce}
          />
        )
      })}
    </span>
  )
}

function WordProgress({ word, range, progress, reduce }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const color = useTransform(progress, range, ['#9AA8A1', '#0C1410'])

  if (reduce) return <span className="text-ink">{word}</span>

  return (
    <motion.span style={{ opacity, color }} className="transition-colors">
      {word}
    </motion.span>
  )
}

export function GrowingLine({ className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 40%'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={`h-px w-full origin-left bg-ink/10 ${className}`}>
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-leaf to-forest"
        style={reduce ? { scaleX: 1 } : { scaleX }}
      />
    </div>
  )
}

export function FloatingShapes({ className = '' }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -260])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140])

  if (reduce) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute top-[12%] -left-24 h-72 w-72 rounded-full bg-leaf/10 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-[48%] -right-28 h-80 w-80 rounded-full bg-forest/10 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[38%] h-64 w-64 rounded-full bg-leaf/8 blur-3xl"
        style={{ y: y3 }}
      />
    </div>
  )
}
