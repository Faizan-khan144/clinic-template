import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    let raf = 0
    let pending = false
    let latest = null

    const onMove = (e) => {
      latest = e
      if (pending) return
      pending = true
      raf = requestAnimationFrame(() => {
        pending = false
        if (!latest) return
        x.set(latest.clientX)
        y.set(latest.clientY)
        setVisible(true)
        const target =
          latest.target instanceof Element ? latest.target.closest('a, button, [data-cursor]') : null
        setLabel(target?.getAttribute('data-cursor') || null)
      })
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, x, y])

  if (!enabled) return null

  const big = Boolean(label)

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden mix-blend-difference lg:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white text-ink"
        animate={{
          width: big ? 88 : 34,
          height: big ? 88 : 34,
          marginLeft: big ? -44 : -17,
          marginTop: big ? -44 : -17,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        {label && (
          <motion.span
            className="px-2 text-center text-[10px] font-bold tracking-[0.1em] uppercase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-leaf to-forest"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
