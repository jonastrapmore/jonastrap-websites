// De (gratis) cursussen die ik zelf schreef. De teller op de homepage telt deze
// automatisch, dus voeg je hier een cursus toe, dan groeit de teller vanzelf mee.
export interface WrittenCourse {
  name: string
  url: string
}

export const writtenCourses: WrittenCourse[] = [
  { name: 'JavaScript', url: '/javascriptcourse/' },
  { name: 'TypeScript', url: '/typescriptcourse/' },
]
