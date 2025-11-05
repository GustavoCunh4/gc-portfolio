import { useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getSiteContent } from '../data'

export function useContent() {
  const { language } = useLanguage()

  return useMemo(() => getSiteContent(language), [language])
}
