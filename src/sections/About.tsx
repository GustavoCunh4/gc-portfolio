import { motion, type MotionStyle } from "framer-motion"
import { useContent, useParallax, useScrollReveal } from "../hooks"

const listVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

type AboutProps = {
  motionStyle?: MotionStyle
  className?: string
}

export function About({ motionStyle, className }: AboutProps = {}) {
  const { ref: aboutRef, controls, variants } = useScrollReveal({
    distance: 32,
    amount: 0.35,
    blur: 22,
    scale: 0.97,
  })
  const { ref: cardsRef, value: cardsParallax } = useParallax({ offset: 60 })
  const about = useContent().about

  return (
    <motion.section
      id="about"
      style={motionStyle}
      className={`relative overflow-hidden py-36 ${className ?? ''}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-x-8 top-12 h-[420px] rounded-[36px] bg-gradient-to-r from-gc-primary/15 via-slate-900/40 to-gc-secondary/15 blur-3xl"
          animate={{ opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-20 bottom-8 h-80 w-80 rounded-full bg-gc-accent/28 blur-[150px]"
          animate={{ y: [-18, 12, -18] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-20">
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            {about.badge}
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">{about.title}</h2>
          {about.paragraphs.map(paragraph => (
            <p key={paragraph.slice(0, 24)} className="text-slate-300">
              {paragraph}
            </p>
          ))}
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-[26px] border border-white/10 px-5 py-5 text-left backdrop-blur-lg"
            >
              <span className="block text-xs uppercase tracking-[0.25em] text-slate-500">{about.softSkillTitle}</span>
              <p className="mt-3 text-white">{about.softSkillBody}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-[26px] border border-white/10 px-5 py-5 text-left backdrop-blur-lg"
            >
              <span className="block text-xs uppercase tracking-[0.25em] text-slate-500">{about.nextStepTitle}</span>
              <p className="mt-3 text-white">{about.nextStepBody}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div ref={cardsRef} style={{ y: cardsParallax }} className="relative space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-[30px] border border-white/10 p-7 backdrop-blur-xl"
          >
            <h3 className="font-display text-xl text-white">{about.timelineTitle}</h3>
            <p className="mt-4 text-sm text-slate-300">{about.description}</p>
            <ul className="mt-7 space-y-4">
              {about.timeline.map((item, index) => (
                <motion.li
                  key={`${item.title}-${item.year}`}
                  variants={listVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={index}
                  className="group rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-sm text-slate-200 backdrop-blur transition duration-500 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>{item.year}</span>
                    <span className="flex h-2 w-2 items-center justify-center rounded-full bg-gc-secondary/80" />
                  </div>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-slate-300">{item.description}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card flex flex-col gap-3 rounded-[26px] border border-white/10 px-6 py-6 text-sm text-slate-200"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{about.availabilityLabel}</span>
            <div className="flex flex-wrap gap-3">
              {about.availabilityItems.map(item => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

