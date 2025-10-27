import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { projectTechIcons, projects } from '../data'

const highlightMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

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

  if (!activeProject) {
    return null
  }

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
              Projetos
            </span>
            <h2 className="mt-4 font-display text-3xl text-white md:text-4xl">
              Cases que mostram minha forma de desenhar e desenvolver produtos.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Reuni projetos que combinam UI viva, integracoes enxutas e entrega iterativa. Quer entender como adapto
              esse formato ao seu contexto? Me chama e a gente conversa.
            </p>
          </div>
          <a
            href="https://github.com/gustavocunh4"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Ver todos os repositorios
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
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.slug}
              {...highlightMotion}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/60 backdrop-blur"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-t-[36px] bg-slate-950">
                <img
                  src={activeProject.image}
                  alt={`Previa do projeto ${activeProject.title}`}
                  className="h-full w-full object-cover transition duration-[1200ms] hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gc-primary/20 via-transparent to-transparent" />
              </div>
              <div className="space-y-5 px-8 pb-10 pt-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>{activeProject.year}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gc-secondary/80" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                  <p className="text-sm uppercase tracking-[0.3em] text-gc-secondary">{activeProject.subtitle}</p>
                  <p className="text-slate-300">{activeProject.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {techBadges.map(tech => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/65 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-slate-900/80 hover:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        {tech.icon && <img src={tech.icon} alt={`Icone de ${tech.name}`} className="h-6 w-6 object-contain" />}
                      </div>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gc-primary via-gc-secondary to-gc-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gc-primary/25 transition hover:shadow-gc-secondary/40"
                  >
                    Live demo
                  </a>
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
                  >
                    GitHub
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex flex-col gap-4">
            {projects.map((project, index) => {
              const isActive = index === safeIndex
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-[24px] border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gc-secondary/60 ${
                    isActive
                      ? 'border-gc-secondary/60 bg-white/[0.08]'
                      : 'border-white/10 bg-slate-900/40 hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="h-16 w-20 overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
                    <img
                      src={project.image}
                      alt={`Miniatura do projeto ${project.title}`}
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
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/15 bg-slate-900/90 shadow-[0_40px_120px_-30px_rgba(15,23,42,0.9)]"
              onClick={event => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white/80 transition hover:border-white/30 hover:text-white"
                aria-label="Fechar modal"
              >
                ×
              </button>
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-72 w-full overflow-hidden bg-slate-950 md:h-full">
                  <img
                    src={activeProject.image}
                    alt={`Mockup completo do projeto ${activeProject.title}`}
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
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Tecnologias</span>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {activeProject.techs.map(tech => (
                        <div
                          key={tech}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                            {projectTechIcons[tech] && (
                              <img src={projectTechIcons[tech]} alt={`Icone de ${tech}`} className="h-6 w-6 object-contain" />
                            )}
                          </div>
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gc-primary via-gc-secondary to-gc-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gc-primary/25 transition hover:shadow-gc-secondary/40"
                    >
                      Live demo
                    </a>
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
                    >
                      GitHub
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
