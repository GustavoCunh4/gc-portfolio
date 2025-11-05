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
import { Language } from './contexts/LanguageContext'
import { projectsContent, siteContent, skillGroupsContent } from './translations'
import type { Project, SkillGroup, SkillItem } from './types/content'

export type { Project, SkillGroup, SkillItem }

export function getProjects(language: Language): Project[] {
  return projectsContent[language]
}

export function getSkillGroups(language: Language): SkillGroup[] {
  return skillGroupsContent[language]
}

export function getSiteContent(language: Language) {
  return siteContent[language]
}

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
  Python: pythonIcon,
  'CI/CD': devopsIcon,
  TypeScript: typescriptIcon,
  Next: nextIcon,
  'UI/UX': uiuxIcon,
  Testing: testingIcon,
  Framer: framerIcon,
  Database: databaseIcon,
}
