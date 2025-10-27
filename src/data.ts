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
import testingIcon from './assets/tech/testing.svg'
import tailwindIcon from './assets/tech/tailwind.svg'
import typescriptIcon from './assets/tech/typescript.svg'
import uiuxIcon from './assets/tech/uiux.svg'
import viteIcon from './assets/tech/vite.svg'

export type Project = {
  slug: string
  title: string
  subtitle: string
  summary: string
  description: string
  image: string
  liveUrl: string
  repoUrl: string
  techs: string[]
  year: string
}

export const projects: Project[] = [
  {
    slug: 'alpha-clean',
    title: 'Alpha Clean',
    subtitle: 'Presenca digital e operacao conectada para um lava a jato premium.',
    summary:
      'Case full stack com onboarding, vitrine e fluxo de agendamento alinhado ao negocio.',
    description:
      'Construcao end-to-end: React animado, backend Node para cadastros e agenda, automacoes de contato e dashboard para a equipe. Entreguei identidade consistente, autonomia para o cliente e experiencia fluida para usuarios.',
    image: alphaCleanImg,
    liveUrl: 'https://alpha-clean-pearl.vercel.app/',
    repoUrl: 'https://github.com/TTG-Alpha-Clean',
    techs: ['React', 'Node.js', 'Tailwind CSS', 'Vite', 'GitHub'],
    year: 'Freelance',
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator App',
    subtitle: 'Desafio Frontend Mentor com microinteracoes e validacao amigavel.',
    summary:
      'UI clean com feedback instantaneo para idade e contagens personalizadas.',
    description:
      'Implementei validacao sem friccao, estados visuais e layout responsivo para diferentes devices. O foco foi transformar uma ferramenta simples em uma experiencia elegante e acessivel.',
    image: ageCalculatorImg,
    liveUrl: 'https://age-calculator-app.vercel.app/',
    repoUrl: 'https://github.com/GustavoCunh4/age-calculator-app',
    techs: ['HTML', 'CSS', 'JavaScript'],
    year: 'Estudo guiado',
  },
  {
    slug: 'coding-conf',
    title: 'Conference Ticket Generator',
    subtitle: 'Gerador de ingressos com personalizacao visual para eventos tech.',
    summary:
      'Interface imersiva com upload de imagem, preview em tempo real e storytelling.',
    description:
      'Landing page interativa com pipeline de validacoes, animacoes suaves e ticket final pronto para compartilhamento. Trabalhei responsividade, identidade digital e boas praticas de acessibilidade.',
    image: av1FullstackImg,
    liveUrl: 'https://av-1-full-stack-frontend.vercel.app/',
    repoUrl: 'https://github.com/GustavoCunh4/AV1-FullStack-Frontend',
    techs: ['HTML', 'CSS', 'JavaScript', 'Git'],
    year: 'Projeto autoral',
  },
]

export type SkillLevel = 'Avancado' | 'Intermediario' | 'Explorando'

export type SkillItem = {
  name: string
  icon: string
  badge: string
  level: SkillLevel
  description: string
}

