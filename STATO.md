# Stato del lavoro

Aggiornato: 2026-10-14. Da leggere a inizio sessione insieme a SPEC.md e CLAUDE.md.

## Passi completati

- **Passo 1 – Preparazione: fatto.** App vuota online su https://scambio-linguistico.vercel.app
  (repository GitHub `xUggix/scambio-linguistico`, privato; ogni push su `main` ripubblica su Vercel).
  Test (Vitest), build e lint passano.
- Nome provvisorio "Ditto": committato e online (home verificata il 2026-10-14). Nessuna modifica in sospeso.

## Account e servizi

- GitHub, Vercel, Supabase (regione Frankfurt), LiveKit Cloud: creati.
- Deepgram: account non ancora sbloccato (serve dal passo 5).
- Resend (email di accesso): da creare al passo 2.
- Nessuna chiave è ancora in `.env.local` né su Vercel.

## Prossimo: passo 2 – Accesso e profilo

Risposte del proprietario (2026-10-14): niente dominio per ora (si compra prima del passo 10), livello A1–C1,
prova manuale in parallelo, più avanti.

Note tecniche per il passo 2:

- Next.js 16: leggere `node_modules/next/dist/docs/` prima di scrivere codice (vedi AGENTS.md); per esempio il middleware ha cambiato nome.
- `getPublicEnv()` in `lib/env.ts` oggi richiede anche la variabile di LiveKit: dividere i controlli per servizio,
  così il passo 2 funziona con le sole chiavi di Supabase.
- Il selettore IT/EN dell'interfaccia va previsto da subito, nelle prime schermate.
