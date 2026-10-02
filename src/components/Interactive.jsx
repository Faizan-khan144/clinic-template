import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

export function Magnetic({ children, strength = 0.32, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    setHovered(false)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      style={reduce ? undefined : { x, y }}
    >
      <motion.div
        className="h-full w-full"
        animate={hovered && !reduce ? { scale: 1.04 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function TiltCard({ children, className = '', max = 9 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 })

  const glareX = useTransform(ry, (v) => 50 + v * 1.6)
  const glareY = useTransform(rx, (v) => 50 + v * 1.6)
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(34,197,94,0.22), transparent 62%)`
  )

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }

  const reset = () => {
    setActive(false)
    rx.set(0)
    ry.set(0)
  }

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={`${className} relative`}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare }}
        animate={{ opacity: active ? 1 : 0 }}
      />
    </motion.div>
  )
}

export function Spotlight({ children, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const [on, setOn] = useState(false)

  const glow = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(340px circle at ${x}% ${y}%, rgba(34,197,94,0.14), transparent 72%)`
  )

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.35 }} />
    </div>
  )
}
