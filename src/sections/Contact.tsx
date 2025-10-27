import { motion } from 'framer-motion'

const socials = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/luiz-gustavo-santos-cunha-854988256/' },
  { label: 'GitHub', url: 'https://github.com/gustavocunh4' },
  { label: 'Instagram', url: 'https://www.instagram.com/guga_cunha_' },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            Contato
          </span>
          <h2 className="mt-5 font-display text-3xl text-white md:text-4xl">
            Vamos criar algo juntos? Me conta sobre o desafio, produto ou parceria freelance que voce tem em mente.
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Curto projetos que equilibram design, estrategia e execucao tecnica. Pode chamar para evoluir um produto,
            liderar um sprint ou tocar uma entrega pontual. Respondo com foco e clareza por e-mail ou LinkedIn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map(social => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="tag-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition hover:brightness-110"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card relative flex-1 rounded-[30px] border border-white/10 p-8"
        >
          <div className="absolute -top-10 right-12 h-24 w-24 rounded-full bg-gc-primary/25 blur-2xl" />
          <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-gc-secondary/25 blur-2xl" />

          <div className="relative space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">E-mail</span>
              <a
                href="mailto:luizgustavocunha.dev@gmail.com"
                className="mt-1 block text-lg font-semibold text-white transition hover:text-gc-secondary"
              >
                luizgustavocunha.dev@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Disponibilidade</span>
              <p className="mt-1 text-sm text-slate-300">
                Salvador - Bahia (remoto ou hibrido). AGENDA aberta para colaboracoes pontuais e parcerias continuas.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Como posso te chamar?"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gc-secondary/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="nome@email.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gc-secondary/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  placeholder="Conta um pouco do desafio..."
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gc-secondary/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-gc-primary via-gc-secondary to-gc-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gc-primary/30 transition hover:shadow-gc-secondary/40"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
