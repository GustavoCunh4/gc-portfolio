import alphaAvif from '../imgs/projects/alpha-clean.avif';
import alphaWebp from '../imgs/projects/alpha-clean.webp';
import stanchiAvif from '../imgs/projects/stanchi-seguros.avif';
import stanchiWebp from '../imgs/projects/stanchi-seguros.webp';
import asaniAvif from '../imgs/projects/asani.avif';
import asaniWebp from '../imgs/projects/asani.webp';

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
    title: 'Asani',
    summary: {
      'pt-BR': 'Experiência institucional imersiva com direção visual própria, animações fluidas e ambientação 3D responsiva.',
      en: 'Immersive institutional experience with a distinctive visual direction, fluid motion, and responsive 3D ambience.'
    },
    image: { avif: asaniAvif, webp: asaniWebp },
    alt: {
      'pt-BR': 'Página inicial do site Asani',
      en: 'Asani website home page'
    },
    stack: ['TypeScript', 'Three.js', 'GSAP', 'Vite'],
    demoUrl: 'https://gustavocunh4.github.io/asani-v5/',
    repositoryUrl: 'https://github.com/GustavoCunh4/asani-v5'
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
