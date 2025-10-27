import { motion } from 'framer-motion'

const timeline = [
  {
    title: 'Engenharia de Computacao - SENAI CIMATEC',
    description: 'Projetos multidisciplinares conectando software, eletronica, IA e negocios.',
    year: 'Academico',
  },
  {
    title: 'Produtos sob demanda',
    description: 'Landing pages, automacoes, APIs e integracoes acionaveis para pequenos negocios.',
    year: 'Freelance',
  },
  {
    title: 'Comunidade e estudos',
    description: 'Monitoria, grupos de estudo e eventos focados em DevOps, front e IA generativa.',
    year: 'Comunidade',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            Sobre
          </span>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Curioso por natureza, disciplinado por formacao. Eu conecto exploracao de produto com execucao tecnica.
          </h2>
          <p className="text-slate-300">
            Atualmente mergulhado em Engenharia de Computacao no SENAI CIMATEC, atuo do planejamento ao deploy. Amo
            desenhar jornadas, automatizar bastidores e garantir entregas sustentaveis para quem usa e para quem opera.
          </p>
          <p className="text-slate-300">
            Ja passei por projetos academicos, hackathons e freelas: dashboards em tempo real, paginas de alta
            conversao, chatbots com IA e pipelines CI/CD. Busco conexoes com times que valorizem discovery continuo,
            autonomia e ciclos rapidos.
          </p>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Soft skills</span>
              <p className="mt-2 text-white">Autonomia, comunicacao, alinhamento entre dev, produto e negocio.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur">
              <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Proximo passo</span>
              <p className="mt-2 text-white">Projetos freelance, squads multidisciplinares e desafios de produto digital.</p>
            </div>
          </div>
        </motion.div>

        <div className="relative space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[30px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
          >
            <h3 className="font-display text-xl text-white">Mapa rapido</h3>
            <p className="mt-4 text-sm text-slate-300">
              Empilhando experiencias em engenharia para entregar produtos com impacto, aprendizado continuo e qualidade.
            </p>
            <ul className="mt-6 space-y-4">
              {timeline.map(item => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-200 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>{item.year}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gc-secondary/80" />
                  </div>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-slate-300">{item.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card flex flex-col gap-3 rounded-[26px] border border-white/10 px-6 py-5 text-sm text-slate-200"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Disponivel para</span>
            <div className="flex flex-wrap gap-3">
              {['Discovery sprint', 'Dev full stack', 'Projetos freelance', 'Talks e mentorias'].map(item => (
                <span key={item} className="tag-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
