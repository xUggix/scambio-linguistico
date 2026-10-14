import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SignInForm } from "@/components/sign-in-form";
import { sendSignInLink } from "@/lib/auth/actions";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { supabasePublicConfig } from "@/lib/supabase/config";

export default async function SignInPage({
  params,
  searchParams,
}: PageProps<"/[lang]/accedi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-4 px-4 py-12">
      <h1 className="text-2xl font-semibold">{dict.signIn.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{dict.signIn.intro}</p>
      <Suspense>
        <LinkError searchParams={searchParams} text={dict.signIn} />
      </Suspense>
      {supabasePublicConfig() ? (
        <SignInForm action={sendSignInLink.bind(null, lang)} text={dict.signIn} />
      ) : (
        <p role="alert">{dict.missingConfig}</p>
      )}
      <p className="text-sm text-zinc-500">{dict.moreLanguagesSoon}</p>
    </main>
  );
}

async function LinkError({
  searchParams,
  text,
}: {
  searchParams: PageProps<"/[lang]/accedi">["searchParams"];
  text: Dictionary["signIn"];
}) {
  const { errore } = await searchParams;
  if (errore !== "link") return null;
  return (
    <p role="alert" className="text-sm text-red-700 dark:text-red-400">
      {text.errors.linkInvalid}
    </p>
  );
}
