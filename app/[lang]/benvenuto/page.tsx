import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { OnboardingForm } from "@/components/onboarding-form";
import { saveProfile } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function OnboardingPage({ params }: PageProps<"/[lang]/benvenuto">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold">{dict.onboarding.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{dict.onboarding.intro}</p>
      <Suspense fallback={<p>{dict.loading}</p>}>
        <Onboarding lang={lang} />
      </Suspense>
    </main>
  );
}

async function Onboarding({ lang }: { lang: Locale }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${lang}/accedi`);
  if (user.profile) redirect(`/${lang}/home`);
  const { onboarding, languages, levels } = getDictionary(lang);
  return (
    <OnboardingForm
      action={saveProfile.bind(null, lang)}
      dict={{ onboarding, languages, levels }}
    />
  );
}
