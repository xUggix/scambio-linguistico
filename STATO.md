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

## In corso: passo 2 – Accesso e profilo

Risposte del proprietario (2026-10-14): niente dominio per ora (si compra prima del passo 10), livello A1–C1,
prova manuale in parallelo, più avanti.

**Codice: scritto e committato** (build, lint e test passano). Provato in locale senza chiavi: lingue, redirect e
pagine funzionano; l'accesso vero non è ancora provato.

- Lingua nell'indirizzo: `/it/...` e `/en/...`; `/` porta alla lingua del browser o a quella scelta (cookie `ditto_lingua`).
- Pagine: `/[lang]/accedi` (link via email), `/[lang]/benvenuto` (iscrizione: nome, lingue, livello A1–C1, 18+),
  `/[lang]/home` (profilo provvisorio ed "Esci"). Il link nell'email porta a `/auth/conferma`.
- `proxy.ts` rinnova la sessione e manda all'accesso chi non è entrato.
- Tabella `profiles` con regole di accesso: `supabase/migrations/20261014120000_profiles.sql`, **non ancora applicata**.
- Test delle regole di accesso con due utenti: `supabase/tests/profiles-rls.test.ts`, si salta finché mancano le chiavi.

**Da fare dal proprietario per chiudere il passo 2:**

1. Copiare `.env.example` in `.env.local` e inserire le tre chiavi di Supabase (URL, publishable, secret);
   le stesse su Vercel (Production e Preview), poi ripubblicare.
2. Applicare la migrazione: Supabase → SQL Editor → incollare il file della migrazione ed eseguirlo
   (oppure `npx supabase login`, `npx supabase link`, `npx supabase db push`).
3. Supabase → Authentication → URL Configuration: Site URL `https://scambio-linguistico.vercel.app`;
   Redirect URLs `http://localhost:3000/**` e `https://scambio-linguistico.vercel.app/**`.
4. Resend: creare l'account e una chiave API; in Supabase → Authentication → SMTP inserire host `smtp.resend.com`,
   porta 465, utente `resend`, password = chiave API, mittente `onboarding@resend.dev`.
   Senza dominio Resend invia solo all'email del proprietario dell'account.
5. Consigliato: Supabase → Authentication → Email Templates → "Magic Link", link
   `{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email`, così il link funziona anche se si apre
   in un altro browser (per esempio dall'app di posta del telefono).

**Verifica del criterio** (dopo i punti sopra): `npm test` esegue anche il test con due utenti; poi prova a mano
con la propria email, in locale e online.
