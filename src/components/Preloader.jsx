import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo.jsx'

export default function Preloader() {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduce) {
      setDone(true)
      return
    }

    let raf = 0
    const start = performance.now()
    const duration = 1100

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setProgress(Math.round(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 220)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-paper px-6 py-8 sm:px-10 sm:py-10"
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Logo size={38} />
            <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">Verdant</span>
          </motion.div>

          <div className="flex flex-col gap-6">
            <div className="h-px w-full overflow-hidden bg-ink/10">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-leaf to-forest"
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
            <div className="flex items-end justify-between">
              <motion.p
                className="max-w-[16ch] text-[clamp(1.4rem,4.5vw,2.2rem)] leading-[1.05] font-bold tracking-[-0.035em] text-ink"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Care without the wait.
              </motion.p>
              <span className="text-[clamp(2rem,7vw,3.6rem)] leading-none font-bold tracking-[-0.04em] text-forest tabular-nums">
                {String(progress).padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
