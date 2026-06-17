export function initCounters (root: ParentNode = document): void {
    const counters = root.querySelectorAll<HTMLElement>('.counter')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target as HTMLElement)
                observer.unobserve(entry.target)
            }
        })
    }, {threshold: 0.5})

    counters.forEach(c => observer.observe(c))
}

function animateCount(el: HTMLElement, duration = 1500): void {
    const target = Number(el.dataset.target)
    const start = performance.now()

    function tick(now: number) {
        const progress = Math.min((now-start) / duration, 1)
        el.innerText = Math.round(progress * target).toString()
        if(progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
}