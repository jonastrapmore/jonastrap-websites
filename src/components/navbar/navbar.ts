import { getTheme, toggleTheme } from '../../effects/theme.ts'
import { CustomElement } from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {

  #themeToggle = this.componentBody.querySelector<HTMLButtonElement>('#theme-toggle')!
  #themeIcon = this.componentBody.querySelector<HTMLSpanElement>('#theme-icon')!

  constructor() {
    super(HTML)

    this.#updateIcon(getTheme())
    this.#themeToggle.addEventListener('click', () => {
      const next = toggleTheme()
      this.#updateIcon(next)
    })
  }

  #updateIcon(theme: string): void {
    this.#themeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'
  }
}
