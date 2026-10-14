// Verifica il criterio del passo 2: con due account, ciascuno vede solo i propri dati.
// Gira contro il progetto Supabase vero; crea due utenti di prova e li cancella alla fine.
// Si salta se in .env.local mancano le chiavi di Supabase.

import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const hasKeys = Boolean(url && publishableKey && secretKey);

const noSession = { auth: { persistSession: false, autoRefreshToken: false } };

type TestUser = { id: string; client: SupabaseClient };

describe.skipIf(!hasKeys)("regole di accesso su profiles", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let a: TestUser;
  let b: TestUser;

  async function createTestUser(): Promise<TestUser> {
    const email = `ditto-test-${randomUUID()}@example.com`;
    const password = randomUUID();
    const created = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (created.error) throw created.error;
    const client = createClient(url!, publishableKey!, noSession);
    const signedIn = await client.auth.signInWithPassword({ email, password });
    if (signedIn.error) throw signedIn.error;
    return { id: created.data.user.id, client };
  }

  const profileFor = (id: string, displayName: string) => ({
    id,
    display_name: displayName,
    native_language: "it",
    practice_language: "en",
    declared_level: "B1",
    adult_confirmed_at: new Date().toISOString(),
  });

  beforeAll(async () => {
    admin = createClient(url!, secretKey!, noSession);
    anon = createClient(url!, publishableKey!, noSession);
    a = await createTestUser();
    b = await createTestUser();
    for (const [user, name] of [[a, "Utente A"], [b, "Utente B"]] as const) {
      const { error } = await user.client
        .from("profiles")
        .insert(profileFor(user.id, name));
      if (error) throw error;
    }
  });

  afterAll(async () => {
    for (const user of [a, b]) {
      if (user) await admin.auth.admin.deleteUser(user.id);
    }
  });

  it("ciascuno legge solo il proprio profilo", async () => {
    for (const [me, other] of [[a, b], [b, a]] as const) {
      const { data, error } = await me.client.from("profiles").select("id");
      expect(error).toBeNull();
      const ids = (data ?? []).map((row) => row.id);
      expect(ids).toContain(me.id);
      expect(ids).not.toContain(other.id);
    }
  });

  it("nessuno modifica il profilo dell'altro", async () => {
    const { data } = await a.client
      .from("profiles")
      .update({ display_name: "Modificato da A" })
      .eq("id", b.id)
      .select();
    expect(data ?? []).toHaveLength(0);
    const check = await admin
      .from("profiles")
      .select("display_name")
      .eq("id", b.id)
      .single();
    expect(check.data?.display_name).toBe("Utente B");
  });

  it("nessuno crea un profilo a nome dell'altro", async () => {
    await admin.from("profiles").delete().eq("id", b.id);
    const { error } = await a.client
      .from("profiles")
      .insert(profileFor(b.id, "Finto B"));
    expect(error).not.toBeNull();
    await admin.from("profiles").insert(profileFor(b.id, "Utente B"));
  });

  it("chi non ha fatto l'accesso non legge nulla", async () => {
    const { data } = await anon.from("profiles").select("id");
    expect(data ?? []).toHaveLength(0);
  });

  it("il database rifiuta un profilo senza conferma dei 18 anni", async () => {
    const withoutAdult: Partial<ReturnType<typeof profileFor>> = profileFor(a.id, "A");
    delete withoutAdult.adult_confirmed_at;
    await admin.from("profiles").delete().eq("id", a.id);
    const { error } = await a.client.from("profiles").insert(withoutAdult);
    expect(error).not.toBeNull();
    await admin.from("profiles").insert(profileFor(a.id, "Utente A"));
  });

  it("cancellare l'utente cancella anche il profilo", async () => {
    const extra = await createTestUser();
    await extra.client.from("profiles").insert(profileFor(extra.id, "Extra"));
    await admin.auth.admin.deleteUser(extra.id);
    const { data } = await admin.from("profiles").select("id").eq("id", extra.id);
    expect(data ?? []).toHaveLength(0);
  });
});
