# Deployment

This project is a pnpm monorepo with three Vite applications:

- Shell: `apps/shell`
- Pokemon Detail MFE: `apps/pokemon-detail`
- Pokemon History MFE: `apps/pokemon-history`

Each app is deployed as an independent static site. The Shell consumes the two
MFEs through their public `remoteEntry.js` files.

## Recommended Platform

Use Netlify for the fastest manual deployment.

Create three Netlify sites from the same GitHub repository:

```txt
elliotgaramendi/atlanticcity-technical-test
```

Recommended site names:

```txt
atlanticcity-pokedex
atlanticcity-pokemon-detail
atlanticcity-pokemon-history
```

## Deploy Order

Deploy the remotes first:

1. `atlanticcity-pokemon-detail`
2. `atlanticcity-pokemon-history`
3. `atlanticcity-pokedex`

The Shell needs the final public URLs of the two remotes.

## Netlify Site: Pokemon Detail

Build settings:

```txt
Base directory:

Build command:
pnpm --filter @atlanticcity/pokemon-detail build

Publish directory:
apps/pokemon-detail/dist
```

Environment variables:

```txt
VITE_POKE_API_BASE_URL=https://pokeapi.co/api/v2
```

Expected remote entry:

```txt
https://atlanticcity-pokemon-detail.netlify.app/remoteEntry.js
```

## Netlify Site: Pokemon History

Build settings:

```txt
Base directory:

Build command:
pnpm --filter @atlanticcity/pokemon-history build

Publish directory:
apps/pokemon-history/dist
```

Environment variables:

```txt
VITE_POKE_API_BASE_URL=https://pokeapi.co/api/v2
```

Expected remote entry:

```txt
https://atlanticcity-pokemon-history.netlify.app/remoteEntry.js
```

## Netlify Site: Shell

Build settings:

```txt
Base directory:

Build command:
pnpm --filter @atlanticcity/shell build

Publish directory:
apps/shell/dist
```

Environment variables:

```txt
VITE_POKE_API_BASE_URL=https://pokeapi.co/api/v2
VITE_POKEMON_DETAIL_REMOTE_URL=https://atlanticcity-pokemon-detail.netlify.app/remoteEntry.js
VITE_POKEMON_HISTORY_REMOTE_URL=https://atlanticcity-pokemon-history.netlify.app/remoteEntry.js
```

Expected app URL:

```txt
https://atlanticcity-pokedex.netlify.app
```

## Local Production Check

Run the full build:

```bash
pnpm build
```

Run one app locally in dev mode:

```bash
pnpm dev:shell
pnpm dev:detail
pnpm dev:history
```

## SPA Redirects

The three Vite apps use the shared root `public` directory configured in
`vite.config.ts`:

```txt
public/_redirects
```

That file is copied into every app build output and prevents refreshes on
routes like `/history` from returning a 404.

## Manual Smoke Test

After deployment:

1. Open Detail remote:
   `https://atlanticcity-pokemon-detail.netlify.app/remoteEntry.js`
2. Open History remote:
   `https://atlanticcity-pokemon-history.netlify.app/remoteEntry.js`
3. Open Shell:
   `https://atlanticcity-pokedex.netlify.app`
4. Login with:
   `aketchum@atlanticcity.dev` / `Atlantic2026`
5. Open a Pokemon detail from Home.
6. Go to `/history` and confirm the visit appears.
7. Refresh `/history` and confirm the app still loads.
