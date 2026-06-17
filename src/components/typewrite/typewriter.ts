import { CustomElement } from '../../router/customElement.ts'
import HTML from './typewriter.html?raw'

export class CustomTypewriter extends CustomElement {
    #text = this.componentBody.querySelector<HTMLSpanElement>('#text')!
  constructor() {
    super(HTML)
  }

  connectedCallback() {
    super.connectedCallback()

    const words = (this.getAttribute('words') ?? '').split(',')

    if(words.length === 0) return
    
    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    
    const tick = () => {
        const word = words[wordIndex]

        //typen = charIndex omghoog, wissen = charIndex omlaag
        charIndex += deleting ? -1 : 1
        this.#text.innerText = word.slice(0, charIndex)

        let delay = deleting ? 60 : 120 //wissen gaat sneller dan typen

        if(!deleting && charIndex === word.length) {
            //volledig woord staat er => even alten staan, dan beginnen wissen
            deleting = true
            delay = 1500
        } else if (deleting && charIndex ===0) {
            //alles gewist => naar het volgende woord
            deleting = false
            wordIndex = (wordIndex + 1) % words.length
            delay = 300
        }
        setTimeout(tick, delay)
    }
    tick()
  }
}
