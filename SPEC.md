# Specifica MVP – App di scambio linguistico con report

Oct 14, 2026 · @Eugenio

## Obiettivo dell'MVP

L'MVP deve dimostrare una cosa sola: chi fa uno scambio linguistico in video apre il report dopo la chiamata e ne fa una seconda entro 7 giorni.

Se questo succede con almeno una parte dei primi tester, vale la pena costruire matching, badge avanzati, video e abbonamento. Se non succede, il report non è abbastanza utile e lo si scopre prima di investire. Il prodotto è una web app gratuita in italiano e inglese; le altre lingue sono annunciate come "in arrivo".

## Decisioni già prese

| Tema | Decisione |
| --- | --- |
| Piattaforma | Web app responsive; app mobile in una fase successiva |
| Sviluppo | Codice vero/vibe coding, costruito con Claude Code |
| Lingue | Italiano e inglese; nell'app compare "in arrivo altre lingue" |
| Partner | Link di invito più matching minimo (lingua, livello, fasce orarie) |
| AI come partner | Fase successiva, non nell'MVP |
| Dati delle chiamate | Audio e trascrizione; il video è indicato come "in arrivo" |
| Livello | "Livello stimato dall'app", senza valore ufficiale né certificazione |
| Gamification | Badge (es. 100 parole imparate, 5 call fatte) e streak |
| Modello economico | Gratuito per validare, abbonamento valutato dopo |
| Minuti | Limite di minuti per utente nella fase gratuita |
| Budget | Quasi zero; fino a circa 100 € al mese se l'idea si dimostra valida |
| Primi utenti | Si parte da zero: amici e community online di scambio linguistico |

## Utenti e problema

Chi fa scambi linguistici in video non ha un modo semplice per sapere cosa ha imparato: a fine chiamata le parole nuove e gli errori sono già persi.

L'utente dell'MVP è un adulto (18+) che vuole praticare italiano o inglese parlando con una persona, tipo chi già usa Tandem o HelloTalk o cerca un partner stabile.

| Alternativa | Cosa fa | Cosa manca per questo caso |
| --- | --- | --- |
| Tandem, HelloTalk | Scambio gratuito con madrelingua, anche in video | Nelle fonti consultate non risultano riepiloghi automatici delle chiamate |
| Preply, italki | Riepilogo AI con vocaboli per le lezioni svolte sulla loro piattaforma | Solo lezioni a pagamento con tutor, non scambi gratuiti tra pari |
| Duolingo Max, Speak | Conversazione con un partner AI | Il partner non è una persona |
| Speech Tutor | Registra una lezione e produce errori e vocabolario | App uscita a maggio 2026, senza recensioni; non è uno scambio tra utenti |

La differenza proposta è un report dopo ogni chiamata, in uno scambio tra persone, gratuito nella fase di validazione e magari degli esercizi linguistici gamification sulla chiamata fatta.

## Flusso utente

La chiamata genera un report solo se entrambi acconsentono; senza consenso la chiamata si svolge normalmente e non lascia né registrazione né report.

&#91;embedded content: flusso utente · 7 passaggi, 1 decisione\]

Dopo il report l'utente può proporre una nuova chiamata allo stesso partner: è il comportamento che il test misura.

## Schermate

L'MVP ha 9 schermate. Tutte responsive: la versione telefono è quella principale, perché la maggior parte delle chiamate partirà da lì.

| # | Schermata | Contenuto |
| --- | --- | --- |
| 1 | Accesso e iscrizione | Email con link di accesso, conferma l'età, lingua madre e lingua da praticare (italiano o inglese), livello dichiarato |
| 2 | Home | Prossime chiamate, pulsanti "Invita un partner" e "Trova un partner", streak, minuti rimasti nella settimana |
| 3 | Invito | Link personale da condividere; pagina di benvenuto per chi lo riceve, con iscrizione in pochi passaggi |
| 4 | Trova un partner | Elenco di utenti con lingue complementari, livello e fasce orarie; pulsante "Proponi una chiamata"; testo "altre lingue in arrivo" |
| 5 | Accordo sull'orario | Proposta di un orario, accetta o rifiuta; opzione "chiama ora" se l'altro è online |
| 6 | Prima della chiamata | Test di camera e microfono, consenso alla registrazione audio di entrambi, argomento suggerito, minuti disponibili |
| 7 | Chiamata | Video 1:1, timer, indicatore di registrazione, pulsante per terminare; indicazione "registrazione video in arrivo" |
| 8 | Report | Parole nuove, correzioni, frasi utili, riassunto, un obiettivo per la prossima chiamata |
| 9 | Progressi | Livello stimato, chiamate fatte, parole imparate, badge, streak, storico dei report |

