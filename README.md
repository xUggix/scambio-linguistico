# Ditto (MVP)

Nome provvisorio dell'app. Repository e progetto Vercel restano `scambio-linguistico`.

Web app per scambi linguistici in video 1:1 con report dopo la chiamata.
Specifica: [SPEC.md](SPEC.md). Regole di lavoro: [CLAUDE.md](CLAUDE.md).

## Avvio in locale

Serve Node.js 20 o successivo.

```bash
npm install
cp .env.example .env.local   # poi inserisci i valori
npm run dev                  # http://localhost:3000
```

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build di produzione |
| `npm test` | Test (Vitest) |
| `npm run lint` | Controllo del codice |

## Chiavi

Le chiavi stanno solo in `.env.local` (mai committato) e nelle variabili d'ambiente di Vercel.
`.env.example` elenca i nomi senza valori. Le variabili `NEXT_PUBLIC_` arrivano al browser,
tutte le altre restano sul server: si leggono con `getPublicEnv()` e `getServerEnv()` in `lib/env.ts`.
