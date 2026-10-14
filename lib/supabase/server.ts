import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublicConfig } from "./config";

// Client di Supabase per pagine, azioni e route sul server, con la sessione dell'utente.
// Usa la chiave pubblica: i permessi sono quelli dell'utente, filtrati dalle regole di accesso.
export async function createSupabaseServerClient() {
  const config = supabasePublicConfig();
  if (!config) return null;
  const cookieStore = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Nelle pagine i cookie non si possono scrivere: la sessione la rinnova proxy.ts.
        }
      },
    },
  });
}
