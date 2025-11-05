import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { getProjects, projectTechIcons } from '../data'
import { useContent, useParallax, useScrollReveal } from '../hooks'
import { useLanguage } from '../contexts/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

const highlightMotion = {
  initial: { opacity: 0, y: 48, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
  exit: {
    opacity: 0,
    y: -42,
    scale: 0.97,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const selectorVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.45, ease },
  }),
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const content = useContent().projects
  const projects = useMemo(() => getProjects(language), [language])
  const altPrefix = language === 'pt' ? 'Icone de' : 'Icon of'
  const previewLabel = language === 'pt' ? 'Previa do projeto' : 'Project preview of'
  const thumbnailLabel = language === 'pt' ? 'Miniatura do projeto' : 'Project thumbnail for'
  const modalLabel = language === 'pt' ? 'Mockup completo do projeto' : 'Full project mockup of'
  const closeModalLabel = language === 'pt' ? 'Fechar modal' : 'Close modal'

  const safeIndex = projects.length ? Math.min(Math.max(activeIndex, 0), projects.length - 1) : 0
  const activeProject = projects[safeIndex]

  const techBadges = useMemo(
    () =>
      activeProject?.techs.map(tech => ({
        name: tech,
        icon: projectTechIcons[tech],
      })) ?? [],
    [activeProject?.techs],
  )

  const { ref: headerRef, controls: headerControls, variants: headerVariants } = useScrollReveal({
    distance: 32,
    amount: 0.35,
    blur: 20,
    scale: 0.97,
  })
  const { ref: previewRef, value: previewParallax } = useParallax({ offset: 90 })

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
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

  const handlePointerLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement
    target.style.setProperty('--tilt-x', '0deg')
    target.style.setProperty('--tilt-y', '0deg')
  }, [])

  if (!activeProject) {
    return null
  }

  return (
    <section id="projects" className="relative py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gc-primary/18 via-transparent to-gc-secondary/20"
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-grid-soft opacity-15" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={headerVariants}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
              {content.badge}
            </span>
            <h2 className="font-display text-3xl text-white md:text-4xl">{content.heading}</h2>
            <p className="max-w-2xl text-slate-300">{content.description}</p>
          </div>
          <a
            href="https://github.com/gustavocunh4"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
            data-cursor="interactive"
          >
            {content.viewAllLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 17L17 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 7H17V16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.slug}
              {...highlightMotion}
              className="group tilt-card relative overflow-hidden rounded-[36px] border border-white/12 bg-slate-900/70 shadow-ambient-soft backdrop-blur-xl"
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
            >
              <motion.div
                ref={previewRef}
                style={{ y: previewParallax }}
                className="relative h-80 w-full overflow-hidden rounded-t-[36px] bg-slate-950"
              >
                <motion.img
                  src={activeProject.image}
                  alt={`${previewLabel} ${activeProject.title}`}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gc-primary/25 via-transparent to-transparent mix-blend-screen" />
              </motion.div>

              <div className="space-y-6 px-8 pb-10 pt-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
                  <span>{activeProject.year}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gc-secondary/80" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                  <p className="text-xs uppercase tracking-[0.4em] text-gc-secondary">{activeProject.subtitle}</p>
                  <p className="text-slate-300">{activeProject.summary}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {techBadges.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.4, ease }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/55 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        {tech.icon && <img src={tech.icon} alt={`${altPrefix} ${tech.name}`} className="h-6 w-6 object-contain" />}
                      </div>
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="button-premium" data-cursor="interactive">
                    {content.modal.live}
                  </a>
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
                    data-cursor="interactive"
                  >
                    {content.modal.repo}
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
                    data-cursor="interactive"
                  >
                    {content.caseButtonLabel}
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease }}
              className="text-xs uppercase tracking-[0.3em] text-slate-500"
            >
              {content.selectorLabel}
            </motion.span>

            <div className="flex flex-col gap-4">
              {projects.map((project, index) => {
                const isActive = index === safeIndex

                return (
                  <motion.button
                    key={project.slug}
                    type="button"
                    custom={index}
                    variants={selectorVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    onClick={() => setActiveIndex(index)}
                    className={`group flex items-center gap-4 rounded-[24px] border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-white/25 bg-white/[0.08] shadow-[0_28px_80px_-35px_rgba(56,189,248,0.35)]'
                        : 'border-white/12 bg-slate-900/45 hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                    data-cursor="interactive"
                    onMouseMove={handlePointerMove}
                    onMouseLeave={handlePointerLeave}
                  >
                    <div className="h-16 w-20 overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
                      <img
                        src={project.image}
                        alt={`${thumbnailLabel} ${project.title}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{project.year}</span>
                      <span className="truncate text-sm font-semibold text-white">{project.title}</span>
                      <span className="truncate text-xs text-slate-400">{project.subtitle}</span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                        isActive ? 'bg-gc-secondary/25 text-gc-secondary' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/15 bg-slate-900/92 shadow-[0_45px_140px_-35px_rgba(15,23,42,0.9)]"
              onClick={event => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white/80 transition hover:border-white/30 hover:text-white"
                aria-label={closeModalLabel}
                title={closeModalLabel}
                data-cursor="interactive"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 7L17 17M17 7L7 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-72 w-full overflow-hidden bg-slate-950 md:h-full">
                  <img
                    src={activeProject.image}
                    alt={`${modalLabel} ${activeProject.title}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gc-primary/20 via-transparent to-transparent" />
                </div>
                <div className="space-y-5 px-8 py-10">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
                    <span>{activeProject.year}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gc-secondary/80" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-gc-secondary">{activeProject.subtitle}</p>
                    <p className="text-sm text-slate-300">{activeProject.description}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{content.techLabel}</span>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {activeProject.techs.map(tech => (
                        <div
                          key={tech}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                            {projectTechIcons[tech] && (
                              <img src={projectTechIcons[tech]} alt={`${altPrefix} ${tech}`} className="h-6 w-6 object-contain" />
                            )}
                          </div>
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="button-premium" data-cursor="interactive">
                      {content.modal.live}
                    </a>
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
                      data-cursor="interactive"
                    >
                      {content.modal.repo}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}









