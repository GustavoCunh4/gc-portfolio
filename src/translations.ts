import { Language } from './contexts/LanguageContext'
import { Project, SkillGroup } from './types/content'
import alphaCleanImg from './assets/projects/alpha-clean.jpg'
import ageCalculatorImg from './assets/projects/age-calculator.jpg'
import av1FullstackImg from './assets/projects/av1-fullstack.jpg'
import cssIcon from './assets/tech/css.svg'
import databaseIcon from './assets/tech/database.svg'
import devopsIcon from './assets/tech/devops.svg'
import framerIcon from './assets/tech/framer.svg'
import gitIcon from './assets/tech/git.svg'
import githubIcon from './assets/tech/github.svg'
import htmlIcon from './assets/tech/html.svg'
import javascriptIcon from './assets/tech/javascript.svg'
import nextIcon from './assets/tech/next.svg'
import nodeIcon from './assets/tech/node.svg'
import npmIcon from './assets/tech/npm.svg'
import pythonIcon from './assets/tech/python.svg'
import reactIcon from './assets/tech/react.svg'
import tailwindIcon from './assets/tech/tailwind.svg'
import testingIcon from './assets/tech/testing.svg'
import typescriptIcon from './assets/tech/typescript.svg'
import uiuxIcon from './assets/tech/uiux.svg'
import viteIcon from './assets/tech/vite.svg'

type HeroContent = {
  badge: string
  typedText: string
  description: string
  primaryCta: string
  secondaryCta: string
  whatsappMessage: string
  stats: { label: string; value: string }[]
  capsules: { title: string; description: string }[]
  capsuleBadge: string
  profileAlt: string
  availability: string
}

type AboutContent = {
  badge: string
  title: string
  description: string
  paragraphs: string[]
  timelineTitle: string
  softSkillTitle: string
  softSkillBody: string
  nextStepTitle: string
  nextStepBody: string
  timeline: { title: string; description: string; year: string }[]
  availabilityLabel: string
  availabilityItems: string[]
}

type TechContent = {
  badge: string
  heading: string
  subheading: string
  description: string
}

type ProjectsContent = {
  badge: string
  heading: string
  description: string
  viewAllLabel: string
  selectorLabel: string
  caseButtonLabel: string
  modal: {
    live: string
    repo: string
  }
  techLabel: string
}

type ContactContent = {
  badge: string
  heading: string
  intro: string
  availabilityLabel: string
  availabilityBody: string
  whatsappBadge: string
  whatsappDescription: string
  whatsappCta: string
  whatsappMessage: string
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    sending: string
    success: string
    close: string
  }
}

type HeaderContent = {
  nav: {
    hero: string
    about: string
    tech: string
    projects: string
    contact: string
  }
  tagline: string
  whatsappLabel: string
  whatsappMessage: string
  languageToggleLabel: string
}

export type SiteContent = {
  hero: HeroContent
  about: AboutContent
  tech: TechContent
  projects: ProjectsContent
  contact: ContactContent
  header: HeaderContent
}

