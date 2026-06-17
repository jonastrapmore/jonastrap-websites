export function initScrollTop() {
    const knop = document.querySelector<HTMLButtonElement>('#scroll-top')!

    window.addEventListener('scroll', () => {
        knop.classList.toggle('visible', window.scrollY > 300)
    })

    knop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth'})
    })
}