Impostazioni e profilo (cambio lingue, cancellazione dei dati, esportazione) e le pagine su privacy e termini si raggiungono dal menu e non contano come schermate principali.

## Funzioni: dentro, in arrivo, rimandate

**Dentro l'MVP**

- Iscrizione con profilo di lingue e livello
- Invito con link e matching minimo (lingua, livello, fasce orarie)
- durante la chiamata magari si ricevono a schermo spunti per parlare
- Videochiamata 1:1
- Registrazione audio con consenso esplicito di entrambi
- Trascrizione e report dopo la chiamata
- Livello stimato dall'app, badge e streak di base
- Contatore dei minuti e limite settimanale
- Cancellazione dei dati dal profilo

**Mostrate nell'app come "in arrivo"**

- Altre lingue (francese, spagnolo per ora)
- Registrazione video della chiamata
- App mobile

**Rimandate a dopo la validazione**

- Partner AI quando nessuno è disponibile
- Tutor a pagamento
- Abbonamento
- Chat testuale, notifiche push, gruppi, classifiche

## Report dopo la chiamata

Il report è il cuore del prodotto: arriva a ciascun utente pochi minuti dopo la fine della chiamata e parla solo di ciò che ha detto lui.

**Contenuto**** ****s****u**** s****t****i****l****e**** ****r****e****c****a****p ****fha****tom **

1. **Riassunto:** di cosa avete parlato, in 3 righe.
2. **Parole nuove:** parola, significato, frase d'esempio presa dalla chiamata.
3. **Correzioni:** frase detta, versione più naturale, motivo. Al massimo 6, per non sommergere chi legge.
4. **Frasi utili:** espressioni dette dal partner che vale la pena riusare.
5. **Prossimo obiettivo:** una sola cosa da provare alla chiamata successiva.

Il report mostra anche quanto tempo ha parlato ciascuno, per aiutare a bilanciare lo scambio.

**Come viene generato**

- Ogni utente registra solo il proprio microfono; si ottengono due tracce separate, quindi non serve distinguere chi parla.
- Ogni traccia viene trascritta con un modello multilingue, perché in una chiamata magari si alternano italiano e inglese.
- Un modello linguistico riceve le due trascrizioni e restituisce il report in un formato fisso (JSON), che l'app salva e mostra.
- Una parola conta come "imparata" solo se l'utente la segna come "nuova per me" nel report: così i badge non si basano su conteggi automatici sbagliati.

**Limiti da mostrare all'utente**

- La trascrizione del parlato di chi sta imparando è meno precisa; le correzioni sono presentate come suggerimenti.
- Ogni correzione ha un pulsante "non è corretto" per scartarla.
- Ogni report chiede "È stato utile?", così si misura la qualità durante i test.

## Livello stimato, badge e streak

Il livello è un'indicazione calcolata dall'app, mai una certificazione; badge e streak premiano la costanza, cioè le chiamate fatte.

**Livello stimato**

- Dopo ogni chiamata il modello valuta il parlato dell'utente su quattro criteri, da 1 a 5: scorrevolezza, correttezza, varietà del lessico, complessità delle frasi.
- Il livello compare solo dopo almeno 3 chiamate ed è la media delle ultime 5, con la scritta "stima su N chiamate".
- Testo fisso accanto al livello: "Livello stimato dall'app in base alle tue ultime chiamate. È un'indicazione, non una certificazione."
- Domanda aperta: usare le etichette A1–C1 con questo avviso, oppure una scala propria dell'app. Consiglio le etichette A1–C1, perché sono già familiari agli utenti.

