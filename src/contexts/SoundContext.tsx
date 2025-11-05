import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type SoundContextValue = {
  soundEnabled: boolean
  toggleSound: () => void
  setSoundEnabled: (value: boolean) => void
}

const SoundContext = createContext<SoundContextValue | undefined>(undefined)

type SoundProviderProps = {
  children: ReactNode
  defaultEnabled: boolean
}

const STORAGE_KEY = 'gc-portfolio-sound'

export function SoundProvider({ children, defaultEnabled }: SoundProviderProps) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return defaultEnabled
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') return true
    if (stored === 'false') return false
    return defaultEnabled
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(soundEnabled))
    }
  }, [soundEnabled])

  const toggleSound = () => {
    setSoundEnabled(current => !current)
  }

  const value = useMemo<SoundContextValue>(
    () => ({
      soundEnabled,
      toggleSound,
      setSoundEnabled,
    }),
    [soundEnabled],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within SoundProvider')
  }
  return context
}
