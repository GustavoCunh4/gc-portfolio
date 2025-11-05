import type { TargetAndTransition, Transition, Variants } from 'framer-motion'
import { useAnimationControls, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

type EasingTuple = [number, number, number, number]

type ScrollRevealOptions = {
  delay?: number
  distance?: number
  duration?: number
  easing?: EasingTuple
  once?: boolean
  amount?: number
  initialOpacity?: number
  blur?: number
  withClip?: boolean
  scale?: number
  staggerChildren?: number
  delayChildren?: number
}

const defaultEasing: EasingTuple = [0.22, 1, 0.36, 1]

export function useScrollReveal({
  delay = 0,
  distance = 32,
  duration = 0.7,
  easing = defaultEasing,
  once = true,
  amount = 0.35,
  initialOpacity = 0,
  blur = 18,
  withClip = true,
  scale = 0.98,
  staggerChildren,
  delayChildren,
}: ScrollRevealOptions = {}) {
  const controls = useAnimationControls()
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView, entry } = useInView({
    triggerOnce: once,
    threshold: amount,
  })

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set('show')
      return
    }

    if (inView) {
      void controls.start('show')
    } else if (!once && entry) {
      void controls.start('hidden')
    }
  }, [controls, entry, inView, once, shouldReduceMotion])

  const variants = useMemo<Variants>(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, y: 0, scale: 1 },
        show: { opacity: 1, y: 0, scale: 1 },
      }
    }

    const hiddenState: TargetAndTransition = {
      opacity: initialOpacity,
      y: distance,
      transformOrigin: 'center top',
    }

    if (scale !== 1) {
      hiddenState.scale = scale
    }
    if (blur > 0) {
      hiddenState.filter = `blur(${blur}px)`
    }
    if (withClip) {
      hiddenState.clipPath = 'inset(12% 0% 18% 0%)'
    }

    const transition: Transition = {
      delay,
      duration,
      ease: easing,
    }

    if (typeof staggerChildren === 'number') {
      transition.staggerChildren = staggerChildren
    }

    if (typeof delayChildren === 'number') {
      transition.delayChildren = delayChildren
    }

    const showState: TargetAndTransition = {
      opacity: 1,
      y: 0,
      transformOrigin: 'center top',
      transition,
    }

    if (scale !== 1) {
      showState.scale = 1
    }

    if (blur > 0) {
      showState.filter = 'blur(0px)'
    }

    if (withClip) {
      showState.clipPath = 'inset(0% 0% 0% 0%)'
    }

    return {
      hidden: hiddenState,
      show: showState,
    }
  }, [
    blur,
    delay,
    delayChildren,
    distance,
    duration,
    easing,
    initialOpacity,
    scale,
    shouldReduceMotion,
    staggerChildren,
    withClip,
  ])

  return { ref, controls, variants }
}
