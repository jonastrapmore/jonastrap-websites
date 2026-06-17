import { courses } from '../../data/courses.ts'
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


    projectRestProvider.getAll().then(projects => {
      this.body.querySelector('#counter-projecten')!.setAttribute('data-target', String(projects.length))
      initCounters(this.body)
    })
  }
}