export type SkillGroup = {
  title: string
  subtitle: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Linguagens & Marcacao',
    subtitle: 'Base solida para interfaces acessiveis e performaticas.',
    items: [
      {
        name: 'HTML5',
        icon: htmlIcon,
        badge: 'Linguagem',
        level: 'Avancado',
        description: 'Semantica, acessibilidade, SEO tecnico e componentes reutilizaveis.',
      },
      {
        name: 'CSS3',
        icon: cssIcon,
        badge: 'Linguagem',
        level: 'Avancado',
        description: 'Design systems, grids responsivos, animacoes e temas dark/light.',
      },
      {
        name: 'JavaScript',
        icon: javascriptIcon,
        badge: 'Linguagem',
        level: 'Avancado',
        description: 'ESNext, arquitetura modular, consumo de APIs e microinteracoes.',
      },
      {
        name: 'TypeScript',
        icon: typescriptIcon,
        badge: 'Linguagem',
        level: 'Avancado',
        description: 'Modelagem forte de tipos, DX para squads e seguranca em runtime.',
      },
    ],
  },
  {
    title: 'Frameworks & Runtimes',
    subtitle: 'Camadas que aceleram entregas do frontend ao backend.',
    items: [
      {
        name: 'React.js',
        icon: reactIcon,
        badge: 'Framework',
        level: 'Avancado',
        description: 'SPA/SSR, hooks avancados, componentizacao e estados complexos.',
      },
      {
        name: 'Next.js',
        icon: nextIcon,
        badge: 'Framework',
        level: 'Intermediario',
        description: 'App Router, SSR/SSG, otimizacao de imagens e API routes.',
      },
      {
        name: 'Node.js',
        icon: nodeIcon,
        badge: 'Runtime',
        level: 'Intermediario',
        description: 'APIs REST, integracoes externas, automacoes e orquestracao de fila.',
      },
      {
        name: 'Tailwind CSS',
        icon: tailwindIcon,
        badge: 'Framework',
        level: 'Avancado',
        description: 'Design system escalavel, tokens, componentes desacoplados.',
      },
      {
        name: 'Vite',
        icon: viteIcon,
        badge: 'Ferramenta',
        level: 'Intermediario',
        description: 'Bundles rapidos, code splitting e HMR consistente para squads.',
      },
    ],
  },
  {
    title: 'Ferramentas & Colaboracao',
    subtitle: 'Fluxos que garantem versionamento, entrega continua e time alinhado.',
    items: [
      {
        name: 'Git',
        icon: gitIcon,
        badge: 'Ferramenta',
        level: 'Avancado',
        description: 'Branching strategies, code review e automacoes de merge.',
      },
      {
        name: 'GitHub',
        icon: githubIcon,
        badge: 'Ferramenta',
        level: 'Avancado',
        description: 'Projects, Actions, templates e colaboracao multidisciplinar.',
      },
      {
        name: 'NPM',
        icon: npmIcon,
        badge: 'Ferramenta',
        level: 'Intermediario',
        description: 'Monorepos, scripts customizados, workspaces e publicacoes.',
      },
      {
        name: 'Framer Motion',
        icon: framerIcon,
        badge: 'UI Motion',
        level: 'Intermediario',
        description: 'Storytelling com animacoes, transicoes complexas e microinteracoes.',
      },
    ],
  },
  {
    title: 'Dados, Automacao & Experiencia',
    subtitle: 'Garantia de observabilidade, insights e experiencia centrada.',
    items: [
      {
        name: 'Python',
        icon: pythonIcon,
        badge: 'Linguagem',
        level: 'Intermediario',
        description: 'Scripts de dados, automacoes com FastAPI e integracao com IA.',
      },
      {
        name: 'Banco de Dados',
        icon: databaseIcon,
        badge: 'Infra',
        level: 'Explorando',
        description: 'Modelagem relacional, consultas otimizadas e migrations.',
      },
      {
        name: 'CI/CD & Observabilidade',
        icon: devopsIcon,
        badge: 'DevOps',
        level: 'Intermediario',
        description: 'Pipelines automatizados, monitoramento e alertas proativos.',
      },
      {
        name: 'UI/UX Design',
        icon: uiuxIcon,
        badge: 'Produto',
        level: 'Intermediario',
        description: 'Figma, handoff com engenharia e design centrado no usuario.',
      },
      {
        name: 'Qualidade & Testes',
        icon: testingIcon,
        badge: 'Qualidade',
        level: 'Explorando',
        description: 'Testes automatizados, cultura de QA continua e metricas de entrega.',
      },
    ],
  },
]

export const projectTechIcons: Record<string, string> = {
  React: reactIcon,
  'Node.js': nodeIcon,
  'Tailwind CSS': tailwindIcon,
  Vite: viteIcon,
  GitHub: githubIcon,
  NPM: npmIcon,
  HTML: htmlIcon,
  CSS: cssIcon,
  JavaScript: javascriptIcon,
  Git: gitIcon,
}
