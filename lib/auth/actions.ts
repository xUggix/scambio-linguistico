"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import {
  validateProfile,
  type ProfileError,
  type ProfileField,
} from "@/lib/profile/validate";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SignInState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; error: "invalidEmail" | "sendFailed" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendSignInLink(
  locale: Locale,
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_PATTERN.test(email)) return { status: "error", error: "invalidEmail" };

  const supabase = await createSupabaseServerClient();
  const origin = (await headers()).get("origin");
  if (!supabase || !origin) return { status: "error", error: "sendFailed" };

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/conferma?next=/${locale}/home`,
    },
  });
  // Non scriviamo l'email nei log: solo il codice dell'errore.
  if (error) {
    console.error("Invio del link di accesso non riuscito:", error.code ?? error.status);
    return { status: "error", error: "sendFailed" };
  }
  return { status: "sent" };
}

export type ProfileState = {
  errors: Partial<Record<ProfileField, ProfileError>>;
  saveFailed?: boolean;
};

export async function saveProfile(
  locale: Locale,
  _previous: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { errors: {}, saveFailed: true };
  // L'utente si ricava dalla sessione sul server, mai da un campo del modulo.
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (typeof userId !== "string") redirect(`/${locale}/accedi`);

  const result = validateProfile(Object.fromEntries(formData));
  if (!result.ok) return { errors: result.errors };

  const { error } = await supabase.from("profiles").insert({
    id: userId,
    display_name: result.data.displayName,
    native_language: result.data.nativeLanguage,
    practice_language: result.data.practiceLanguage,
    declared_level: result.data.declaredLevel,
    adult_confirmed_at: new Date().toISOString(),
    ui_locale: locale,
  });
  // 23505 = profilo già esistente (es. doppio invio): si va avanti.
  if (error && error.code !== "23505") {
    console.error("Salvataggio del profilo non riuscito:", error.code);
    return { errors: {}, saveFailed: true };
  }
  redirect(`/${locale}/home`);
}

export async function signOut(locale: Locale) {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect(`/${locale}`);
}
