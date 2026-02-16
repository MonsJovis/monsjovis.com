export interface Location {
  city: string
  countryCode: string
  region: string
}

export interface Profile {
  network: string
  username: string
  url: string
}

export interface Basics {
  name: string
  label: string
  image: string
  email: string
  phone?: string
  url: string
  summary: string
  location: Location
  profiles: Profile[]
}

export interface Work {
  name: string
  position: string
  url: string
  startDate: string
  endDate?: string
  summary: string
  highlights: string[]
}

export interface Education {
  institution: string
  url: string
  area: string
  studyType: string
  startDate: string
  endDate: string
}

export interface Skill {
  name: string
  keywords: string[]
}

export interface Project {
  name: string
  description: string
  keywords: string[]
  url: string
  startDate: string
  endDate?: string
  entity?: string
}

export interface Language {
  language: string
  fluency: string
}

export interface Resume {
  basics: Basics
  work: Work[]
  education: Education[]
  skills: Skill[]
  domains: string[]
  projects: Project[]
  languages: Language[]
}
