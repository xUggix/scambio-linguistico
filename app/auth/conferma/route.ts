import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, localeFromPath, safeNextPath } from "@/lib/i18n/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Il link nell'email porta qui. Due formati:
// - token_hash + type: funziona anche se il link si apre in un altro browser (consigliato);
// - code: il formato predefinito di Supabase, solo nello stesso browser della richiesta.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const next = safeNextPath(params.get("next"), `/${DEFAULT_LOCALE}/home`);
  const locale = localeFromPath(next) ?? DEFAULT_LOCALE;

  const supabase = await createSupabaseServerClient();
  let ok = false;
  if (supabase) {
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;
    const code = params.get("code");
    if (tokenHash && type) {
      ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;
    } else if (code) {
      ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
    }
  }

  const target = new URL(ok ? next : `/${locale}/accedi?errore=link`, request.url);
  return NextResponse.redirect(target);
}
