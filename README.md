# Atlantic City Technical Test

Monorepo base para el reto tecnico Frontend Senior con React, Vite, TypeScript y microfrontends.

## Scripts

- `pnpm dev`: levanta las tres apps en paralelo.
- `pnpm dev:shell`: levanta Shell en `http://localhost:3000`.
- `pnpm dev:detail`: levanta Pokemon Detail en `http://localhost:3001`.
- `pnpm dev:history`: levanta Pokemon History en `http://localhost:3002`.
- `pnpm build`: compila todo el workspace.
- `pnpm lint`: ejecuta ESLint sobre apps y packages.

## Etapa 1

Esta etapa crea la base del monorepo. Module Federation esta instalado para la siguiente etapa, pero todavia no esta configurado como host/remotos.

## Etapa 10

La regla de "ultimo Pokemon visitado" usa un identificador por visita para evitar mostrar el toast repetidamente despues de cerrarlo.

- Cada visita guardada en historial genera un `visitId`.
- El ultimo Pokemon visitado es el primer item del historial persistente.
- Al cerrar el toast, la sesion guarda `dismissedLastVisitedVisitId`.
- Si `lastVisited.visitId` y `dismissedLastVisitedVisitId` coinciden, el toast no vuelve a mostrarse.
- Si hay una nueva visita, se genera otro `visitId` y el toast vuelve a ser elegible al recargar una ruta privada.

Checklist:

- Visitar un Pokemon desde Detail y recargar Home muestra el toast.
- Cerrar el toast y recargar de nuevo no lo vuelve a mostrar.
- Visitar el mismo Pokemon otra vez incrementa el contador y genera un nuevo `visitId`.
- Recargar tras una nueva visita vuelve a mostrar el toast.
- `/login` no muestra el toast.
