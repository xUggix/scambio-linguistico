// Testi dell'interfaccia. Il dizionario inglese deve avere la stessa forma di quello italiano:
// TypeScript segnala ogni testo mancante.

import type { Locale } from "./config";

const it = {
  appName: "Ditto",
  tagline:
    "Videochiamate tra persone per praticare italiano e inglese, con un report dopo ogni chiamata.",
  moreLanguagesSoon: "Altre lingue in arrivo.",
  languageSwitcher: { label: "Lingua dell'interfaccia" },
  landing: { cta: "Accedi o iscriviti", building: "In costruzione" },
  signIn: {
    title: "Accedi",
    intro:
      "Scrivi la tua email: ti mandiamo un link per entrare, senza password.",
    emailLabel: "Email",
    submit: "Mandami il link",
    sending: "Invio in corso…",
    sent: "Controlla la posta: ti abbiamo mandato un link per entrare. Aprilo su questo dispositivo.",
    errors: {
      invalidEmail: "Scrivi un indirizzo email valido.",
      sendFailed: "Non siamo riusciti a mandare il link. Riprova tra qualche minuto.",
      linkInvalid: "Il link non è più valido. Chiedine uno nuovo.",
    },
  },
  onboarding: {
    title: "Benvenuto su Ditto",
    intro: "Ancora pochi dati e puoi cominciare.",
    displayName: "Nome visibile agli altri",
    nativeLanguage: "La tua lingua madre",
    practiceLanguage: "La lingua che vuoi praticare",
    declaredLevel: "Il tuo livello nella lingua da praticare",
    levelHint:
      "È il livello che indichi tu. Dopo almeno 3 chiamate l'app mostrerà anche un livello stimato, che è un'indicazione e non una certificazione.",
    adultConfirmed: "Confermo di avere almeno 18 anni.",
    submit: "Salva e continua",
    saving: "Salvataggio…",
    soon: "in arrivo",
    errors: {
      required: "Campo obbligatorio.",
      tooLong: "Al massimo 40 caratteri.",
      invalid: "Scegli un valore dall'elenco.",
      sameLanguage: "Scegli una lingua diversa dalla tua lingua madre.",
      notAdult: "Ditto è riservato ai maggiorenni.",
      saveFailed: "Non siamo riusciti a salvare il profilo. Riprova.",
    },
  },
  home: {
    title: "Ciao, {name}",
    profile: "Il tuo profilo",
    native: "Lingua madre",
    practice: "Pratichi",
    declaredLevel: "Livello dichiarato",
    nextSteps: "Inviti, partner e chiamate arrivano nei prossimi passi.",
    signOut: "Esci",
  },
  languages: { it: "Italiano", en: "Inglese", fr: "Francese", es: "Spagnolo" },
  levels: {
    A1: "A1 – Principiante",
    A2: "A2 – Elementare",
    B1: "B1 – Intermedio",
    B2: "B2 – Intermedio superiore",
    C1: "C1 – Avanzato",
  },
  missingConfig: "Configurazione incompleta: l'accesso non è ancora attivo.",
  loading: "Caricamento…",
};

export type Dictionary = typeof it;

const en: Dictionary = {
  appName: "Ditto",
  tagline:
    "Video calls between people to practise Italian and English, with a report after every call.",
  moreLanguagesSoon: "More languages coming soon.",
  languageSwitcher: { label: "Interface language" },
  landing: { cta: "Sign in or sign up", building: "Under construction" },
  signIn: {
    title: "Sign in",
    intro: "Enter your email and we'll send you a sign-in link, no password needed.",
    emailLabel: "Email",
    submit: "Send me the link",
    sending: "Sending…",
    sent: "Check your inbox: we sent you a sign-in link. Open it on this device.",
    errors: {
      invalidEmail: "Enter a valid email address.",
      sendFailed: "We couldn't send the link. Try again in a few minutes.",
      linkInvalid: "This link is no longer valid. Ask for a new one.",
    },
  },
  onboarding: {
    title: "Welcome to Ditto",
    intro: "Just a few details and you're ready to go.",
    displayName: "Name shown to others",
    nativeLanguage: "Your native language",
    practiceLanguage: "The language you want to practise",
    declaredLevel: "Your level in the language you practise",
    levelHint:
      "This is the level you state. After at least 3 calls the app will also show an estimated level, which is a guide, not a certification.",
    adultConfirmed: "I confirm I am at least 18 years old.",
    submit: "Save and continue",
    saving: "Saving…",
    soon: "coming soon",
    errors: {
      required: "Required.",
      tooLong: "40 characters at most.",
      invalid: "Choose a value from the list.",
      sameLanguage: "Choose a language different from your native one.",
      notAdult: "Ditto is for adults only.",
      saveFailed: "We couldn't save your profile. Please try again.",
    },
  },
  home: {
    title: "Hi, {name}",
    profile: "Your profile",
    native: "Native language",
    practice: "Practising",
    declaredLevel: "Stated level",
    nextSteps: "Invites, partners and calls are coming in the next steps.",
    signOut: "Sign out",
  },
  languages: { it: "Italian", en: "English", fr: "French", es: "Spanish" },
  levels: {
    A1: "A1 – Beginner",
    A2: "A2 – Elementary",
    B1: "B1 – Intermediate",
    B2: "B2 – Upper intermediate",
    C1: "C1 – Advanced",
  },
  missingConfig: "Setup incomplete: sign-in is not active yet.",
  loading: "Loading…",
};

const dictionaries: Record<Locale, Dictionary> = { it, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
