import { projectRestProvider } from '../../data/data.ts'
import { revealOnScroll } from '../../effects/reveal.ts'
import type { Project } from '../../models/project.ts'
import { Page } from '../../router/page.ts'
import HTML from './projects.html?raw'

export class ProjectsPage extends Page {

  #projects: Project[] = []
  #container = this.body.querySelector<HTMLDivElement>('#projects')!
  #titleFilter = this.body.querySelector<HTMLInputElement>('#search')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #disciplineFilter = this.body.querySelectorAll<HTMLInputElement>('input[name="discipline"]')!
  #yearFilter = this.body.querySelector<HTMLSelectElement>('#year-filter')!

  // Uitgelichte cursus-kaart: staat los van de projectdata en de filters,
  // en wordt altijd als eerste cel in de grid geplaatst.
  readonly #courseCardHTML = `
    <div class="col">
      <div class="card h-100 border-0 shadow-sm">
        <div class="ratio ratio-16x9">
          <div class="d-flex align-items-center justify-content-center" style="background:#f7df1e;">
            <i class="bi bi-journal-code" style="font-size:4rem; color:#1a1a1a;"></i>
          </div>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <small class="text-muted">Eigen lesmateriaal</small>
            <span class="badge text-bg-warning">Cursus</span>
          </div>
          <h5 class="card-title trap-text-primary mb-2">JavaScript Cursus</h5>
          <p class="card-text flex-grow-1 text-muted mb-3">
            Een complete cursus in het Nederlands: 14 modules, van je eerste regel code tot een
            examen-eindoefening. Mijn opstap naar TypeScript.
          </p>
          <div class="d-flex flex-wrap gap-1 mb-3">
            <span class="badge text-bg-light border">JavaScript</span>
            <span class="badge text-bg-light border">14 modules</span>
            <span class="badge text-bg-light border">Gratis</span>
          </div>
          <a href="/javascriptcourse/" target="_blank" rel="noopener"
             class="btn btn-custom trap-bg-primary mt-auto align-self-start">
            Open de cursus <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>`

  // Uitgelichte TypeScript-cursus-kaart (naast de JavaScript-cursus).
  readonly #typescriptCourseCardHTML = `
    <div class="col">
      <div class="card h-100 border-0 shadow-sm">
        <div class="ratio ratio-16x9">
          <div class="d-flex align-items-center justify-content-center" style="background:#3178c6;">
            <i class="bi bi-journal-code" style="font-size:4rem; color:#fff;"></i>
          </div>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <small class="text-muted">Eigen lesmateriaal</small>
            <span class="badge text-bg-warning">Cursus</span>
          </div>
          <h5 class="card-title trap-text-primary mb-2">TypeScript Cursus</h5>
          <p class="card-text flex-grow-1 text-muted mb-3">
            Het vervolg op de JavaScript-cursus: van je eerste getypte variabele tot een volledige
            component-app met een eigen router en data-persistentie.
          </p>
          <div class="d-flex flex-wrap gap-1 mb-3">
            <span class="badge text-bg-light border">TypeScript</span>
            <span class="badge text-bg-light border">20 modules</span>
            <span class="badge text-bg-light border">Gratis</span>
          </div>
          <a href="/typescriptcourse/" target="_blank" rel="noopener"
             class="btn btn-custom trap-bg-primary mt-auto align-self-start">
            Open de cursus <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>`

  constructor() {
    super(HTML)

    this.unsubscribe.push(projectRestProvider.addObserver(projects => {
      this.#projects = projects
      this.#renderList()
    }))

    void projectRestProvider.getAll()

    this.#titleFilter.addEventListener('input', () => this.#renderList())
    this.#categoryFilter.addEventListener('change', () => this.#renderList())
    this.#yearFilter.addEventListener('change', () => this.#renderList())
    this.#disciplineFilter.forEach(radio => radio.addEventListener('change', () => this.#renderList()))
  }

  render(): void {
    super.render()
    this.#renderList()
    revealOnScroll(this.body)
  }

  #renderList() {
    this.#container.innerHTML = ''
    this.#container.insertAdjacentHTML('afterbegin', this.#courseCardHTML + this.#typescriptCourseCardHTML)

    const projects = this.#projects.filter(p => this.#matchesFilter(p))

    if (projects.length === 0) {
      const selectedDiscipline = this.body.querySelector<HTMLInputElement>('input[name="discipline"]:checked')!.value
const message = selectedDiscipline === 'backend'
  ? 'Er zijn nog geen backend-projecten toegevoegd. Binnenkort meer!'
  : 'Geen projecten gevonden. Probeer een andere filter of zoekterm.'

      this.#container.insertAdjacentHTML('beforeend', `
    <div class="col-12 w-100 d-flex flex-column justify-content-center align-items-center text-center text-muted fw-bold"
        style="min-height: 40vh;">
      <i class="bi bi-folder2-open fs-1 mb-2"></i>
      <p class="mb-0">${message}</p>
    </div>`)
      return
    }

    projects.forEach(project => {
      const el = document.createElement('custom-project')
      el.className = 'col'
      el.setAttribute('id', project.id)
      el.setAttribute('title', project.title)
      el.setAttribute('subtitle', project.subtitle || '')
      el.setAttribute('description', project.description)
      el.setAttribute('year', project.year.toString())
      el.setAttribute('tags', project.tags.join(','))

      if (project.image) el.setAttribute('image', project.image)
      if (project.url) el.setAttribute('url', project.url)
      this.#container.appendChild(el)
    })
  }

  #matchesFilter(project: Project): boolean {
    const titleMatch = project.title.toLowerCase().includes(this.#titleFilter.value.toLowerCase())

    const categoryMatch = this.#categoryFilter.value === 'all'
      || project.category === this.#categoryFilter.value

    const yearMatch = this.#yearFilter.value === 'all'
      || project.studyYear === Number(this.#yearFilter.value)

    const selectedDiscipline = this.body.querySelector<HTMLInputElement>('input[name="discipline"]:checked')!.value
    const disciplineMatch = selectedDiscipline === 'all'
      || project.discipline === selectedDiscipline
      || project.discipline === 'both'

    return titleMatch && categoryMatch && yearMatch && disciplineMatch
  }
}
