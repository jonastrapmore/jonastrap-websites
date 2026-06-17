import type { Courses } from "../models/courses";

export const courses: Courses[] = [
    // 1e jaar
    { name: 'Database (ERP & SQL)', description: "Een ERP-databank ontwerpen en bevragen met SQL.", year: 1, done: true },
    { name: 'HTML & CSS', description: "Webpagina's structureren en vormgeven, responsive met flexbox, grid en Bootstrap.", year: 1, done: true },
    { name: 'Beginselen van C#', description: "De fundamenten van programmeren: variabelen, logica, methodes en lijsten.", year: 1, done: true },
    { name: 'UML', description: "Software visueel ontwerpen met diagrammen vóór je begint te programmeren.", year: 1, done: false },
    { name: 'JavaScript & TypeScript', description: "Interactieve webpagina's bouwen en getypeerd, robuust werken met TypeScript.", year: 1, done: false },
    { name: 'Advanced C# (OOP)', description: "Objectgeoriënteerd programmeren: klassen, overerving, interfaces en abstractie.", year: 1, done: true },

    // 2e jaar
    { name: 'IT Project', description: "Individueel én in team een echt project opzetten, plannen, testen en presenteren.", year: 2, done: false },
    { name: 'Programming Advanced', description: "Applicaties bouwen met het MVVM-patroon en een database via een ORM.", year: 2, done: false },
    { name: '.NET Development', description: "Applicaties ontwikkelen binnen het .NET-platform.", year: 2, done: false },
    { name: 'Frontend Frameworks (React)', description: "Moderne, component-gebaseerde webapps bouwen met React.", year: 2, done: false },
    { name: 'Mobile Development', description: "Apps ontwikkelen voor mobiele toestellen.", year: 2, done: false },
    { name: 'IT Challenges 1 & 2', description: "Bestaande projecten uitbreiden en refactoren tot crashvrije, leesbare code binnen deadlines.", year: 2, done: false },

    // 3e jaar
    { name: 'IT Professional (stage)', description: "70 werkdagen stage op de werkvloer: beroepstaken uitvoeren en nieuwe technologieën leren in een echt bedrijf.", year: 3, done: false },
    { name: '.NET Project', description: "Een groot, volledig project uitwerken binnen het .NET-platform.", year: 3, done: false },
    { name: 'Backend Frameworks', description: "Server-side applicaties en API's bouwen met backend-frameworks.", year: 3, done: false },
    { name: 'IT Professional (portfolio)', description: "Je groei documenteren in een portfolio en presenteren aan een jury van docenten en werkplekpartners.", year: 3, done: false },
    { name: 'IT Challenges 3', description: "Nieuwe vereisten implementeren in JavaScript en C#, met nette code en een mondelinge verdediging.", year: 3, done: false },
]