export const projectsContent: Record<Language, Project[]> = {
  pt: [
    {
      slug: 'alpha-clean',
      title: 'Alpha Clean',
      subtitle: 'Presenca digital premium para um lava a jato.',
      summary: 'Onboarding, vitrine e agendamento alinhados ao negocio.',
      description:
        'Construcao end-to-end: front animado em React, backend Node para cadastros e agenda, automacoes de contato e dashboard para a equipe. Entreguei identidade consistente, autonomia para o cliente e experiencia fluida para usuarios.',
      image: alphaCleanImg,
      liveUrl: 'https://alpha-clean-pearl.vercel.app/',
      repoUrl: 'https://github.com/TTG-Alpha-Clean',
      techs: ['React', 'Node.js', 'Tailwind CSS', 'Vite', 'GitHub'],
      year: 'Freelance',
    },
    {
      slug: 'age-calculator',
      title: 'Age Calculator App',
      subtitle: 'Desafio com validacao amigavel e microinteracoes.',
      summary: 'Feedback em tempo real e layout responsivo para contagens de idade.',
      description:
        'Implementei validacao sem friccao, estados visuais e layout que responde bem a diferentes tamanhos de tela. O foco foi transformar uma tarefa simples em uma experiencia elegante e acessivel.',
      image: ageCalculatorImg,
      liveUrl: 'https://age-calculator-app.vercel.app/',
      repoUrl: 'https://github.com/GustavoCunh4/age-calculator-app',
      techs: ['HTML', 'CSS', 'JavaScript'],
      year: 'Estudo guiado',
    },
    {
      slug: 'coding-conf',
      title: 'Conference Ticket Generator',
      subtitle: 'Gerador de ingressos com storytelling visual.',
      summary: 'Interface imersiva com upload, preview e ticket pronto para compartilhar.',
      description:
        'Desenvolvi landing page interativa com pipeline de validacoes, animacoes suaves e ticket final pronto para uso. Trabalhei responsividade, identidade digital e boas praticas de acessibilidade.',
      image: av1FullstackImg,
      liveUrl: 'https://av-1-full-stack-frontend.vercel.app/',
      repoUrl: 'https://github.com/GustavoCunh4/AV1-FullStack-Frontend',
      techs: ['HTML', 'CSS', 'JavaScript', 'Git'],
      year: 'Projeto autoral',
    },
  ],
  en: [
    {
      slug: 'alpha-clean',
      title: 'Alpha Clean',
      subtitle: 'Premium digital presence for a car wash brand.',
      summary: 'Onboarding, showcase and booking flow aligned with the business.',
      description:
        'End-to-end delivery: animated React frontend, Node backend for bookings and clients, contact automations and dashboard for the crew. Provided a cohesive identity, autonomy for the client and a fluid experience for users.',
      image: alphaCleanImg,
      liveUrl: 'https://alpha-clean-pearl.vercel.app/',
      repoUrl: 'https://github.com/TTG-Alpha-Clean',
      techs: ['React', 'Node.js', 'Tailwind CSS', 'Vite', 'GitHub'],
      year: 'Freelance',
    },
    {
      slug: 'age-calculator',
      title: 'Age Calculator App',
      subtitle: 'Challenge with friendly validation and micro interactions.',
      summary: 'Real time feedback and responsive layout for age calculations.',
      description:
        'Implemented frictionless validation, visual states and layouts that react well to any screen size. The focus was turning a simple tool into an elegant and accessible experience.',
      image: ageCalculatorImg,
      liveUrl: 'https://age-calculator-app.vercel.app/',
      repoUrl: 'https://github.com/GustavoCunh4/age-calculator-app',
      techs: ['HTML', 'CSS', 'JavaScript'],
      year: 'Guided study',
    },
    {
      slug: 'coding-conf',
      title: 'Conference Ticket Generator',
      subtitle: 'Ticket generator with a crafted storytelling experience.',
      summary: 'Immersive interface with upload, live preview and shareable ticket.',
      description:
        'Built an interactive landing page with validation pipeline, soft motion design and a final ticket ready to share. Focused on responsiveness, digital identity and accessibility.',
      image: av1FullstackImg,
      liveUrl: 'https://av-1-full-stack-frontend.vercel.app/',
      repoUrl: 'https://github.com/GustavoCunh4/AV1-FullStack-Frontend',
      techs: ['HTML', 'CSS', 'JavaScript', 'Git'],
      year: 'Self project',
    },
  ],
}

