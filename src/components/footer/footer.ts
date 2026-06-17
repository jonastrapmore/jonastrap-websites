import { CustomElement } from '../../router/customElement.ts'
import HTML from './footer.html?raw'

export class CustomFooter extends CustomElement {
  constructor() {
    super(HTML)
  }
}
