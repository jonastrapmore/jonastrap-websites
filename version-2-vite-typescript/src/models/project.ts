export interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  category: 'school' | 'zelfstudie' | 'examen'
  studyYear: 1 | 2 | 3
  discipline: 'frontend' | 'backend' | 'both'
  year: number
  tags: string[]

  // Demo-velden: vul in wat van toepassing is.
  // Frontend → image + url. Backend → github (+ codeFile). Both → een mix.
  image?: string
  url?: string
  github?: string
  codeFile?: string
}
