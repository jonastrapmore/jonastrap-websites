import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import { Router } from './router/router'

import { CustomCourse } from './components/course/course'
import { CustomFooter } from './components/footer/footer'
import { CustomNavbar } from './components/navbar/navbar'
import { CustomProjectCard } from './components/projectCard/project'
import { CustomTypewriter } from './components/typewrite/typewriter'

import { ContactPage } from './pages/contact/contact'
import { HomePage } from './pages/home/home'
import { ProjectsPage } from './pages/projects/projects'

import { initScrollTop } from './effects/scrollTop'
import { initTheme } from './effects/theme'

// Registreer hier al je custom elements (component-tags).
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-project', CustomProjectCard)
window.customElements.define('custom-footer', CustomFooter)
window.customElements.define('custom-typewriter', CustomTypewriter)
window.customElements.define('custom-course', CustomCourse)

initTheme()
initScrollTop()

// Koppel hier elke URL aan zijn paginaklasse.
new Router({
  '/': HomePage,
  '/projecten': ProjectsPage,
  '/contact': ContactPage,
})
