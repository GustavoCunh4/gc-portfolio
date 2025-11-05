import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { About } from './About'
import { Hero } from './Hero'

type HeroAboutSceneProps = {
  contentReady: boolean
}

export function HeroAboutScene({ contentReady }: HeroAboutSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroTransforms = useMemo(() => {
    const scale = useTransform(scrollYProgress, value => {
      if (shouldReduceMotion) return 1
      const clamped = Math.min(Math.max(value, 0), 1)
      return 1 - clamped * 0.08
    })

    const opacity = useTransform(scrollYProgress, value => {
      if (shouldReduceMotion) return 1
      const clamped = Math.min(Math.max(value, 0), 1)
      return 1 - clamped * 0.25
    })

    const translateY = useTransform(scrollYProgress, value => {
      if (shouldReduceMotion) return 0
      const clamped = Math.min(Math.max(value, 0), 1)
      return clamped * -120
    })

    return { scale, opacity, y: translateY }
  }, [scrollYProgress, shouldReduceMotion])

  const aboutTransforms = useMemo(() => {
    const translateY = useTransform(scrollYProgress, value => {
      if (shouldReduceMotion) return 0
      const clamped = Math.min(Math.max(value, 0), 1)
      return 120 - clamped * 120
    })

    const opacity = useTransform(scrollYProgress, value => {
      if (shouldReduceMotion) return 1
      const eased = Math.max(value - 0.1, 0)
      return Math.min(eased * 1.4, 1)
    })

    return { translateY, opacity }
  }, [scrollYProgress, shouldReduceMotion])

  return (
    <section ref={containerRef} className="relative isolate">
      <Hero motionStyle={heroTransforms} className="will-change-transform" contentReady={contentReady} />
      <motion.div
        style={{ y: aboutTransforms.translateY, opacity: aboutTransforms.opacity }}
        className="-mt-24 will-change-transform md:-mt-32"
      >
        <About />
      </motion.div>
    </section>
  )
}
