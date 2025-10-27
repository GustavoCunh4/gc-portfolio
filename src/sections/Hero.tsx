import { motion } from 'framer-motion'
import profileImage from '../assets/profile.jpg'

const container = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-40 pb-32 md:pt-36"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-gc-primary/30 blur-3xl" />
        <div className="absolute right-16 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-gc-secondary/25 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-gc-accent/30 blur-3xl" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ['0% 0%', '60% 60%', '0% 0%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(241, 245, 249, 0.08) 0, transparent 55%), radial-gradient(circle at 80% 0%, rgba(148, 163, 184, 0.08) 0, transparent 55%)',
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
        <div className="relative z-10 flex flex-col gap-8">
          <motion.span
            custom={0.05}
            initial="hidden"
            animate="show"
            variants={container}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300"
          >
            Produto, engenharia e ux
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.15}
            variants={container}
            className="font-display text-4xl leading-tight text-white md:text-6xl"
          >
            Transformo ideias em produtos digitais que conectam negocio e pessoas.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.25}
            variants={container}
            className="max-w-xl text-lg text-slate-300 md:text-xl"
          >
            Eu sou Gustavo Cunha, engenheiro de computacao em formacao. Ajudo equipes e pequenos negocios a validar,
            construir e evoluir produtos digitais end-to-end. Unindo discovery, engenharia e dados, mantenho o foco em
            entregas que resolvem dores reais e geram valor continuo.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.35}
            variants={container}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gc-primary via-gc-secondary to-gc-accent px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-gc-primary/25 transition hover:shadow-gc-secondary/40"
            >
              Ver projetos
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
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
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Vamos conversar
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={0.45}
            variants={container}
            className="grid max-w-xl grid-cols-1 gap-4 text-sm text-slate-300 sm:grid-cols-2"
          >
            {[
              { label: 'Stack favorita', value: 'TypeScript / React / Node.js' },
              { label: 'Atuacao', value: 'Produtos digitais ponta a ponta' },
              { label: 'Disponivel', value: 'Projetos freelance e squads ageis' },
              { label: 'Localizacao', value: 'Salvador - Bahia (remoto)' },
            ].map(item => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 backdrop-blur transition hover:border-white/25"
              >
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</span>
                <span className="mt-1 block text-sm text-white">{item.value}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="relative w-full max-w-sm rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.75)] backdrop-blur md:max-w-md"
          >
            <div className="absolute -top-16 left-6 hidden h-24 w-24 rounded-3xl bg-gc-secondary/20 blur-2xl md:block" />
            <div className="absolute -bottom-14 right-6 hidden h-28 w-28 rounded-3xl bg-gc-primary/25 blur-2xl md:block" />

            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-1 shadow-inner">
              <img
                src={profileImage}
                alt="Retrato de Gustavo Cunha"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Como entrego</span>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="text-2xl font-semibold text-white">UX viva</span>
                  <p className="mt-1 text-xs text-slate-400">Interfaces com storytelling, acessibilidade e microinteracoes.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                  <span className="text-2xl font-semibold text-white">Stack fluida</span>
                  <p className="mt-1 text-xs text-slate-400">APIs, automacoes e integracoes alinhadas ao negocio.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gc-primary/15 via-gc-secondary/10 to-gc-accent/15 px-4 py-3 text-sm text-slate-200">
                Disponivel para colaborar em projetos freelance, sprints de validacao e produtos que buscam evoluir rapido.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
