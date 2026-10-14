"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/config";

// Selettore IT/EN: porta alla stessa pagina nell'altra lingua.
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={label} className="flex gap-1 text-sm">
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest ? `/${rest}` : ""}`}
          aria-current={locale === current ? "true" : undefined}
          className={
            locale === current
              ? "rounded px-2 py-1 font-semibold bg-zinc-200 dark:bg-zinc-800"
              : "rounded px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
