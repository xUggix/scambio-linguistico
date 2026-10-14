import { describe, expect, it } from "vitest";
import { validateProfile } from "./validate";

const valid = {
  displayName: "  Giulia ",
  nativeLanguage: "it",
  practiceLanguage: "en",
  declaredLevel: "B1",
  adultConfirmed: "on",
};

describe("validateProfile", () => {
  it("accetta un profilo completo e toglie gli spazi dal nome", () => {
    const result = validateProfile(valid);
    expect(result).toEqual({
      ok: true,
      data: {
        displayName: "Giulia",
        nativeLanguage: "it",
        practiceLanguage: "en",
        declaredLevel: "B1",
        adultConfirmed: true,
      },
    });
  });

  it("rifiuta l'iscrizione senza la conferma dei 18 anni", () => {
    for (const adultConfirmed of [undefined, "", "off", "false", false]) {
      const result = validateProfile({ ...valid, adultConfirmed });
      expect(result).toEqual({ ok: false, errors: { adultConfirmed: "notAdult" } });
    }
  });

  it("rifiuta la stessa lingua come madre e da praticare", () => {
    const result = validateProfile({ ...valid, practiceLanguage: "it" });
    expect(result).toEqual({
      ok: false,
      errors: { practiceLanguage: "sameLanguage" },
    });
  });

  it("accetta solo italiano e inglese", () => {
    const result = validateProfile({ ...valid, nativeLanguage: "fr" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.nativeLanguage).toBe("invalid");
  });

  it("accetta solo i livelli da A1 a C1", () => {
    for (const declaredLevel of ["C2", "b1", "", undefined]) {
      const result = validateProfile({ ...valid, declaredLevel });
      expect(result.ok).toBe(false);
    }
  });

  it("controlla il nome: obbligatorio e al massimo 40 caratteri", () => {
    const empty = validateProfile({ ...valid, displayName: "   " });
    const long = validateProfile({ ...valid, displayName: "a".repeat(41) });
    expect(empty.ok || empty.errors.displayName).toBe("required");
    expect(long.ok || long.errors.displayName).toBe("tooLong");
  });
});
