import { getSupabasePublicEnv } from "@/lib/env";

// Restituisce le chiavi pubbliche di Supabase, oppure null se non sono ancora impostate:
// così l'app si avvia anche senza chiavi e mostra "configurazione incompleta".
export function supabasePublicConfig(): { url: string; key: string } | null {
  try {
    const env = getSupabasePublicEnv();
    return {
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      key: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    };
  } catch {
    return null;
  }
}
