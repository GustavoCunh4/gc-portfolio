import alphaAvif from '../imgs/projects/alpha-clean.avif';
import alphaWebp from '../imgs/projects/alpha-clean.webp';
import stanchiAvif from '../imgs/projects/stanchi-seguros.avif';
import stanchiWebp from '../imgs/projects/stanchi-seguros.webp';
import asaniAvif from '../imgs/projects/asani.avif';
import asaniWebp from '../imgs/projects/asani.webp';
import motorlifeAvif from '../imgs/projects/motorlife.avif';
import motorlifeWebp from '../imgs/projects/motorlife.webp';

export const featuredProjects = [
  {
    title: 'Alpha Clean',
    summary: {
      'pt-BR': 'Sistema de gestão para lava-jato com agendamentos, experiência pública e presença digital orientada à conversão.',
      en: 'Car wash management system with scheduling, a public customer experience, and a conversion-oriented digital presence.'
    },
    image: { avif: alphaAvif, webp: alphaWebp },
    alt: {
      'pt-BR': 'Página inicial do sistema Alpha Clean',
      en: 'Alpha Clean system home page'
    },
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
    demoUrl: 'https://alpha-clean-pearl.vercel.app/',
    repositoryUrl: 'https://github.com/TTG-Alpha-Clean'
  },
  {
    title: 'Stanchi Seguros',
    summary: {
      'pt-BR': 'Site comercial para corretora de seguros com proposta clara, cotação personalizada e integração com WhatsApp.',
      en: 'Commercial insurance brokerage website with a clear proposition, custom quotes, and WhatsApp integration.'
    },
    image: { avif: stanchiAvif, webp: stanchiWebp },
    alt: {
      'pt-BR': 'Página inicial do site Stanchi Seguros',
      en: 'Stanchi Seguros website home page'
    },
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Vercel'],
    demoUrl: 'https://stanchi-seguros.vercel.app/',
    repositoryUrl: 'https://github.com/GustavoCunh4/StanchiSeguros'
  },
  {
    title: 'MotorLife',
    summary: {
      'pt-BR': 'Site institucional criado para conduzir o visitante em uma jornada clara: conhecer a marca, entender seus serviços e chegar facilmente ao contato. Um projeto focado em presença digital, confiança e conversão.',
      en: 'Institutional website designed to guide visitors through a clear journey: discovering the brand, understanding its services, and easily getting in touch. A project focused on digital presence, trust, and conversion.'
    },
    image: { avif: motorlifeAvif, webp: motorlifeWebp },
    alt: {
      'pt-BR': 'Página inicial do site Asani',
      en: 'MotorLife website home page'
    },
    stack: ['JavaScript', 'CSS', 'HTML', 'Vercel'],
    demoUrl: 'https://motorlife-motorhomers.vercel.app/',
    repositoryUrl: 'https://github.com/GustavoCunh4/motorlife-motorhomers'
  },
  {
    title: 'GymFlow',
    summary: {
      'pt-BR': 'Site institucional criado para conduzir o visitante em uma jornada clara: conhecer a marca, entender seus serviços e chegar facilmente ao contato. Um projeto focado em presença digital, confiança e conversão.',
      en: 'Institutional website designed to guide visitors through a clear journey: discovering the brand, understanding its services, and easily getting in touch. A project focused on digital presence, trust, and conversion.'
    },
    image: { avif: motorlifeAvif, webp: motorlifeWebp },
    alt: {
      'pt-BR': 'Página inicial do site Asani',
      en: 'MotorLife website home page'
    },
    stack: ['JavaScript', 'CSS', 'HTML', 'Vercel'],
    demoUrl: 'https://motorlife-motorhomers.vercel.app/',
    repositoryUrl: 'https://github.com/GustavoCunh4/motorlife-motorhomers'
  },
  {
  title: 'GymFlow',
  summary: {
    'pt-BR': 'Projeto em desenvolvimento para transformar a gestão de negócios fitness em uma experiência mais simples, integrada e eficiente. O GymFlow conecta alunos, planos, professores, pagamentos e processos administrativos em um único ecossistema digital.',
    en: 'Project in development designed to turn fitness business management into a simpler, more integrated, and efficient experience. GymFlow connects students, plans, instructors, payments, and administrative processes into a single digital ecosystem.'
  },
  image: { avif: gymflowAvif, webp: gymflowWebp },
  alt: {
    'pt-BR': 'Interface do projeto GymFlow em desenvolvimento',
    en: 'GymFlow project interface in development'
  },
  stack: ['Next.js', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL'],
  demoUrl: null,
  repositoryUrl: null,
  note: {
    'pt-BR': 'Projeto em desenvolvimento · Repositório privado · Deploy ainda não disponível',
    en: 'Project in development · Private repository · Deploy not available yet'
  }
  }
];

export const moreProjects = [
  {
    title: 'FullStack Mini Projeto',
    category: { 'pt-BR': 'API + Interface', en: 'API + Interface' },
    summary: {
      'pt-BR': 'Aplicação com autenticação JWT, arquitetura em camadas, Express, MongoDB e handler serverless.',
      en: 'Application with JWT authentication, layered architecture, Express, MongoDB, and a serverless handler.'
    },
    stack: ['Node.js', 'TypeScript', 'MongoDB'],
    repositoryUrl: 'https://github.com/GustavoCunh4/FullStack-Mini-Projeto',
    demoUrl: 'https://full-stack-mini-projeto.vercel.app/'
  },
  {
    title: 'Expense Tracker API',
    category: { 'pt-BR': 'Backend', en: 'Backend' },
    summary: {
      'pt-BR': 'API de despesas com FastAPI, PostgreSQL, autenticação JWT, arquitetura em camadas e testes Pytest.',
      en: 'Expense tracking API with FastAPI, PostgreSQL, JWT authentication, layered architecture, and Pytest coverage.'
    },
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/GustavoCunh4/ExpenseTrackerAPI'
  },
  {
    title: 'Wearable Safety IoT',
    category: { 'pt-BR': 'IoT', en: 'IoT' },
    summary: {
      'pt-BR': 'Protótipo ESP32 para monitoramento ambiental e alertas em tempo real para cenários de segurança.',
      en: 'ESP32 prototype for environmental monitoring and real-time alerts in safety scenarios.'
    },
    stack: ['ESP32', 'C++', 'WhatsApp API'],
    repositoryUrl: 'https://github.com/GustavoCunh4/wearable-safety-iot'
  },
  {
    title: 'Robô Espacial ESP32',
    category: { 'pt-BR': 'IoT + Backend', en: 'IoT + Backend' },
    summary: {
      'pt-BR': 'Robô experimental com telemetria, sensores, alertas, persistência Supabase e backend Python.',
      en: 'Experimental rover with telemetry, sensors, alerts, Supabase persistence, and a Python backend.'
    },
    stack: ['ESP32', 'Supabase', 'Python'],
    repositoryUrl: 'https://github.com/GustavoCunh4/iot-esp32-robo-espacial'
  }
];
