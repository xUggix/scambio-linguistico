# App di scambio linguistico con report (MVP)

## Cosa stiamo costruendo

Web app in italiano e inglese per scambi linguistici in video 1:1 tra persone. Dopo ogni chiamata, se entrambi hanno acconsentito, l'app trascrive l'audio e genera un report: parole nuove, correzioni, frasi utili, riassunto e un obiettivo per la prossima chiamata. Ci sono anche livello stimato, badge e streak settimanale.

Obiettivo dell'MVP: dimostrare che gli utenti aprono il report e fanno una seconda chiamata entro 7 giorni dalla prima.

La fonte di verità è SPEC.md. Se questo file e SPEC.md sono in conflitto, fermati e chiedi.

## Stack

- App web: Next.js (App Router) con TypeScript, hosting su Vercel
- Accesso, database e file: Supabase, regione europea, con regole di accesso (RLS) su ogni tabella
- Videochiamata: LiveKit
- Trascrizione: Deepgram, endpoint UE
- Report: modello linguistico ancora da scegliere; la chiamata al modello sta dietro a una sola funzione, così si può cambiare fornitore senza toccare il resto

## Regole di lavoro

- Lavora su un passo alla volta, seguendo "Piano di costruzione" in SPEC.md.
- A ogni passo: prima proponi cosa farai e quali file toccherai, poi esegui.
- Un passo è finito solo quando il suo criterio "Fatto quando" è verificato. Mostra come l'hai verificato e fermati: non passare al passo successivo senza conferma.
- Commit piccoli, con messaggi chiari.
- Scrivi test per le regole che costano o proteggono: consenso, limiti sui minuti, accesso ai dati, calcolo di livello e streak.
- Se una scelta tecnica cambia il costo, la privacy o l'architettura, chiedi prima.

## Regole di prodotto che non si negoziano

- Solo maggiorenni: l'iscrizione richiede la conferma di avere almeno 18 anni.
- La registrazione parte solo se entrambi hanno dato il consenso. Il controllo avviene sul server, non solo nell'interfaccia.
- Un indicatore visibile mostra a entrambi quando la registrazione è attiva.
- Ogni utente legge solo i propri dati. Mai le trascrizioni o i report del partner.
- I file audio si cancellano dopo 14 giorni (da confermare). Cancellare l'account elimina profilo, trascrizioni, report e audio.
- Il livello è sempre "livello stimato dall'app, non una certificazione".
- Lingue dell'MVP: italiano e inglese. L'app mostra "altre lingue in arrivo" e "registrazione video in arrivo".
- Limiti nella fase gratuita: 60 minuti a settimana per utente, chiamata massima di 30 minuti, tetto globale mensile di minuti.
- Una parola conta come "imparata" solo se l'utente la segna "nuova per me".

## Sicurezza

- Nessuna chiave nel codice. Le chiavi stanno in `.env.local` (mai committato); mantieni aggiornato `.env.example` senza valori.
- La chiave di servizio di Supabase, la chiave di Deepgram e quella del modello linguistico restano solo sul server.
- I token di LiveKit si generano sul server.
- Non scrivere in chat né nei log il contenuto di chiavi, trascrizioni o audio.

## Decisioni prese durante la costruzione

- 2026-10-14: nome provvisorio dell'app "Ditto" (repository e progetto Vercel restano `scambio-linguistico`).
- 2026-10-14: interfaccia in italiano e inglese, con selettore IT/EN.
- 2026-10-14: email di accesso tramite un servizio SMTP esterno (Resend), non quello integrato di Supabase.
- 2026-10-14: la prova manuale con 10 persone (SPEC.md, "Due fasi") non è ancora stata fatta; la costruzione procede comunque. Il proprietario la farà in parallelo.
- 2026-10-14: etichette del livello A1–C1 (sia per il livello dichiarato sia per quello stimato), sempre con l'avviso "stimato dall'app, non una certificazione".
- 2026-10-14: nessun dominio per le email per ora. Resend invia solo all'indirizzo del proprietario; il dominio si compra prima di invitare i tester (passo 10).
- 2026-10-14: si resta su Next.js + Claude Code (valutato Lovable: scartato per la parte di chiamate, registrazione e report; eventualmente solo per bozze visive).

## Decisioni ancora aperte (chiedi, non assumere)

- Quanto conservare l'audio: la proposta è 14 giorni.
- Quale modello linguistico usare per i report: confronto su 20 chiamate di prova.
- LiveKit o Daily, se i minuti gratuiti non bastano.
- Note aggiunte a mano dal proprietario in SPEC.md: gli "spunti per parlare" a schermo durante la chiamata (compaiono tra le funzioni dell'MVP: chiedi come devono funzionare), gli esercizi di gamification sulla chiamata fatta (scritti come "magari": non farli senza conferma) e una nota frammentata sotto "Contenuto" nella sezione Report, sul "recap" (chiedi cosa intendeva).
