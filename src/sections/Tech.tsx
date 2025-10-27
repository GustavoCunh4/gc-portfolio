import { motion } from 'framer-motion'
import { skillGroups } from '../data'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: 'easeOut' },
  }),
}

export function Tech() {
  return (
    <section id="tech" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.12),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(79,70,229,0.18),transparent_60%)] opacity-70" />
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            Habilidades & tecnologias
          </span>
          <h2 className="font-display text-3xl text-white md:text-5xl">
            Toolkit para tirar ideias do briefing e levar ate a producao.
          </h2>
          <p className="text-base text-slate-300 md:text-lg">
            Uma selecao das stacks e ferramentas que aplico para construir produtos completos, garantir DX e evoluir o
            negocio.
          </p>
        </div>

        <div className="space-y-16">
          {skillGroups.map(group => (
            <div key={group.title} className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3 md:max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-300">
                    Camada de atuacao
                  </span>
                  <h3 className="font-display text-2xl text-white md:text-3xl">{group.title}</h3>
                  <p className="text-sm text-slate-300 md:text-base">{group.subtitle}</p>
                </div>
                <div className="text-sm text-slate-400 md:max-w-sm md:text-right">
                  Cada card resume a combinacao entre habilidade tecnica, processos e impacto aplicado em produtos reais
                  e estudos de caso.
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((skill, index) => (
                  <motion.article
                    key={skill.name}
                    custom={index}
                    initial="hidden"
                    whileInView="show"
                    variants={cardVariants}
                    viewport={{ once: true, amount: 0.3 }}
                    className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-900/40 p-8 text-left shadow-[0_28px_60px_-25px_rgba(15,23,42,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_70px_-20px_rgba(56,189,248,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner shadow-black/30">
                          <img src={skill.icon} alt={`Icone de ${skill.name}`} className="h-10 w-10 object-contain" />
                          <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 group-hover:shadow-[0_0_25px_rgba(129,140,248,0.45)]" />
                        </div>
                        <div className="space-y-2">
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-300">
                            {skill.badge}
                          </span>
                          <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-gc-primary/40 bg-gc-primary/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">{skill.description}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                      <span className="inline-flex h-2 w-2 rounded-full bg-gc-secondary/70" />
                      <span>Aplicado em produtos ativos</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
