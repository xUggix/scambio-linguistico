"use client";

import { useActionState } from "react";
import type { ProfileState } from "@/lib/auth/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { DISPLAY_NAME_MAX, LANGUAGES, LEVELS, type ProfileField } from "@/lib/profile/validate";

const field = "rounded-lg border border-zinc-300 bg-transparent px-3 py-3 dark:border-zinc-700";
const COMING_SOON = ["fr", "es"] as const;

export function OnboardingForm({
  action,
  dict,
}: {
  action: (previous: ProfileState, formData: FormData) => Promise<ProfileState>;
  dict: Pick<Dictionary, "onboarding" | "languages" | "levels">;
}) {
  const [state, formAction, pending] = useActionState(action, { errors: {} });
  const text = dict.onboarding;

  const error = (name: ProfileField) =>
    state.errors[name] ? (
      <p id={`${name}-error`} role="alert" className="text-sm text-red-700 dark:text-red-400">
        {text.errors[state.errors[name]]}
      </p>
    ) : null;

  const languageOptions = (
    <>
      {LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {dict.languages[lang]}
        </option>
      ))}
      {COMING_SOON.map((lang) => (
        <option key={lang} value={lang} disabled>
          {dict.languages[lang]} ({text.soon})
        </option>
      ))}
    </>
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="displayName" className="text-sm font-medium">{text.displayName}</label>
        <input id="displayName" name="displayName" required maxLength={DISPLAY_NAME_MAX} autoComplete="nickname" className={field} />
        {error("displayName")}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="nativeLanguage" className="text-sm font-medium">{text.nativeLanguage}</label>
        <select id="nativeLanguage" name="nativeLanguage" required defaultValue="it" className={field}>
          {languageOptions}
        </select>
        {error("nativeLanguage")}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="practiceLanguage" className="text-sm font-medium">{text.practiceLanguage}</label>
        <select id="practiceLanguage" name="practiceLanguage" required defaultValue="en" className={field}>
          {languageOptions}
        </select>
        {error("practiceLanguage")}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="declaredLevel" className="text-sm font-medium">{text.declaredLevel}</label>
        <select id="declaredLevel" name="declaredLevel" required defaultValue="" className={field}>
          <option value="" disabled>—</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>{dict.levels[level]}</option>
          ))}
        </select>
        <p className="text-sm text-zinc-500">{text.levelHint}</p>
        {error("declaredLevel")}
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="adultConfirmed" required className="mt-1 h-5 w-5" />
          <span>{text.adultConfirmed}</span>
        </label>
        {error("adultConfirmed")}
      </div>

      {state.saveFailed && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">{text.errors.saveFailed}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? text.saving : text.submit}
      </button>
    </form>
  );
}
