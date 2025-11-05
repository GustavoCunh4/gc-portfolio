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

export type SkillItem = {
  name: string
  icon: string
  badge: string
  description: string
}

export type SkillGroup = {
  title: string
  subtitle: string
  items: SkillItem[]
}
