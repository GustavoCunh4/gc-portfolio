import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import type { MouseEvent } from 'react'
import { getSkillGroups } from '../data'
import { useContent, useScrollReveal } from '../hooks'
import { useLanguage } from '../contexts/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: index * 0.08, duration: 0.55, ease },
  }),
}

export function Tech() {
  const { ref, controls, variants } = useScrollReveal({
    distance: 32,
    amount: 0.3,
    blur: 22,
    scale: 0.97,
  })
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const content = useContent().tech
  const skillGroups = useMemo(() => getSkillGroups(language), [language])
  const labelLayer = language === 'pt' ? 'Foco de entrega' : 'Delivery focus'
  const altPrefix = language === 'pt' ? 'Icone de' : 'Icon of'
  const appliedLabel = language === 'pt' ? 'Aplicado em produtos ativos' : 'Applied in active products'

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion) return
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -5
      const rotateY = ((x - centerX) / centerX) * 5

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
    <section id="tech" className="relative py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-radial opacity-30"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-grid-soft opacity-20" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            {content.badge}
          </span>
          <h2 className="font-display text-3xl text-white md:text-5xl">{content.heading}</h2>
          <p className="text-base text-slate-300 md:text-lg">{content.subheading}</p>
          <p className="text-sm text-slate-400 md:text-base">{content.description}</p>
        </motion.div>

        <div className="space-y-20">
          {skillGroups.map(group => (
            <div key={group.title} className="space-y-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3 md:max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-300">
                    {labelLayer}
                  </span>
                  <h3 className="font-display text-2xl text-white md:text-3xl">{group.title}</h3>
                  <p className="text-sm text-slate-300 md:text-base">{group.subtitle}</p>
                </div>
                <div className="text-sm text-slate-400 md:max-w-sm md:text-right">
                  {content.description}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
                {group.items.map((skill, index) => (
                  <motion.article
                    key={skill.name}
                    custom={index}
                    initial="hidden"
                    whileInView="show"
                    variants={cardVariants}
                    viewport={{ once: true, amount: 0.35 }}
                    whileHover={{ translateY: shouldReduceMotion ? 0 : -10 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    className="group tilt-card relative flex w-full flex-col items-center gap-6 rounded-[26px] border border-white/12 bg-gradient-to-br from-slate-900/80 via-slate-900/55 to-slate-900/40 p-8 text-center shadow-ambient-soft backdrop-blur-sm sm:w-auto sm:flex-[0_1_260px] md:flex-[0_1_280px]"
                    onMouseMove={handlePointerMove}
                    onMouseLeave={handlePointerLeave}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner shadow-black/30">
                        <img src={skill.icon} alt={`${altPrefix} ${skill.name}`} className="h-10 w-10 object-contain" />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_45px_rgba(124,58,237,0.45)]" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-slate-300">
                        {skill.badge}
                      </span>
                      <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">{skill.description}</p>
                    <div className="mt-auto flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                      <span className="inline-flex h-2 w-2 rounded-full bg-gc-secondary/70" />
                      <span>{appliedLabel}</span>
                    </div>
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/8 via-transparent to-white/10 opacity-0 transition duration-500"
                    />
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
















