import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type UseTypewriterOptions = {
  start?: boolean
  totalDuration?: number
}

type UseTypewriterResult = {
  value: string
  isFinished: boolean
  cursorVisible: boolean
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}): UseTypewriterResult {
  const { start = true, totalDuration = 2800 } = options
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion ?? false

  const [value, setValue] = useState(() => (shouldReduceMotion ? text : ''))
  const [isFinished, setIsFinished] = useState(() => shouldReduceMotion && start)
  const [cursorVisible, setCursorVisible] = useState(() => !shouldReduceMotion && start)

  const intervalRef = useRef<number | null>(null)
  const blinkIntervalRef = useRef<number | null>(null)

  const clearTypingInterval = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const clearBlinkInterval = () => {
    if (blinkIntervalRef.current !== null) {
      window.clearInterval(blinkIntervalRef.current)
      blinkIntervalRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      clearTypingInterval()
      clearBlinkInterval()
    }
  }, [])

  useEffect(() => {
    clearTypingInterval()

    if (shouldReduceMotion) {
      setValue(text)
      setIsFinished(true)
      setCursorVisible(false)
      return
    }

    if (!start) {
      setValue('')
      setIsFinished(false)
      setCursorVisible(false)
      return
    }

    const length = text.length
    if (length === 0) {
      setValue('')
      setIsFinished(true)
      setCursorVisible(false)
      return
    }

    setValue('')
    setIsFinished(false)
    setCursorVisible(true)

    const stepDuration = Math.max(Math.round(totalDuration / length), 12)
    let index = 0

    intervalRef.current = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))

      if (index >= length) {
        clearTypingInterval()
        setIsFinished(true)
        setCursorVisible(false)
      }
    }, stepDuration)

    return () => {
      clearTypingInterval()
    }
  }, [text, start, totalDuration, shouldReduceMotion])

  useEffect(() => {
    clearBlinkInterval()

    if (shouldReduceMotion || !start || isFinished) {
      setCursorVisible(false)
      return
    }

    setCursorVisible(true)
    blinkIntervalRef.current = window.setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 650)

    return () => {
      clearBlinkInterval()
    }
  }, [start, shouldReduceMotion, text, isFinished])

  return {
    value,
    isFinished,
    cursorVisible: !shouldReduceMotion && cursorVisible,
  }
}
