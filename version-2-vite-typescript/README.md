# Jonas Trap — Portfolio (Vite + TypeScript)

Leeg startskelet voor de nieuwe versie van jonastrap.be, met hetzelfde framework als de
JavaScript-examens (web components + router + persistence providers) en Bootstrap geïnstalleerd.

## Starten

```bash
npm install      # eenmalig, installeert Vite + Bootstrap
npm run dev      # start de dev-server (hot reload) op http://localhost:5173
npm run build    # productiebuild naar /dist (dit upload je naar jonastrap.be)
```

## Structuur

```
src/
  main.ts                 # entrypoint: registreert components + routes
  style.css               # huisstijl (trap-* kleuren)
  router/                 # GEGEVEN framework — niet aanpassen
    customElement.ts      #   basisklasse voor componenten
    page.ts               #   basisklasse voor pagina's
    router.ts             #   navigatie via data-link
  data/                   # GEGEVEN framework — niet aanpassen
    persistenceProvider.ts            # abstracte basis
    restPersistenceProvider.ts        # via URL/fetch (API of statische JSON)
    localStoragePersistenceProvider.ts# in de browser
    memoryPersistenceProvider.ts      # in het geheugen
    data.ts               # HIER maak je later je providers aan (nu leeg)
  models/
    project.ts            # voorlopige Project-interface (schema later afwerken)
  components/
    navbar/               # custom-navbar
  pages/
    home/  projects/   # home + één gecombineerde /projecten-pagina
```

## Volgende stappen

1. `Project`-schema (velden) vastleggen in `models/project.ts`.
2. `public/data/projects.json` aanmaken met de projecten.
3. Een provider aanmaken in `data/data.ts` en de projecten inlezen.
4. Een `<project-card>` component + filter/zoek/sorteer op de websites-pagina.
