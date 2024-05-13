
export interface CvDocument {
  whoami: Whoami
  education: EducationInfo[]
  projects: ProjectInfo[]
  employment: EmploymentInfo[]
}

export interface Whoami {
  name: string
  contactInfo: ContactInfo
  address: Address
  tagline: string
  summary: string
  tags: string[]
}

export interface ContactInfo {
  number: string
  email: string
  links: string[]
}

export interface Address {
  street?: string
  postalCode?: string
  city: string
  province: string
  country: string
}

export interface EducationInfo {
  degree: string
  accolades: string[]
  institution: string
  startDate: string
  endDate: string
  address: Address
}

export interface EmploymentInfo {
  title: string
  company: string
  address?: Address
  startDate: string
  endDate: string
  tags: string[]
  summary: string
  lines: string[]
}

export interface ProjectInfo {
  title: string
  tags: string[]
  links: string[]
  summary: string
  lines: string[]
}
