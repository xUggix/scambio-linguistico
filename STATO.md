# Stato del lavoro

Aggiornato: 2026-10-14. Da leggere a inizio sessione insieme a SPEC.md e CLAUDE.md.

## Passi completati

- **Passo 1 – Preparazione: fatto.** App vuota online su https://scambio-linguistico.vercel.app
  (repository GitHub `xUggix/scambio-linguistico`, privato; ogni push su `main` ripubblica su Vercel).
  Test (Vitest), build e lint passano.
- Nome provvisorio "Ditto": committato e online (home verificata il 2026-10-14).
- **Passo 2 – Accesso e profilo: fatto (2026-10-20).** Accesso con link via email (Resend), iscrizione con 18+, lingue
  e livello A1–C1, interfaccia IT/EN. Verificato con: test di integrazione con due utenti sul progetto vero
  (`supabase/tests/profiles-rls.test.ts`, 6/6: ciascuno vede e modifica solo il proprio profilo, anonimi non vedono
  nulla, profilo senza 18+ rifiutato, cancellazione a cascata); prova a mano in locale e online con l'email del
  proprietario (link, iscrizione, home, IT/EN, uscita).

## Account e servizi

- GitHub, Vercel, Supabase (regione **West EU, Irlanda**, progetto `owtfnxxsaqvljdsxctpc`), LiveKit Cloud: creati.
- Resend: creato (accesso con GitHub). Senza dominio invia solo all'email principale dell'account.
  Il dominio si compra prima del passo 10.
- Supabase Auth: SMTP Resend attivo (30 email/ora), Site URL e Redirect URLs impostati, modelli "Confirm sign up" e
  "Magic link" con link `token_hash`.
- Chiavi di Supabase in `.env.local` e su Vercel (Production; `SUPABASE_SECRET_KEY` non ancora su Preview).
  L'URL di Supabase va scritto senza niente dopo `.supabase.co`.
- Deepgram: account non ancora sbloccato (serve dal passo 5).

## In corso: passo 3 – Inviti e matching minimo

Decisioni del proprietario (2026-10-20): interruttore "Mostrami ad altri utenti" acceso di default; link di invito
personale e riutilizzabile; prova con un secondo account di prova creato dallo script (niente dominio per ora).
