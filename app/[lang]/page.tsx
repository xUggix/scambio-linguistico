import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Landing({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{dict.appName}</h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        {dict.tagline}
      </p>
      <Link
        href={`/${lang}/accedi`}
        className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {dict.landing.cta}
      </Link>
      <p className="text-sm text-zinc-500">
        {dict.moreLanguagesSoon} · {dict.landing.building}
      </p>
    </main>
  );
}
