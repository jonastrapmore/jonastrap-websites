import { CustomElement } from '../../router/customElement.ts'
import HTML from './course.html?raw'

export class CustomCourse extends CustomElement {
    static observedAttributes = ['name', 'description', 'done']

    #name = this.componentBody.querySelector<HTMLDivElement>('#name')!
    #description = this.componentBody.querySelector<HTMLSpanElement>('#desc')!
    #icon = this.componentBody.querySelector<HTMLElement>('#icon')!

  constructor() {
    super(HTML)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
        case 'name':
            this.#name.innerText = newValue
            break
        case 'description':
            this.#description.innerText = newValue
            break
        case 'done':
            this.#icon.className = newValue === 'true'
                ? 'bi bi-check-circle-fill text-success fs-5'
                : 'bi bi-hourglass-split text-muted fs-5'
                break
    }
  }
}
