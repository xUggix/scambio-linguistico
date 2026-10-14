// Validazione del modulo di iscrizione. Gira sul server prima di scrivere nel database,
// che ripete gli stessi controlli con i suoi vincoli.

export const LANGUAGES = ["it", "en"] as const;
export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export const DISPLAY_NAME_MAX = 40;

export type Language = (typeof LANGUAGES)[number];
export type Level = (typeof LEVELS)[number];

export type ProfileInput = {
  displayName: string;
  nativeLanguage: Language;
  practiceLanguage: Language;
  declaredLevel: Level;
  adultConfirmed: true;
};

export type ProfileField =
  | "displayName"
  | "nativeLanguage"
  | "practiceLanguage"
  | "declaredLevel"
  | "adultConfirmed";

export type ProfileError =
  | "required"
  | "tooLong"
  | "invalid"
  | "sameLanguage"
  | "notAdult";

export type ProfileValidation =
  | { ok: true; data: ProfileInput }
  | { ok: false; errors: Partial<Record<ProfileField, ProfileError>> };

const isOneOf = <T extends string>(list: readonly T[], value: unknown): value is T =>
  typeof value === "string" && (list as readonly string[]).includes(value);

export function validateProfile(raw: Record<string, unknown>): ProfileValidation {
  const errors: Partial<Record<ProfileField, ProfileError>> = {};

  const displayName =
    typeof raw.displayName === "string" ? raw.displayName.trim() : "";
  if (!displayName) errors.displayName = "required";
  else if (displayName.length > DISPLAY_NAME_MAX) errors.displayName = "tooLong";

  const { nativeLanguage, practiceLanguage, declaredLevel } = raw;
  if (!isOneOf(LANGUAGES, nativeLanguage)) errors.nativeLanguage = "invalid";
  if (!isOneOf(LANGUAGES, practiceLanguage)) errors.practiceLanguage = "invalid";
  else if (practiceLanguage === nativeLanguage)
    errors.practiceLanguage = "sameLanguage";
  if (!isOneOf(LEVELS, declaredLevel)) errors.declaredLevel = "invalid";

  // La casella deve essere spuntata esplicitamente: un browser invia "on".
  if (raw.adultConfirmed !== "on" && raw.adultConfirmed !== true)
    errors.adultConfirmed = "notAdult";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      displayName,
      nativeLanguage: nativeLanguage as Language,
      practiceLanguage: practiceLanguage as Language,
      declaredLevel: declaredLevel as Level,
      adultConfirmed: true,
    },
  };
}
