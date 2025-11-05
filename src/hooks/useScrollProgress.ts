import { MotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'

type UseScrollProgressOptions = {
  stiffness?: number
  damping?: number
}

export function useScrollProgress({ stiffness = 120, damping = 28 }: UseScrollProgressOptions = {}) {
  const { scrollYProgress } = useScroll()
  const smoothProgress: MotionValue<number> = useSpring(scrollYProgress, {
    stiffness,
    damping,
  })

  const [percent, setPercent] = useState(0)

  useMotionValueEvent(smoothProgress, 'change', latest => {
    setPercent(Math.round(latest * 100))
  })

  return { progress: smoothProgress, percent }
}
