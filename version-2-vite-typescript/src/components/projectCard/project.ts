import { CustomElement } from '../../router/customElement.ts'
import HTML from './project.html?raw'

export class CustomProjectCard extends CustomElement {

    static observedAttributes = ['title', 'subtitle', 'description', 'year', 'tags', 'image', 'url']

    #title = this.componentBody.querySelector<HTMLHeadingElement>('#title')!
    #subtitle = this.componentBody.querySelector<HTMLSpanElement>('#subtitle')!
    #description = this.componentBody.querySelector<HTMLParagraphElement>('#description')!
    #year = this.componentBody.querySelector<HTMLSpanElement>('#year')!
    #tags = this.componentBody.querySelector<HTMLDivElement>('#tags')!
    #image = this.componentBody.querySelector<HTMLImageElement>('#image')!
    #url = this.componentBody.querySelector<HTMLAnchorElement>('#link')!
    
  constructor() {
    super(HTML)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
        case 'title':
            this.#title.innerText = newValue
        break
        case 'subtitle':
            this.#subtitle.innerText = newValue
        break
        case 'description':
            this.#description.innerText = newValue
        break
        case 'year':
            this.#year.innerText = newValue
        break
        case 'tags':
            this.#tags.innerHTML = ''
            newValue.split(',').forEach (tag => {
                const badge = document.createElement('span')
                badge.className = 'badge text-bg-light border'
                badge.innerText = tag.trim()
                this.#tags.appendChild(badge)
            })
        break
        case 'image':
            this.#image.setAttribute('src', newValue)
        break
        case 'url':
            this.#url.setAttribute('href', newValue)
        break
    }
  }
}