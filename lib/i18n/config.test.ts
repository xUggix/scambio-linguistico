import { describe, expect, it } from "vitest";
import { localeFromPath, pickLocale, safeNextPath } from "./config";

describe("pickLocale", () => {
  it("usa la scelta salvata prima di tutto", () => {
    expect(pickLocale("en", "it-IT,it;q=0.9")).toBe("en");
  });

  it("usa le preferenze del browser in ordine di peso", () => {
    expect(pickLocale(undefined, "de-DE,en;q=0.8,it;q=0.5")).toBe("en");
    expect(pickLocale(undefined, "en;q=0.3,it-IT;q=0.9")).toBe("it");
  });

  it("torna all'italiano se nessuna lingua è supportata", () => {
    expect(pickLocale("fr", "fr-FR,de;q=0.8")).toBe("it");
    expect(pickLocale(undefined, null)).toBe("it");
  });
});

describe("localeFromPath", () => {
  it("riconosce solo it ed en come primo pezzo del percorso", () => {
    expect(localeFromPath("/en/home")).toBe("en");
    expect(localeFromPath("/it")).toBe("it");
    expect(localeFromPath("/fr/home")).toBeUndefined();
    expect(localeFromPath("/")).toBeUndefined();
  });
});

describe("safeNextPath", () => {
  it("accetta solo percorsi interni con una lingua", () => {
    expect(safeNextPath("/en/home", "/it/home")).toBe("/en/home");
    expect(safeNextPath("https://esempio.com", "/it/home")).toBe("/it/home");
    expect(safeNextPath("//esempio.com/it", "/it/home")).toBe("/it/home");
    expect(safeNextPath("/home", "/it/home")).toBe("/it/home");
    expect(safeNextPath(null, "/it/home")).toBe("/it/home");
  });
});
