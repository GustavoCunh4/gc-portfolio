import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#about', label: 'Sobre' },
  { href: '#tech', label: 'Tecnologias' },
  { href: '#projects', label: 'Projetos' },
  { href: '#contact', label: 'Contato' },
]

const linkVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const baseHeader =
    'mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full px-5 transition-all'
  const headerStyles = scrolled
    ? `${baseHeader} glass-card py-3 shadow-lg shadow-black/30 backdrop-blur`
    : `${baseHeader} py-5`

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
      <div className={headerStyles}>
        <a href="#hero" className="flex items-center gap-3">
          <motion.span
            layout
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/6 p-1 shadow-[0_10px_40px_rgba(124,58,237,0.35)]"
            whileHover={{ rotate: 6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12 }}
          >
            <img src="/src/assets/gc-logo.png" alt="Logotipo GC" className="h-full w-full object-contain" />
          </motion.span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-white">Gustavo Cunha</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Tech Solutions</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <motion.a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              variants={linkVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              {link.label}
            </motion.a>
          ))}
          <a
            href="https://github.com/gustavocunh4"
            target="_blank"
            rel="noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gc-primary to-gc-secondary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-gc-primary/30 transition hover:shadow-gc-secondary/40"
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-white/35 md:hidden"
          onClick={() => setOpen(value => !value)}
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900/90 px-6 py-5 backdrop-blur md:hidden"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/gustavocunh4"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-gc-primary to-gc-secondary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gc-primary/30"
            >
              GitHub
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
