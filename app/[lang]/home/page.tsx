import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { signOut } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Home provvisoria del passo 2: mostra solo il profilo dell'utente.
// Prossime chiamate, inviti, streak e minuti arrivano nei passi successivi.
export default async function HomePage({ params }: PageProps<"/[lang]/home">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-4 py-10">
      <Suspense fallback={<p>{dict.loading}</p>}>
        <Home lang={lang} />
      </Suspense>
    </main>
  );
}

async function Home({ lang }: { lang: Locale }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${lang}/accedi`);
  if (!user.profile) redirect(`/${lang}/benvenuto`);
  const dict = getDictionary(lang);
  const { profile } = user;

  return (
    <>
      <h1 className="text-2xl font-semibold">
        {dict.home.title.replace("{name}", profile.display_name)}
      </h1>
      <section className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="font-medium">{dict.home.profile}</h2>
        <dl className="grid grid-cols-2 gap-y-1 text-sm">
          <dt className="text-zinc-500">{dict.home.native}</dt>
          <dd>{dict.languages[profile.native_language]}</dd>
          <dt className="text-zinc-500">{dict.home.practice}</dt>
          <dd>{dict.languages[profile.practice_language]}</dd>
          <dt className="text-zinc-500">{dict.home.declaredLevel}</dt>
          <dd>{dict.levels[profile.declared_level]}</dd>
        </dl>
      </section>
      <p className="text-sm text-zinc-500">{dict.home.nextSteps}</p>
      <form action={signOut.bind(null, lang)}>
        <button type="submit" className="text-sm underline">
          {dict.home.signOut}
        </button>
      </form>
    </>
  );
}
