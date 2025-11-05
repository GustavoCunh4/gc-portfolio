import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'pt' | 'en'

type LanguageContextValue = {
  language: Language
  toggleLanguage: () => void
  setLanguage: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

type LanguageProviderProps = {
  children: ReactNode
}

const STORAGE_KEY = 'gc-portfolio-language'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'pt' || stored === 'en') {
    return stored
  }

  const browser = window.navigator.language.slice(0, 2).toLowerCase()
  return browser === 'en' ? 'en' : 'pt'
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language)
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage(current => (current === 'pt' ? 'en' : 'pt'))
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage,
      setLanguage,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
