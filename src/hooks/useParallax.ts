import { MotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Axis = 'x' | 'y'

type ParallaxOptions = {
  axis?: Axis
  offset?: number
  stiffness?: number
  damping?: number
}

export function useParallax({
  axis = 'y',
  offset = 60,
  stiffness = 120,
  damping = 20,
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const transformRange = axis === 'y' ? [offset, -offset] : [-offset, offset]
  const motionValue = useTransform(scrollYProgress, [0, 1], transformRange)

  const smoothValue: MotionValue<number> = useSpring(motionValue, {
    stiffness,
    damping,
  })

  return { ref, value: smoothValue }
}
