import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Language } from '../contexts/LanguageContext'
import { useLanguage } from '../contexts/LanguageContext'
import gcLogo from '../assets/gc-logo.png'
import { WHATSAPP_PHONE_LINK } from '../constants'
import { useContent, useScrollProgress } from '../hooks'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const navItem = {
  hidden: { opacity: 0, y: 12 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * index + 0.2,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

type LanguageSwitchProps = {
  active: Language
  onSelect: (value: Language) => void
  ariaLabel: string
  className?: string
  buttonClassName?: string
}

function LanguageSwitch({ active, onSelect, ariaLabel, className, buttonClassName }: LanguageSwitchProps) {
  const baseButton =
    'rounded-full px-3 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gc-secondary/50'

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex items-center rounded-full border border-white/12 bg-white/5 p-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-300 ${className ?? ''}`}
    >
      {(['pt', 'en'] as Language[]).map(value => (
        <button
          key={value}
          type="button"
          data-cursor="interactive"
          aria-pressed={active === value}
          onClick={() => onSelect(value)}
          className={`${baseButton} ${buttonClassName ?? ''} ${
            active === value
              ? 'bg-white text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.35)]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { progress } = useScrollProgress({ stiffness: 160, damping: 26 })
  const { language, setLanguage } = useLanguage()
  const content = useContent().header
  const whatsappHref = `${WHATSAPP_PHONE_LINK}?text=${encodeURIComponent(content.whatsappMessage)}`

  const navLinks = [
    { href: '#hero', label: content.nav.hero },
    { href: '#about', label: content.nav.about },
    { href: '#tech', label: content.nav.tech },
    { href: '#projects', label: content.nav.projects },
    { href: '#contact', label: content.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const menuLabel =
    language === 'pt'
      ? open
        ? 'Fechar menu'
        : 'Abrir menu'
      : open
        ? 'Close menu'
        : 'Open menu'

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-gc-primary via-gc-secondary to-gc-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-6 md:px-6">
        <motion.div
          className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full px-5 transition-all duration-500"
          animate={{
            paddingTop: scrolled ? 12 : 20,
            paddingBottom: scrolled ? 12 : 20,
            backgroundColor: scrolled ? 'rgba(8,11,24,0.92)' : 'rgba(8,11,24,0)',
            boxShadow: scrolled ? '0 20px 60px -40px rgba(56,189,248,0.35)' : '0 0 0 rgba(0,0,0,0)',
            borderColor: scrolled ? 'rgba(148,163,184,0.16)' : 'rgba(148,163,184,0)',
          }}
          style={{
            borderWidth: 1,
            borderColor: 'transparent',
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          }}
        >
          <a href="#hero" className="flex items-center gap-3" data-cursor="interactive">
            <motion.span
              layout
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 p-1 shadow-[0_15px_45px_rgba(124,58,237,0.35)]"
              whileHover={{ rotate: 6, scale: 1.05 }}
              whileTap={{ rotate: -4, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <img src={gcLogo} alt="Logotipo GC" className="h-full w-full object-contain" />
            </motion.span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-white">Gustavo Cunha</span>
              <span className="text-[0.55rem] uppercase tracking-[0.4em] text-slate-400">{content.tagline}</span>
            </div>
          </a>

          <div className="hidden items-center gap-5 md:flex">
            <nav className="flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  data-cursor="interactive"
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-white"
                  variants={navItem}
                  initial="hidden"
                  animate="show"
                  custom={index}
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-3 pl-4">
              <LanguageSwitch
                active={language}
                onSelect={setLanguage}
                ariaLabel={content.languageToggleLabel}
              />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="button-whatsapp button-whatsapp--compact ml-1"
                data-cursor="interactive"
                aria-label={content.whatsappLabel}
              >
                <span className="button-whatsapp-icon">
                  <WhatsAppIcon alt="" />
                </span>
                <span className="button-whatsapp-label">{content.whatsappLabel}</span>
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-label={menuLabel}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-white/35 md:hidden"
            onClick={() => setOpen(value => !value)}
            data-cursor="interactive"
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-white transition ${
                open ? 'translate-y-0 rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-white transition ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-white transition ${
                open ? 'translate-y-0 -rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mx-auto mt-4 flex max-w-6xl flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/90 px-6 py-6 shadow-ambient-strong backdrop-blur md:hidden"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                    data-cursor="interactive"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                <LanguageSwitch
                  active={language}
                  onSelect={value => {
                    setLanguage(value)
                  }}
                  ariaLabel={content.languageToggleLabel}
                  className="w-full justify-between"
                  buttonClassName="flex-1 px-4 py-2 text-[0.7rem]"
                />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="button-whatsapp button-whatsapp--compact justify-center"
                  data-cursor="interactive"
                  onClick={() => setOpen(false)}
                  aria-label={content.whatsappLabel}
                >
                  <span className="button-whatsapp-icon">
                    <WhatsAppIcon alt="" />
                  </span>
                  <span className="button-whatsapp-label">{content.whatsappLabel}</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
