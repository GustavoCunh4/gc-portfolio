import { useEffect, useRef } from 'react'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Tech } from './sections/Tech'

type WindowWithAudio = Window & { webkitAudioContext?: typeof AudioContext }

export default function App() {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const AudioCtor = window.AudioContext || (window as WindowWithAudio).webkitAudioContext

    if (!AudioCtor) {
      return
    }

    const handleClick = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtor()
      }

      const context = audioContextRef.current
      if (!context) return

      if (context.state === 'suspended') {
        context.resume().catch(() => {
          /** noop */
        })
      }

      const duration = 0.05
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < data.length; i++) {
        const decay = 1 - i / data.length
        data[i] = (Math.random() * 2 - 1) * decay * 0.6
      }

      const source = context.createBufferSource()
      source.buffer = buffer

      const filter = context.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.setValueAtTime(900, context.currentTime)
      filter.Q.setValueAtTime(0.8, context.currentTime)

      const gain = context.createGain()
      gain.gain.setValueAtTime(0.08, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)

      source.start()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      void audioContextRef.current?.close()
      audioContextRef.current = null
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-hero-noise" />
        <div className="absolute inset-0 bg-grid-soft opacity-30" />
        <div className="absolute top-[8%] left-[8%] h-72 w-72 rounded-full bg-gc-primary/25 blur-glow animate-pulse-soft" />
        <div className="absolute bottom-[12%] right-[15%] h-80 w-80 rounded-full bg-gc-secondary/25 blur-glow animate-pulse-soft" />
        <div className="absolute top-1/2 -left-24 h-[420px] w-[420px] rounded-[50%] bg-gc-accent/25 blur-glow animate-float" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[420px] bg-gradient-to-b from-slate-900 via-slate-950/30 to-transparent" />

      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Tech />
        <Projects />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} Gustavo Cunha - construindo produtos digitais com engenharia, design e dados.
      </footer>
    </div>
  )
}
