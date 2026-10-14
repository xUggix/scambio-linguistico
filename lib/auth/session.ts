import "server-only";
import { connection } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Language, Level } from "@/lib/profile/validate";

export type Profile = {
  display_name: string;
  native_language: Language;
  practice_language: Language;
  declared_level: Level;
};

// Unico punto in cui le pagine leggono utente e profilo.
// null = nessun accesso (o Supabase non configurato); profile null = iscrizione da completare.
export async function getCurrentUser() {
  // Sempre a ogni richiesta, anche quando Supabase non è configurato: mai una pagina statica.
  await connection();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (typeof userId !== "string") return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, native_language, practice_language, declared_level")
    .eq("id", userId)
    .maybeSingle<Profile>();
  return { userId, profile };
}
