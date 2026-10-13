# Card Counter

A Hi-Lo blackjack card counting trainer, built as an installable PWA.

## Modes

- **Flash count** – cards flash by at a chosen speed, then you enter the running count.
- **Deck countdown** – step through one shuffled deck at your own pace; the final count is always 0.
- **True count** – 10 questions: given a running count and decks remaining, enter the
  true count (rounded to the nearest whole number).

A **Stats** screen shows accuracy and timing per mode, and Home tracks your daily practice streak.

Results are saved in the browser (`localStorage`); there is no backend.

## Develop

```bash
npm install
npm run dev     # local dev server
npm test        # engine unit tests
npm run build   # typecheck + production build into dist/
npm run preview # serve the production build locally
```

## Deploy (GitHub Pages)

1. Push this repo to GitHub with `main` as the default branch.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs tests, builds with the correct base path, and publishes.

The site lives at `https://<user>.github.io/<repo-name>/`.

## Install on iPhone

Open the site in Safari, tap **Share → Add to Home Screen**.

## Project layout

```
src/engine/      pure counting logic (cards, systems, running/true count)
src/modes/       training modes
src/components/  shared UI
src/hooks/       React hooks
src/storage/     saved results
```

To add another counting system (KO, Omega II, ...), add a `CountingSystem` in
`src/engine/systems.ts`.