**Badge iniziali**

| Badge | Condizione |
| --- | --- |
| Prima chiamata | Prima chiamata di almeno 10 minuti |
| 5 chiamate | 5 chiamate di almeno 10 minuti |
| 10 chiamate | 10 chiamate di almeno 10 minuti |
| 50 parole | 50 parole segnate come "nuova per me" |
| 100 parole | 100 parole segnate come "nuova per me" |
| Streak di 4 settimane | 4 settimane consecutive con almeno una chiamata |

**Streak**

La streak è **settimanale**, non giornaliera: una chiamata richiede un partner, e chiedere una chiamata ogni giorno farebbe abbandonare l'app. Una settimana conta se contiene almeno una chiamata di 10 minuti o più. Le chiamate più brevi non contano, per evitare di aggirare la regola.

## Modello dei dati

Il database ha 13 tabelle principali; ogni utente può leggere solo i propri dati, a parte i dati pubblici di profilo che servono al matching.

| Tabella | Campi principali |
| --- | --- |
| profiles | id, nome visibile, lingua madre, lingua da praticare, livello dichiarato, data conferma 18+ |
| availability | utente, giorno della settimana, fascia oraria, fuso orario |
| invites | codice, chi invita, chi ha accettato, data |
| calls | id, utente A, utente B, orario previsto, inizio, fine, durata, stato |
| consents | chiamata, utente, consenso alla registrazione, data |
| recordings | chiamata, utente, percorso del file, durata, data di cancellazione prevista |
| transcripts | chiamata, utente, lingua, testo con segmenti temporali |
| reports | chiamata, utente, riassunto, tempo di parola, punteggi, prossimo obiettivo, giudizio "utile" |
| report\_items | report, tipo (parola, correzione, frase utile), contenuto, scelta dell'utente ("nuova per me", "non è corretto") |
| level\_estimates | utente, chiamata, punteggi per criterio, livello stimato |
| badges e user\_badges | elenco dei badge, badge ottenuti dall'utente con data |
| usage | utente, settimana, minuti usati |

Regole di accesso:

- Ogni utente vede solo  trascrizioni delle proprie chiamate e i propri report.
- I file audio hanno una data di cancellazione (vedi sezione privacy) e vengono eliminati da un'attività programmata e impostabile dall'utente.
- Cancellare l'account elimina profilo, trascrizioni, report e file audio dell'utente.

## Architettura e stack

L'app è una web app Next.js su Vercel che usa Supabase per accesso, dati e file, LiveKit per il video, Deepgram per la trascrizione e un modello linguistico per il report.

| Parte | Scelta | Perché |
| --- | --- | --- |
| App web | Next.js con TypeScript, su Vercel | Un solo progetto per pagine e funzioni di servizio, adatto a essere costruito con Claude Code |
| Accesso, database, file | Supabase, regione europea | Accesso, database, file e regole di accesso nello stesso servizio, con piano gratuito |
| Videochiamata | LiveKit | SDK per il browser e piano gratuito per i test; il server è anche open source, quindi si può ospitare in proprio più avanti |
| Trascrizione | Deepgram, endpoint UE | Più di 45 lingue e tariffa a minuto bassa |
| Report | Modello linguistico da scegliere | Da confrontare su italiano e inglese con le prime 20 chiamate, guardando qualità e prezzo |

&#91;embedded content: architettura · 5 servizi e il browser\]

Il browser parla direttamente con LiveKit per il video e con Supabase per caricare l'audio; trascrizione e report partono dalle funzioni su Vercel.

## Costi e limiti sui minuti

Con questo stack 100 $ al mese bastano per circa 150 chiamate da 20 minuti al mese, senza contare il modello linguistico per i report; sotto le 125 chiamate si resta intorno a 20-45 $ al mese.

Prezzi letti sulle pagine ufficiali il 14 ottobre 2026, in dollari; il budget di 100 € è trattato come 100 $, perché la differenza di cambio è piccola rispetto alle stime.

