import { courses } from '../../data/courses.ts'
import { writtenCourses } from '../../data/writtenCourses.ts'
import { projectRestProvider } from '../../data/data.ts'
import { initCounters } from '../../effects/counter.ts'
import { revealOnScroll } from '../../effects/reveal.ts'
import { Page } from '../../router/page.ts'
import HTML from './home.html?raw'

export class HomePage extends Page {

  constructor() {
    super(HTML)
  }

  render(): void {
    super.render()
    this.#renderCourses()
    this.#renderYearStatus()
    this.#renderProgress()
    revealOnScroll(this.body)
    this.#setCountersTargets()
  }

  #renderCourses(): void {
    courses.forEach(course => {
      const container = this.body.querySelector(`#year-${course.year}`)!

      const el = document.createElement('custom-course')
      el.setAttribute('name', course.name)
      el.setAttribute('description', course.description)
      el.setAttribute('done', String(course.done))

      container.appendChild(el)
    })
  }

  // Zet per jaar de status-badge én de banner-kleur automatisch:
  //  - alle vakken van dat jaar done       -> groen,  "🎉 Afgewerkt!"
  //  - het eerste nog niet afgewerkte jaar -> navy,   "🚀 Bezig"  (het huidige jaar)
  //  - de jaren daarna                     -> oranje, "🔜 Te volgen"
  #renderYearStatus(): void {
    const years = [1, 2, 3]
    const isDone = (year: number): boolean => {
      const yearCourses = courses.filter(c => c.year === year)
      return yearCourses.length > 0 && yearCourses.every(c => c.done)
    }
    // Het "huidige" jaar = het eerste jaar dat nog niet volledig afgewerkt is.
    const currentYear = years.find(year => !isDone(year))

    const headerBase = 'card-header text-white d-flex justify-content-between align-items-center py-3'
    const styles = {
      afgewerkt: { header: `${headerBase} bg-success`, badge: 'badge bg-light text-success fw-semibold', text: '🎉 Afgewerkt!' },
      bezig: { header: `${headerBase} trap-bg-primary`, badge: 'badge bg-light trap-text-primary fw-semibold', text: '🚀 Bezig' },
      tevolgen: { header: `${headerBase} trap-bg-accent`, badge: 'badge bg-light trap-text-accent fw-semibold', text: '🔜 Te volgen' },
    }

    for (const year of years) {
      const status = isDone(year) ? 'afgewerkt' : year === currentYear ? 'bezig' : 'tevolgen'
      const style = styles[status]

      const header = this.body.querySelector<HTMLDivElement>(`#header-${year}`)
      const badge = this.body.querySelector<HTMLSpanElement>(`#status-${year}`)
      if (header) header.className = style.header
      if (badge) {
        badge.className = style.badge
        badge.innerText = style.text
      }
    }
  }

  #renderProgress(): void {
    const total = courses.length
    const done = courses.filter(c => c.done).length
    const percent = Math.round((done / total) * 100)

    const bar = this.body.querySelector<HTMLDivElement>('#progress-bar')!
    const label = this.body.querySelector<HTMLSpanElement>('#progress-label')!

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.width = `${percent}%`
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5})

    observer.observe(bar)
    label.innerText = `${done}/${total} (${percent}%)`
  }

  #setCountersTargets(): void {
    this.body.querySelector('#counter-vakken')!.setAttribute('data-target', String(courses.length))
    this.body.querySelector('#counter-cursussen')!.setAttribute('data-target', String(writtenCourses.length))

    projectRestProvider.getAll().then(projects => {
      this.body.querySelector('#counter-projecten')!.setAttribute('data-target', String(projects.length))
      initCounters(this.body)
    })
  }
}