export const skillGroupsContent: Record<Language, SkillGroup[]> = {
  pt: [
    {
      title: 'Experiencia digital refinada',
      subtitle: 'Da descoberta do usuario ao acabamento visual das interfaces.',
      items: [
        {
          name: 'UI/UX Design',
          icon: uiuxIcon,
          badge: 'Produto',
          description: 'Figma, handoff com engenharia e design centrado no usuario.',
        },
        {
          name: 'Framer Motion',
          icon: framerIcon,
          badge: 'UI Motion',
          description: 'Storytelling com animacoes, transicoes e microinteracoes.',
        },
        {
          name: 'Tailwind CSS',
          icon: tailwindIcon,
          badge: 'Framework',
          description: 'Design system escalavel, tokens e componentes desacoplados.',
        },
        {
          name: 'CSS3',
          icon: cssIcon,
          badge: 'Linguagem',
          description: 'Design systems, grids responsivos, animacoes e temas dark/light.',
        },
        {
          name: 'HTML5',
          icon: htmlIcon,
          badge: 'Linguagem',
          description: 'Semantica, acessibilidade, SEO tecnico e componentes reutilizaveis.',
        },
      ],
    },
    {
      title: 'Stack para construir produto',
      subtitle: 'Ferramentas que uso para shippar frontend rapido e confiavel.',
      items: [
        {
          name: 'React.js',
          icon: reactIcon,
          badge: 'Framework',
          description: 'SPA, hooks avancados, componentizacao e estados complexos.',
        },
        {
          name: 'Next.js',
          icon: nextIcon,
          badge: 'Framework',
          description: 'App Router, SSR/SSG, otimizacao de imagens e API routes.',
        },
        {
          name: 'TypeScript',
          icon: typescriptIcon,
          badge: 'Linguagem',
          description: 'Modelagem forte de tipos, DX para squads e seguranca em runtime.',
        },
        {
          name: 'JavaScript',
          icon: javascriptIcon,
          badge: 'Linguagem',
          description: 'ESNext, arquitetura modular, consumo de APIs e microinteracoes.',
        },
        {
          name: 'Node.js',
          icon: nodeIcon,
          badge: 'Runtime',
          description: 'APIs REST, integracoes externas, automacoes e orquestracao de fila.',
        },
        {
          name: 'Vite',
          icon: viteIcon,
          badge: 'Ferramenta',
          description: 'Bundles rapidos, code splitting e HMR consistente.',
        },
      ],
    },
    {
      title: 'Entrega continua e operacao',
      subtitle: 'Automacao, qualidade e colaboracao para manter produto em producao.',
      items: [
        {
          name: 'Python',
          icon: pythonIcon,
          badge: 'Linguagem',
          description: 'Scripts de dados, automacoes com FastAPI e integracoes com IA.',
        },
        {
          name: 'Banco de dados',
          icon: databaseIcon,
          badge: 'Infra',
          description: 'Modelagem relacional, consultas otimizadas e migrations.',
        },
        {
          name: 'CI/CD e observabilidade',
          icon: devopsIcon,
          badge: 'DevOps',
          description: 'Pipelines automatizados, monitoramento e alertas proativos.',
        },
        {
          name: 'Qualidade e testes',
          icon: testingIcon,
          badge: 'Qualidade',
          description: 'Testes automatizados, QA continua e metricas de entrega.',
        },
        {
          name: 'Git',
          icon: gitIcon,
          badge: 'Ferramenta',
          description: 'Branching strategies, code review e automacoes de merge.',
        },
        {
          name: 'GitHub',
          icon: githubIcon,
          badge: 'Ferramenta',
          description: 'Projects, Actions, templates e colaboracao multidisciplinar.',
        },
        {
          name: 'NPM',
          icon: npmIcon,
          badge: 'Ferramenta',
          description: 'Scripts customizados, workspaces e publicacoes.',
        },
      ],
    },
  ],
  en: [
    {
      title: 'Refined digital experience',
      subtitle: 'From user insights to interface polish.',
      items: [
        {
          name: 'UI/UX Design',
          icon: uiuxIcon,
          badge: 'Product',
          description: 'Figma workflows, engineering handoff and user-centred design.',
        },
        {
          name: 'Framer Motion',
          icon: framerIcon,
          badge: 'UI Motion',
          description: 'Narrative animations, transitions and micro interactions.',
        },
        {
          name: 'Tailwind CSS',
          icon: tailwindIcon,
          badge: 'Framework',
          description: 'Scalable design systems, tokens and decoupled components.',
        },
        {
          name: 'CSS3',
          icon: cssIcon,
          badge: 'Language',
          description: 'Responsive grids, advanced animation and dark/light themes.',
        },
        {
          name: 'HTML5',
          icon: htmlIcon,
          badge: 'Language',
          description: 'Semantic structure, accessibility, technical SEO and reusable components.',
        },
      ],
    },
    {
      title: 'Shipping product',
      subtitle: 'Tools I rely on to ship fast, accessible frontend experiences.',
      items: [
        {
          name: 'React.js',
          icon: reactIcon,
          badge: 'Framework',
          description: 'SPA, advanced hooks, componentization and complex state.',
        },
        {
          name: 'Next.js',
          icon: nextIcon,
          badge: 'Framework',
          description: 'App Router, SSR/SSG, image optimisation and API routes.',
        },
        {
          name: 'TypeScript',
          icon: typescriptIcon,
          badge: 'Language',
          description: 'Strong typing models, developer experience for squads and runtime safety.',
        },
        {
          name: 'JavaScript',
          icon: javascriptIcon,
          badge: 'Language',
          description: 'ESNext, modular architecture, API consumption and micro interactions.',
        },
        {
          name: 'Node.js',
          icon: nodeIcon,
          badge: 'Runtime',
          description: 'REST APIs, external integrations, automations and queues.',
        },
        {
          name: 'Vite',
          icon: viteIcon,
          badge: 'Tooling',
          description: 'Fast builds, code splitting and reliable HMR.',
        },
      ],
    },
    {
      title: 'Continuous delivery and operations',
      subtitle: 'Automation, quality and collaboration to keep products live.',
      items: [
        {
          name: 'Python',
          icon: pythonIcon,
          badge: 'Language',
          description: 'Data scripts, FastAPI automations and AI integrations.',
        },
        {
          name: 'Databases',
          icon: databaseIcon,
          badge: 'Infra',
          description: 'Relational modelling, optimised queries and migrations.',
        },
        {
          name: 'CI/CD and observability',
          icon: devopsIcon,
          badge: 'DevOps',
          description: 'Automated pipelines, monitoring and proactive alerts.',
        },
        {
          name: 'Quality and testing',
          icon: testingIcon,
          badge: 'Quality',
          description: 'Automated tests, continuous QA and delivery metrics.',
        },
        {
          name: 'Git',
          icon: gitIcon,
          badge: 'Tooling',
          description: 'Branching strategies, code review and merge automations.',
        },
        {
          name: 'GitHub',
          icon: githubIcon,
          badge: 'Tooling',
          description: 'Projects, Actions, templates and cross functional collaboration.',
        },
        {
          name: 'NPM',
          icon: npmIcon,
          badge: 'Tooling',
          description: 'Custom scripts, workspaces and package publishing.',
        },
      ],
    },
  ],
}

