// Lettura centralizzata delle variabili d'ambiente.
// Le variabili NEXT_PUBLIC_ finiscono nel browser; tutte le altre restano sul server.
// I valori vengono controllati solo quando servono, così l'app vuota si avvia anche senza chiavi.

type EnvSource = Record<string, string | undefined>;

export const PUBLIC_ENV_NAMES = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_LIVEKIT_URL",
] as const;

export const SERVER_ENV_NAMES = [
  "SUPABASE_SECRET_KEY",
  "LIVEKIT_API_KEY",
  "LIVEKIT_API_SECRET",
  "DEEPGRAM_API_KEY",
  "REPORT_LLM_API_KEY",
] as const;

type PublicEnvName = (typeof PUBLIC_ENV_NAMES)[number];
type ServerEnvName = (typeof SERVER_ENV_NAMES)[number];

// Restituisce i valori richiesti o lancia un errore che elenca solo i nomi mancanti, mai i valori.
export function readEnv<N extends string>(
  source: EnvSource,
  names: readonly N[],
): Record<N, string> {
  const missing = names.filter((name) => !source[name]?.trim());
  if (missing.length > 0) {
    throw new Error(`Variabili d'ambiente mancanti: ${missing.join(", ")}`);
  }
  return Object.fromEntries(
    names.map((name) => [name, source[name]!.trim()]),
  ) as Record<N, string>;
}

// Next.js inserisce nel browser solo le variabili scritte per esteso:
// per questo ogni valore è letto con il suo nome completo.
// I controlli sono divisi per servizio, così un passo usa solo le chiavi che gli servono.

export function getSupabasePublicEnv() {
  return readEnv(
    {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    },
    ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] as const,
  );
}

export function getLivekitPublicEnv() {
  return readEnv(
    { NEXT_PUBLIC_LIVEKIT_URL: process.env.NEXT_PUBLIC_LIVEKIT_URL },
    ["NEXT_PUBLIC_LIVEKIT_URL"] as const,
  );
}

export function getPublicEnv(): Record<PublicEnvName, string> {
  return { ...getSupabasePublicEnv(), ...getLivekitPublicEnv() };
}

function assertServer(name: string) {
  if (typeof window !== "undefined") {
    throw new Error(`${name}() va usata solo sul server`);
  }
}

export function getSupabaseServerEnv() {
  assertServer("getSupabaseServerEnv");
  return readEnv(process.env, ["SUPABASE_SECRET_KEY"] as const);
}

export function getServerEnv(): Record<ServerEnvName, string> {
  assertServer("getServerEnv");
  return readEnv(process.env, SERVER_ENV_NAMES);
}
