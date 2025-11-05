import { motion, type MotionStyle, useReducedMotion } from 'framer-motion'
import { useCallback } from 'react'
import type { MouseEvent } from 'react'
import profileImage from '../assets/profile.jpg'
import { WHATSAPP_PHONE_LINK } from '../constants'
import { useContent, useParallax, useScrollReveal, useTypewriter } from '../hooks'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'

const ease = [0.22, 1, 0.36, 1]

const heading = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.12 },
  },
}

const subline = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.25 },
  },
}

type HeroProps = {
  motionStyle?: MotionStyle
  className?: string
  contentReady?: boolean
}

export function Hero({ motionStyle, className, contentReady = true }: HeroProps = {}) {
  const { ref: heroRef, controls, variants } = useScrollReveal({
    distance: 40,
    amount: 0.35,
    blur: 24,
    scale: 0.95,
    withClip: false,
  })
  const { ref: cardRef, value: cardParallax } = useParallax({ offset: 80 })
  const shouldReduceMotion = useReducedMotion()
  const hero = useContent().hero
  const whatsappHref = `${WHATSAPP_PHONE_LINK}?text=${encodeURIComponent(hero.whatsappMessage)}`

  const { value: typedHeadline, cursorVisible } = useTypewriter(hero.typedText, {
    start: contentReady,
    totalDuration: 3500,
  })

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion) return
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -4
      const rotateY = ((x - centerX) / centerX) * 4
      target.style.setProperty('--tilt-x', `${rotateX}deg`)
      target.style.setProperty('--tilt-y', `${rotateY}deg`)
      target.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`)
      target.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`)
    },
    [shouldReduceMotion],
  )

  const handlePointerLeave = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement
    target.style.setProperty('--tilt-x', '0deg')
    target.style.setProperty('--tilt-y', '0deg')
  }, [])

  return (
    <motion.section
      id="hero"
      style={motionStyle}
      className={`relative flex min-h-[92vh] items-center overflow-hidden pt-44 pb-32 md:pt-40 ${className ?? ''}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0 bg-hero-noise opacity-55"
          animate={{ backgroundPosition: ['0% 0%', '40% 60%', '0% 0%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gc-primary/40 via-transparent to-gc-secondary/35 mix-blend-screen"
          animate={{ opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-20 top-32 h-96 w-96 rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45), transparent 60%)' }}
          animate={{ y: [-18, 18, -18] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-10 bottom-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.48), transparent 60%)' }}
          animate={{ y: [22, -16, 22] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-grid-soft opacity-20 mix-blend-soft-light" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="relative z-10 flex flex-col gap-8"
        >
          <motion.span
            variants={subline}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300"
          >
            {hero.badge}
          </motion.span>

          <motion.h1
            variants={heading}
            className="min-h-[3.2rem] font-display text-3xl leading-tight text-white sm:min-h-[3.8rem] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <span className="relative block">
              <span
                aria-hidden
                className="pointer-events-none block select-none text-balance opacity-0"
              >
                {hero.typedText}
              </span>
              <span
                className="typewriter-text absolute inset-0 text-balance"
                aria-live="polite"
              >
                {typedHeadline}
                <span
                  aria-hidden
                  className={`typewriter-cursor ${cursorVisible ? 'opacity-80' : 'opacity-0'}`}
                >
                  |
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.p variants={subline} className="max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {hero.description}
          </motion.p>

          <motion.div variants={subline} className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="button-premium" data-cursor="interactive">
              {hero.primaryCta}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80"
              >
                <path
                  d="M6 12H18M18 12L12 6M18 12L12 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/35 hover:text-white"
              data-cursor="interactive"
              aria-label={hero.secondaryCta}
            >
              <WhatsAppIcon className="w-4" />
              <span>{hero.secondaryCta}</span>
            </a>
          </motion.div>

          <motion.ul variants={subline} className="grid max-w-xl grid-cols-1 gap-4 text-sm text-slate-300 sm:grid-cols-2">
            {hero.stats.map(item => (
              <li
                key={item.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4 backdrop-blur transition duration-300 hover:border-white/25"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">{item.label}</span>
                <span className="mt-2 block text-base text-white">{item.value}</span>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative flex justify-center">
          <motion.div
            ref={cardRef}
            style={{ y: cardParallax }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
            className="glass-card tilt-card relative w-full max-w-sm p-7 shadow-ambient-strong md:max-w-md"
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
          >
            <div className="absolute -top-20 left-6 hidden h-36 w-36 rounded-full bg-gc-secondary/25 blur-3xl md:block" />
            <div className="absolute -bottom-16 right-8 hidden h-40 w-40 rounded-full bg-gc-primary/30 blur-3xl md:block" />

            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-1 shadow-inner">
              <img src={profileImage} alt={hero.profileAlt} className="h-full w-full rounded-full object-cover" />
            </div>

            <div className="mt-7 flex flex-col gap-4 text-center">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
                {hero.capsuleBadge}
              </span>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {hero.capsules.map(item => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    className="rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-4 text-left shadow-[0_25px_60px_-35px_rgba(56,189,248,0.45)]"
                  >
                    <span className="text-lg font-semibold text-white">{item.title}</span>
                    <p className="mt-2 text-xs text-slate-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gc-primary/20 via-gc-secondary/15 to-gc-accent/20 px-4 py-4 text-sm text-slate-200">
                {hero.availability}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
