import { motion, useReducedMotion } from 'framer-motion'
import { marquee } from '../brand.js'

export default function Marquee() {
  const reduce = useReducedMotion()
  const row = [...marquee, ...marquee]

  return (
    <div className="relative overflow-hidden border-y border-ink/8 bg-mist py-4">
      <motion.div
        className="flex w-max gap-10"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="text-[13px] font-semibold tracking-[0.16em] text-graphite uppercase">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-leaf" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}