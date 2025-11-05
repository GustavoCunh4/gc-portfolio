import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { LanguageProvider } from './contexts/LanguageContext'
import { Contact } from './sections/Contact'
import { HeroAboutScene } from './sections/HeroAboutScene'
import { Projects } from './sections/Projects'
import { Tech } from './sections/Tech'

type AppContentProps = {
  shouldReduceMotion: boolean
}

function AppContent({ shouldReduceMotion }: AppContentProps) {
  const contentReady = true

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--gc-surface)] text-[color:var(--gc-foreground)]">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <motion.div
          className="absolute inset-0 bg-hero-noise opacity-45"
          animate={{ backgroundPosition: ['0% 0%', '30% 50%', '0% 0%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-grid-soft opacity-15" />
        <motion.div
          className="absolute -left-24 top-[12%] h-80 w-80 rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 65%)' }}
          animate={{ y: [-16, 20, -16] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-12 bottom-[18%] h-[340px] w-[340px] rounded-full blur-[115px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.32), transparent 60%)' }}
          animate={{ y: [18, -14, 18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-slate-900 via-slate-950/40 to-transparent" />
      </div>

      <motion.div
        className="relative z-10"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Header />
        <main className="relative">
          <HeroAboutScene contentReady={contentReady} />
          <Tech />
          <Projects />
          <Contact />
        </main>
      </motion.div>
      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()}{' '}
        Gustavo Cunha - construindo produtos digitais com engenharia, design e dados.
      </footer>
    </div>
  )
}

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion ?? false

  return (
    <LanguageProvider>
      <AppContent shouldReduceMotion={shouldReduceMotion} />
    </LanguageProvider>
  )
}
