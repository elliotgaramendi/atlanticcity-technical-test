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

La regla de "ultimo Pokemon visitado" lee el primer item del historial persistente y muestra un toast al entrar a Home o History con sesion activa.

- Cada visita guardada en historial genera un `visitId`.
- El ultimo Pokemon visitado es el primer item del historial persistente.
- Al entrar a Home o History, si existe historial, se muestra el toast del ultimo visitado.
- El boton `Cerrar` oculta el toast visible, pero no elimina el historial.
- `/login` no monta esta regla.

Checklist:

- Visitar un Pokemon desde Detail y volver a Home muestra el toast.
- Recargar Home muestra el toast si existe historial.
- Entrar a `/history` muestra el toast si existe historial.
- Cerrar el toast lo oculta en la pantalla actual.
- Visitar el mismo Pokemon otra vez incrementa el contador y genera un nuevo `visitId`.
- `/login` no muestra el toast.
