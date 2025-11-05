import { AnimatePresence, motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { useLanguage } from '../contexts/LanguageContext'
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_PHONE_LINK } from '../constants'
import { useContent, useScrollReveal } from '../hooks'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type FormState = 'idle' | 'sending' | 'sent'

export function Contact() {
  const { ref: copyRef, controls: copyControls, variants: copyVariants } = useScrollReveal({
    distance: 28,
    amount: 0.35,
    blur: 24,
    scale: 0.96,
  })
  const { ref: formRef, controls: formControls, variants: formVariants } = useScrollReveal({
    distance: 36,
    amount: 0.3,
    delay: 0.1,
    blur: 26,
    scale: 0.95,
  })

  const [status, setStatus] = useState<FormState>('idle')
  const contact = useContent().contact
  const { language } = useLanguage()
  const emailBadge = language === 'pt' ? 'E-mail' : 'Email'
  const whatsappHref = `${WHATSAPP_PHONE_LINK}?text=${encodeURIComponent(contact.whatsappMessage)}`
  const socials = [
    { label: contact.whatsappBadge, url: whatsappHref, isWhatsapp: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/luiz-gustavo-santos-cunha-854988256/' },
    { label: 'GitHub', url: 'https://github.com/gustavocunh4' },
    { label: 'Instagram', url: 'https://www.instagram.com/guga_cunha_' },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    window.setTimeout(() => {
      setStatus('sent')
      window.setTimeout(() => setStatus('idle'), 3000)
    }, 1200)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-x-10 top-16 h-[420px] rounded-[40px] bg-gradient-to-r from-gc-primary/18 via-slate-900/40 to-gc-secondary/18 blur-3xl"
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-12 bottom-12 h-72 w-72 rounded-full bg-gc-secondary/25 blur-[140px]"
          animate={{ y: [18, -16, 18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-start">
        <motion.div
          ref={copyRef}
          initial="hidden"
          animate={copyControls}
          variants={copyVariants}
          className="flex-1 space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            {contact.badge}
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">{contact.heading}</h2>
          <p className="max-w-xl text-slate-300">{contact.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map(social => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`tag-pill transition hover:brightness-110 ${social.isWhatsapp ? 'border-gc-secondary/60 text-white hover:border-gc-secondary/80' : ''}`}
                data-cursor="interactive"
              >
                {social.isWhatsapp && <WhatsAppIcon className="h-4 w-4" />}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 space-y-4 rounded-3xl border border-gc-secondary/35 bg-white/[0.04] p-6 shadow-ambient-soft backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-gc-secondary/50 bg-gc-secondary/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-100">
              {contact.whatsappBadge}
            </span>
            <p className="text-sm text-slate-200">{contact.whatsappDescription}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="button-premium inline-flex"
                data-cursor="interactive"
                aria-label={contact.whatsappCta}
              >
                <WhatsAppIcon />
                <span>{contact.whatsappCta}</span>
              </a>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{WHATSAPP_DISPLAY_NUMBER}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={formRef}
          initial="hidden"
          animate={formControls}
          variants={formVariants}
          className="glass-card relative flex-1 rounded-[30px] border border-white/12 p-8"
        >
          <div className="absolute -top-10 right-14 h-24 w-24 rounded-full bg-gc-primary/25 blur-2xl" />
          <div className="absolute -bottom-12 left-9 h-28 w-28 rounded-full bg-gc-secondary/25 blur-2xl" />

          <div className="relative space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{emailBadge}</span>
              <a
                href="mailto:luizgustavocunha.dev@gmail.com"
                className="mt-1 block text-lg font-semibold text-white transition hover:text-gc-secondary"
                data-cursor="interactive"
              >
                luizgustavocunha.dev@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{contact.availabilityLabel}</span>
              <p className="mt-1 text-sm text-slate-300">{contact.availabilityBody}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {contact.form.nameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={contact.form.namePlaceholder}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-gc-secondary/60 focus:ring-2 focus:ring-gc-secondary/30 focus:outline-none"
                  data-cursor="interactive"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {contact.form.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={contact.form.emailPlaceholder}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-gc-secondary/60 focus:ring-2 focus:ring-gc-secondary/30 focus:outline-none"
                  data-cursor="interactive"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {contact.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  placeholder={contact.form.messagePlaceholder}
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-gc-secondary/60 focus:ring-2 focus:ring-gc-secondary/30 focus:outline-none"
                  data-cursor="interactive"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="button-premium w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                data-cursor="interactive"
              >
                {status === 'sending' ? contact.form.sending : contact.form.submit}
              </button>
            </form>
          </div>

          <AnimatePresence>
            {status === 'sent' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease }}
                className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-2xl border border-white/12 bg-white/10 px-5 py-4 text-sm text-white shadow-[0_18px_40px_-30px_rgba(34,211,238,0.6)] backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gc-secondary/30 text-gc-secondary">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L10 16L18 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{contact.form.success}</span>
                </div>
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
                  onClick={() => setStatus('idle')}
                  data-cursor="interactive"
                >
                  {contact.form.close}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}