export const siteContent: Record<Language, SiteContent> = {
  pt: {
    header: {
      nav: {
        hero: 'Inicio',
        about: 'Sobre',
        tech: 'Tecnologias',
        projects: 'Projetos',
        contact: 'Contato',
      },
      tagline: 'Produto & Engenharia',
      whatsappLabel: 'Falar no WhatsApp',
      whatsappMessage:
        'Ola Gustavo! Acabei de visitar seu portfolio e gostaria de conversar sobre uma possivel colaboracao.',
      languageToggleLabel: 'Idioma',
    },
    hero: {
      badge: 'Produto / engenharia / UX',
      typedText:
        'Transformo ideias\nem produtos\ndigitais que\nconectam\nnegocio,\nengenharia e\npessoas.',
      description:
        'Sou Gustavo Cunha, engenheiro de computacao em formacao. Crio produtos digitais com visao de discovery, arquitetura e dados - experiencias com alma de design e rigor de engenharia.',
      primaryCta: 'Ver projetos',
      secondaryCta: 'Falar no WhatsApp',
      whatsappMessage:
        'Ola Gustavo! Quero entender como podemos trabalhar juntos em um produto digital.',
      stats: [
        { label: 'Stack favorita', value: 'TypeScript / React / Node' },
        { label: 'Atuacao', value: 'Produto digital end-to-end' },
        { label: 'Disponivel', value: 'Projetos freelance & squads' },
        { label: 'Localizacao', value: 'Salvador / Bahia / remoto' },
      ],
      capsules: [
        { title: 'UX viva', description: 'Storytelling, acessibilidade e microinteracoes precisas.' },
        { title: 'Stack fluida', description: 'Integracoes e automacoes alinhadas ao produto.' },
      ],
      capsuleBadge: 'Como entrego',
      profileAlt: 'Retrato de Gustavo Cunha',
      availability:
        'Disponivel para liderar sprints de validacao, evoluir produtos em squads ageis e colaborar em experiencias digitais premium.',
    },
    about: {
      badge: 'Sobre',
      title: 'Curioso por natureza, disciplinado por formacao. Conecto exploracao de produto com execucao tecnica.',
      description: 'Empilhando experiencias em engenharia para entregar impacto real, aprendizado continuo e qualidade.',
      paragraphs: [
        'Atualmente mergulhado em Engenharia de Computacao no SENAI CIMATEC, atuo do planejamento ao deploy. Amo desenhar jornadas, automatizar bastidores e orquestrar entregas sustentaveis - equilibrando UX, arquitetura e dados.',
        'Ja participei de projetos academicos, hackathons e freelas: dashboards em tempo real, paginas de conversao, chatbots com IA e pipelines CI/CD. Procuro times que valorizem discovery continuo, autonomia e ciclos rapidos.',
      ],
      timelineTitle: 'Mapa rapido',
      softSkillTitle: 'Soft skills',
      softSkillBody: 'Autonomia, comunicacao e alinhamento entre produto, design e engenharia.',
      nextStepTitle: 'Proximo passo',
      nextStepBody: 'Projetos freelance, squads multidisciplinares e desafios de produto digital premium.',
      timeline: [
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
      ],
      availabilityLabel: 'Disponivel para',
      availabilityItems: ['Discovery sprint', 'Dev full stack', 'Projetos freelance', 'Talks e mentorias'],
    },
    tech: {
      badge: 'Habilidades e tecnologias',
      heading: 'Toolkit para transformar briefing em produto vivo.',
      subheading: 'Um mix de stacks, processos e ferramentas que habilitam experiencias premium e entregas rapidas.',
      description:
        'Cada bloco apresenta a combinacao de habilidades tecnicas, processos e impacto aplicado em produtos reais e estudos de caso.',
    },
    projects: {
      badge: 'Projetos',
      heading: 'Cases que traduzem engenharia, UX e microinteracoes em produto vivo.',
      description:
        'Experimentos e entregas com foco em fluidez, storytelling e evolucao continua. Cada projeto combina UI premium, integracoes enxutas e operacao real.',
      viewAllLabel: 'Ver todos os repositorios',
      selectorLabel: 'Selecionar case',
      caseButtonLabel: 'Ver case completo',
      modal: {
        live: 'Live demo',
        repo: 'Repositorio',
      },
      techLabel: 'Tecnologias',
    },
    contact: {
      badge: 'Contato',
      heading: 'Vamos criar algo juntos? Compartilhe o desafio, produto ou parceria que voce tem em mente.',
      intro:
        'Gosto de projetos que equilibram design, estrategia e execucao tecnica. Me encontre pelo WhatsApp para respostas rapidas ou envie um e-mail com o contexto completo.',
      availabilityLabel: 'Disponibilidade',
      availabilityBody:
        'Salvador - Bahia (remoto ou hibrido). Agenda aberta para colaboracoes pontuais e parcerias continuas.',
      whatsappBadge: 'WhatsApp',
      whatsappDescription:
        'Respondo mais rapido por aqui. Pode mandar audio, briefing, links de referencia ou uma ideia inicial.',
      whatsappCta: 'Iniciar conversa',
      whatsappMessage:
        'Ola Gustavo! Vi seu portfolio e gostaria de conversar sobre um projeto ou colaboracao.',
      form: {
        nameLabel: 'Nome',
        namePlaceholder: 'Como posso te chamar?',
        emailLabel: 'E-mail',
        emailPlaceholder: 'nome@email.com',
        messageLabel: 'Mensagem',
        messagePlaceholder: 'Conte um pouco do desafio...',
        submit: 'Enviar mensagem',
        sending: 'Enviando...',
        success: 'Recebi sua mensagem! Vou responder em breve.',
        close: 'Fechar',
      },
    },
  },
  en: {
    header: {
      nav: {
        hero: 'Home',
        about: 'About',
        tech: 'Tech',
        projects: 'Projects',
        contact: 'Contact',
      },
      tagline: 'Product & Engineering',
      whatsappLabel: 'Chat on WhatsApp',
      whatsappMessage:
        'Hi Gustavo! I just checked your portfolio and would love to talk about a potential collaboration.',
      languageToggleLabel: 'Language',
    },
    hero: {
      badge: 'Product / engineering / UX',
      typedText:
        'I turn ideas into\ndigital products\nthat connect\nbusiness,\nengineering and\npeople.',
      description:
        'I am Gustavo Cunha, a computer engineering student. I build digital products with discovery, architecture and data in mind - experiences with design soul and engineering rigor.',
      primaryCta: 'View projects',
      secondaryCta: 'Chat on WhatsApp',
      whatsappMessage:
        'Hi Gustavo! I would like to discuss how we can work together on a digital product.',
      stats: [
        { label: 'Favorite stack', value: 'TypeScript / React / Node' },
        { label: 'Focus', value: 'End-to-end digital product' },
        { label: 'Availability', value: 'Freelance projects & squads' },
        { label: 'Location', value: 'Salvador / Bahia / remote' },
      ],
      capsules: [
        { title: 'Living UX', description: 'Storytelling, accessibility and precise micro interactions.' },
        { title: 'Fluid stack', description: 'Integrations and automations aligned with the product.' },
      ],
      capsuleBadge: 'How I deliver',
      profileAlt: 'Portrait of Gustavo Cunha',
      availability:
        'Available to lead validation sprints, evolve products with squads and collaborate on premium digital experiences.',
    },
    about: {
      badge: 'About',
      title: 'Curious by nature, disciplined by training. I connect product discovery with technical execution.',
      description: 'Stacking engineering experiences to deliver real impact, continuous learning and quality.',
      paragraphs: [
        'Currently immersed in Computer Engineering at SENAI CIMATEC, I work from planning to deploy. I enjoy crafting journeys, automating backstage tasks and orchestrating sustainable deliveries, balancing UX, architecture and data.',
        'I have taken part in academic projects, hackathons and freelance gigs: real-time dashboards, conversion pages, AI chatbots and CI/CD pipelines. I look for teams that value continuous discovery, autonomy and short cycles.',
      ],
      timelineTitle: 'Quick map',
      softSkillTitle: 'Soft skills',
      softSkillBody: 'Autonomy, communication and alignment between product, design and engineering.',
      nextStepTitle: 'Next step',
      nextStepBody: 'Freelance projects, cross-functional squads and premium product challenges.',
      timeline: [
        {
          title: 'Computer Engineering - SENAI CIMATEC',
          description: 'Multidisciplinary projects connecting software, electronics, AI and business.',
          year: 'Academic',
        },
        {
          title: 'On-demand products',
          description: 'Landing pages, automations, APIs and actionable integrations for small businesses.',
          year: 'Freelance',
        },
        {
          title: 'Community and studies',
          description: 'Mentoring, study groups and events focused on DevOps, frontend and generative AI.',
          year: 'Community',
        },
      ],
      availabilityLabel: 'Available for',
      availabilityItems: ['Discovery sprint', 'Full stack dev', 'Freelance projects', 'Talks and mentoring'],
    },
    tech: {
      badge: 'Skills & technology',
      heading: 'Toolkit to move from briefing to live product.',
      subheading: 'A mix of stacks, processes and tools that deliver premium experiences at startup speed.',
      description:
        'Each block highlights the combination of technical skills, processes and impact applied to real products and case studies.',
    },
    projects: {
      badge: 'Projects',
      heading: 'Cases that blend engineering, UX and micro interactions into live products.',
      description:
        'Experiments and deliveries focused on motion, storytelling and continuous evolution. Every project combines premium UI, lean integrations and real operation.',
      viewAllLabel: 'View all repositories',
      selectorLabel: 'Choose case',
      caseButtonLabel: 'See full case',
      modal: {
        live: 'Live demo',
        repo: 'Repository',
      },
      techLabel: 'Technologies',
    },
    contact: {
      badge: 'Contact',
      heading: 'Let us build something together. Tell me about the challenge, product or partnership you have in mind.',
      intro:
        'I enjoy projects that balance design, strategy and execution. Ping me on WhatsApp for a fast reply or send an email with full context.',
      availabilityLabel: 'Availability',
      availabilityBody:
        'Salvador - Bahia (remote or hybrid). Open agenda for short collaborations and ongoing partnerships.',
      whatsappBadge: 'WhatsApp',
      whatsappDescription:
        'Fastest channel to align next steps. Send voice notes, a briefing, references or just an initial idea.',
      whatsappCta: 'Start a chat',
      whatsappMessage:
        'Hi Gustavo! I saw your portfolio and would like to talk about a project or collaboration.',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'How should I call you?',
        emailLabel: 'Email',
        emailPlaceholder: 'name@email.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me a bit about the challenge...',
        submit: 'Send message',
        sending: 'Sending...',
        success: 'Got your message! I will reply soon.',
        close: 'Close',
      },
    },
  },
}
