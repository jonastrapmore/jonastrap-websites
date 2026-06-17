import { Page } from "../../router/page";
import HTML from './contact.html?raw';

export class ContactPage extends Page {
    #form = this.body.querySelector<HTMLFormElement>('#contact-form')!

    constructor() {
        super(HTML)

        this.#form.addEventListener('submit', async (e) => {
            e.preventDefault()
            if (this.#validate()) {
                const submitBtn = this.body.querySelector<HTMLButtonElement>('#submit-btn')!
                const status = this.body.querySelector<HTMLDivElement>('#form-status')!
                const formData = new FormData(this.#form)

                submitBtn.disabled = true
                submitBtn.textContent = 'Versturen...'

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData,
                    })
                    const data = await response.json()

                    if(data.success) {
                        status.textContent = 'Bedankt! Je bericht is verzonden.'
                        status.className = 'mt-3 text-success'
                        this.#form.reset()
                    } else {
                        status.textContent = 'Er ging iets mis. Probeer het later opnieuw.'
                        status.className = 'mt-3 text-danger'
                    }
                } catch {
                    status.textContent = 'Er ging iets mis. Probeer het later opnieuw.'
                    status.className = 'mt-3 text-danger'
                } finally {
                    submitBtn.disabled = false
                    submitBtn.textContent = 'Versturen'
                }
            }
        })
    }

    #validate(): boolean {
        let valid: boolean = true
        const voornaam = this.body.querySelector<HTMLInputElement>('#voornaam')!
        const errVoornaam = this.body.querySelector<HTMLDivElement>('#error-voornaam')!
        const achternaam = this.body.querySelector<HTMLInputElement>('#achternaam')!
        const errAchternaam = this.body.querySelector<HTMLDivElement>('#error-achternaam')!
        const email = this.body.querySelector<HTMLInputElement>('#email')!
        const errEmail = this.body.querySelector<HTMLDivElement>('#error-email')!
        const onderwerp = this.body.querySelector<HTMLSelectElement>('#onderwerp')!
        const errOnderwerp = this.body.querySelector<HTMLDivElement>('#error-onderwerp')!
        const bericht = this.body.querySelector<HTMLTextAreaElement>('#bericht')!
        const errBericht = this.body.querySelector<HTMLDivElement>('#error-bericht')!

        if(voornaam.value.trim() === '') {
            errVoornaam.textContent = "Vul je voornaam in."
            valid =false
        } else {
            errVoornaam.textContent = ''
        }

        if(achternaam.value.trim() === '') {
            errAchternaam.textContent = "Vul je achternaam in."
            valid = false
        } else {
            errAchternaam.textContent = ''
        }

        const emailWaarde = email.value.trim()
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailWaarde)

        if (!emailOk) {
            errEmail.textContent = 'Vul een geldig e-mailadres in.'
            valid = false
        } else {
            errEmail.textContent = ''
        }

        if(onderwerp.value === '') {
            errOnderwerp.textContent = 'Kies een onderwerp.'
            valid = false
        } else {
            errOnderwerp.textContent = ''
        }

        if(bericht.value.trim().length < 10) {
            errBericht.textContent = 'Je bericht moet minstens 10 tekens bevatten.'
            valid = false
        } else {
            errBericht.textContent = ''
        }

        return valid
    }
}