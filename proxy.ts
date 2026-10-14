import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  localeFromPath,
  pickLocale,
} from "@/lib/i18n/config";
import { updateSession, withSessionCookies } from "@/lib/supabase/proxy";

// Pagine che richiedono l'accesso, dopo la lingua: /it/home, /en/benvenuto, ...
const PROTECTED = ["home", "benvenuto"];
const SIGN_IN = "accedi";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Il link nell'email arriva qui: nessuna lingua nell'indirizzo, la sessione la crea la route.
  if (pathname.startsWith("/auth/")) {
    return (await updateSession(request)).response;
  }

  const locale = localeFromPath(pathname);
  if (!locale) {
    const chosen = pickLocale(
      request.cookies.get(LOCALE_COOKIE)?.value,
      request.headers.get("accept-language"),
    );
    const url = request.nextUrl.clone();
    url.pathname = `/${chosen}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  const { response, userId, configured } = await updateSession(request);
  // Ricorda la lingua scelta per la prossima visita.
  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  if (!configured) return response;

  const section = pathname.split("/")[2] ?? "";
  if (PROTECTED.includes(section) && !userId) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${SIGN_IN}`;
    url.search = "";
    return withSessionCookies(response, NextResponse.redirect(url));
  }
  if (section === SIGN_IN && userId) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/home`;
    url.search = "";
    return withSessionCookies(response, NextResponse.redirect(url));
  }
  return response;
}

export const config = {
  matcher: [
    // Tutto tranne i file interni di Next.js e i file statici.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
