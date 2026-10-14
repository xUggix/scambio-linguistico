"use client";

import { useActionState } from "react";
import type { SignInState } from "@/lib/auth/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SignInForm({
  action,
  text,
}: {
  action: (previous: SignInState, formData: FormData) => Promise<SignInState>;
  text: Dictionary["signIn"];
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });

  if (state.status === "sent") {
    return <p role="status" className="rounded-lg bg-green-50 p-4 text-green-900 dark:bg-green-950 dark:text-green-100">{text.sent}</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label htmlFor="email" className="text-sm font-medium">
        {text.emailLabel}
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="rounded-lg border border-zinc-300 bg-transparent px-3 py-3 dark:border-zinc-700"
      />
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {text.errors[state.error]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? text.sending : text.submit}
      </button>
    </form>
  );
}