| Servizio | Piano | Costo | Limite o dato che conta |
| --- | --- | --- | --- |
| [LiveKit](https://livekit.com/pricing) (videochiamata) | Build | 0 $ | 5.000 minuti WebRTC al mese, contati per utente collegato: circa 125 chiamate da 20 minuti |
| LiveKit | Ship | 50 $ al mese | 150.000 minuti inclusi, circa 3.750 chiamate da 20 minuti |
| [Daily](https://www.daily.co/pricing) (alternativa) | Video SDK | 0 $ fino a 10.000 minuti | La pagina non dice se i minuti sono per partecipante: da verificare |
| [Deepgram](https://deepgram.com/pricing) (trascrizione) | Pay as you go | 200 $ di credito gratuito, poi 0,0052 $ al minuto (Nova-3 multilingue) | Endpoint UE disponibile; l'audio di una chiamata da 20 minuti con due tracce costa circa 0,21 $ |
| [Supabase](https://supabase.com/pricing) (database, accesso, file) | Free | 0 $ | 500 MB di database, 1 GB di file, 50.000 utenti attivi; il progetto va in pausa dopo una settimana senza attività |
| Supabase | Pro | 25 $ al mese | 8 GB di database, 100 GB di file, nessuna pausa, backup giornalieri |
| [Vercel](https://vercel.com/pricing) (hosting) | Hobby | 0 $ | La pagina lo indica per uso personale e non commerciale |
| Vercel | Pro | 20 $ al mese | Uso professionale |

**Stima mensile**, per chiamate da 20 minuti, con LiveKit, Deepgram, Supabase Free e Vercel Pro, senza il costo del modello per i report:

| Chiamate al mese | Video | Trascrizione | Hosting | Totale |
| --- | --- | --- | --- | --- |
| 100 | 0 $ | circa 21 $ (coperti dal credito iniziale) | 20 $ | circa 41 $, o 20 $ finché dura il credito |
| 150 | 50 $ | circa 31 $ | 20 $ | circa 101 $ |
| 300 | 50 $ | circa 62 $ | 20 $ | circa 132 $ |

Il costo del modello che scrive il report non è incluso: dipende dal modello scelto e va misurato sulle prime 20 chiamate prima di fissare il tetto. Il calcolo delle chiamate per LiveKit assume che i minuti si contino per ogni utente collegato, come dice la pagina del prezzo.

**Regole sui minuti nella fase gratuita**

- 60 minuti a settimana per utente. Con 20 tester sono circa 120 chiamate da 20 minuti al mese, cioè dentro il piano gratuito di LiveKit.
- Una chiamata dura al massimo 30 minuti, con avviso a 25.
- Tetto globale mensile di minuti: raggiunto il limite, l'app mostra "prenotazioni chiuse fino al mese prossimo" invece di generare costi non previsti.
- Il contatore dei minuti rimasti è sempre visibile nella home.
- Ogni utente registra solo il proprio microfono; si valuta un filtro dei silenzi prima dell'invio, per ridurre i minuti da trascrivere.

## Privacy, consenso e GDPR

La voce degli utenti è un dato personale: l'MVP registra solo con il consenso di entrambi, conserva l'audio per poco tempo e tiene i dati in Europa dove possibile. Questa sezione è una proposta di progetto, non consulenza legale: informativa e testo del consenso vanno fatti rivedere da un professionista prima di invitare utenti reali.

**Regole di prodotto**

- **Consenso per ogni chiamata:** nella schermata "Prima della chiamata" ciascun utente accetta registrazione audio e trascrizione. La registrazione parte solo se acconsentono entrambi, come fa italki; altrimenti la chiamata si svolge senza registrazione né report.
- **Indicatore visibile:** durante la chiamata un segnale mostra a entrambi che la registrazione è attiva.
- **Solo maggiorenni:** l'iscrizione richiede la conferma di avere almeno 18 anni.
- **Conservazione:** i file audio vengono cancellati dopo 14 giorni (periodo da confermare); trascrizioni e report restano finché l'utente non li elimina o chiude l'account.
- **Cancellazione:** dal profilo l'utente elimina una singola chiamata o tutto l'account, con i dati collegati.
- **Nessun addestramento:** trascrizioni e audio non vengono usati per addestrare modelli.
- **Sicurezza tra sconosciuti:** i pulsanti "Blocca" e "Segnala" sono presenti fin dal primo giorno, in chiamata e nel profilo.

**Fornitori e dati in Europa**

- Deepgram offre un [endpoint UE](https://deepgram.com/pricing) per tenere l'elaborazione dentro l'Unione.
- LiveKit include un [accordo sul trattamento dei dati](https://livekit.com/pricing) standard in tutti i piani.
- Per Supabase si sceglie una regione europea alla creazione del progetto.
- Per il modello linguistico va scelto un fornitore con accordo sul trattamento dei dati e senza uso dei dati per l'addestramento: da verificare nel momento della scelta.

**Da fare prima del lancio con utenti reali**

- Informativa privacy e testo di consenso rivisti da un professionista.
- Elenco dei fornitori e dei trasferimenti di dati fuori dall'UE.
- Procedura per le richieste degli utenti (accesso, cancellazione) e per le segnalazioni di comportamenti scorretti.

## Metriche e test con i primi utenti

Il test dice una cosa sola: il report fa tornare le persone. L'indicatore principale è la seconda chiamata entro 7 giorni dalla prima.

**Due fasi**

1. **Prova manuale, prima di costruire:** 10 persone che già fanno scambi linguistici registrano la chiamata con il consenso del partner; il report si genera a mano con uno strumento di trascrizione e un modello linguistico. Serve a capire se il report interessa, prima di scrivere codice.
2. **Test con l'MVP, 4 settimane:** circa 20 utenti, invitati in coppia con il link, così non serve il matching per partire.

**Dove trovare i primi utenti**

- Gruppi Reddit e Discord di scambio linguistico
- Community universitarie e gruppi Erasmus
- Amici e conoscenti che studiano inglese o italiano

**Metriche**

Le soglie sono ipotesi di partenza da rivedere dopo le prime settimane.

| Metrica | Come si misura | Soglia ipotizzata |
| --- | --- | --- |
| Seconda chiamata | Utenti che fanno una seconda chiamata entro 7 giorni dalla prima | almeno 40% |
| Report aperto | Report aperti entro 24 ore dalla chiamata | almeno 60% |
| Report utile | Risposte "utile" alla domanda sul report | almeno 70% |
| Correzioni scartate | Correzioni segnate "non è corretto" | meno del 20% |
| Consenso alla registrazione | Chiamate in cui entrambi acconsentono | almeno 80% |
| Chiamate riuscite | Chiamate proposte che si svolgono davvero | almeno 60% |
| Minuti per utente | Minuti medi a settimana | da osservare |

**Come si decide**

- Se la seconda chiamata e il report utile superano le soglie, si passa a matching più ampio, altre lingue e partner AI.
- Se il consenso è basso, il problema è la fiducia: si rivede il testo e il modo di chiedere il consenso prima di andare avanti.
- Se la seconda chiamata è bassa ma il report è giudicato utile, il problema è trovare partner: si lavora su inviti e matching.
- Se il report è giudicato poco utile, si rivede la qualità del report prima di tutto il resto.

## Rischi principali

I due rischi più grandi sono trovare un partner e convincere gli utenti che il report vale il loro tempo.

| Rischio | Perché conta | Come ridurlo |
| --- | --- | --- |
| Pochi utenti, matching vuoto | Uno scambio richiede due persone presenti insieme | Inviti in coppia, una sola coppia di lingue per i test, matching minimo |
| Il report non convince | Senza un report utile non c'è motivo di tornare | Prova manuale prima di costruire; pulsanti "utile" e "non è corretto" |
| Trascrizione imprecisa | Il parlato di chi impara viene trascritto peggio | Correzioni presentate come suggerimenti; misura della qualità sulle prime chiamate |
| Rifiuto della registrazione | Senza il consenso di entrambi non c'è report | Spiegare il beneficio prima della chiamata; misurare la quota di consensi |
| Costi oltre il budget | I costi crescono con i minuti di chiamata | Limite per utente, tetto globale mensile, misura del costo del modello sulle prime 20 chiamate |
| Concorrenti con più dati | Preply e italki hanno già riepiloghi AI per le loro lezioni | Concentrarsi sugli scambi gratuiti tra pari e su chi usa altre piattaforme |
| Comportamenti scorretti tra sconosciuti | Il video con persone che non si conoscono espone a molestie | Solo maggiorenni, "Blocca" e "Segnala" fin dall'inizio, regole d'uso chiare |
| Limiti dei piani gratuiti | Supabase Free va in pausa dopo una settimana senza attività; Vercel Hobby è per uso non commerciale | Passare a Supabase Pro (25 $) e Vercel Pro (20 $) quando i test partono |

## Piano di costruzione per Claude Code

L'MVP si costruisce in 10 passi, uno alla volta: ogni passo si chiude solo quando il suo criterio è verificato. Conviene salvare questa specifica nel progetto come file di testo (SPEC.md) e chiedere a Claude Code di lavorare su un passo per volta.

1. **Preparazione.** Progetto web in TypeScript, account su Supabase, LiveKit, Deepgram e Vercel, variabili d'ambiente. *Fatto quando* l'app vuota è online su un indirizzo.
2. **Accesso e profilo.** Link di accesso via email, conferma 18+, lingue e livello, tabelle con regole di accesso. *Fatto quando* con due account ciascuno vede solo i propri dati.
3. **Inviti e matching minimo.** Link di invito, elenco di utenti con lingue complementari e fasce orarie. *Fatto quando* due utenti si collegano con un invito e l'elenco filtra per lingua.
4. **Videochiamata e consenso.** Chiamata 1:1, schermata di consenso, indicatore di registrazione, registrazione audio sul dispositivo di ciascuno. *Fatto quando* due browser su reti diverse si vedono e la registrazione parte solo con il consenso di entrambi.
5. **Trascrizione.** Caricamento dell'audio, trascrizione di ciascuna traccia, costo per chiamata salvato. *Fatto quando* dopo una chiamata entrambe le trascrizioni sono salvate.
6. **Report.** Generazione del report in formato fisso, pagina del report, pulsanti "nuova per me", "non è corretto" e "utile". *Fatto quando* il report è valido su 10 chiamate reali.
7. **Minuti e limiti.** Contatore, limite di 60 minuti a settimana, durata massima di 30 minuti, tetto globale mensile. *Fatto quando* i limiti bloccano le chiamate al momento giusto.
8. **Progressi.** Livello stimato, badge, streak settimanale, storico dei report. *Fatto quando* i valori sono corretti su dati di prova.
9. **Privacy e cancellazione.** Cancellazione dell'audio dopo 14 giorni, cancellazione di chiamata e account, pagine su privacy e termini. *Fatto quando* i dati spariscono davvero dal database e dai file.
10. **Test con gli utenti.** Invito a circa 20 persone, raccolta delle metriche della sezione dedicata. *Fatto quando* dopo 4 settimane ci sono i numeri per decidere.

## Fonti

Prezzi e limiti, letti il 14 ottobre 2026:

- [LiveKit: prezzi](https://livekit.com/pricing)
- [Daily: prezzi](https://www.daily.co/pricing)
- [Deepgram: prezzi](https://deepgram.com/pricing)
- [Supabase: prezzi](https://supabase.com/pricing)
- [Vercel: prezzi](https://vercel.com/pricing)

Confronto con altre app, da ricerche del 14 ottobre 2026:

- [italki: registrazione audio e consenso di entrambi](https://support.italki.com/hc/en-us/articles/29759239845657-Audio-recording-in-italki-Classroom)
- [italki: Lesson Summary e Lesson Practice](https://support.italki.com/hc/en-us/articles/54381185537945)
- [OpenAI: Preply Lesson Insights](https://openai.com/index/preply)
- [Duolingo Max](https://blog.duolingo.com/duolingo-max)
- [Speak](https://tooldirectory.ai/tools/speak)
- [Speech Tutor (scheda dello store)](https://appgoblin.info/apps/6762617738)
- [Tandem e HelloTalk a confronto](https://www.talkdrill.com/blog/compare/hellotalk-vs-tandem/)
