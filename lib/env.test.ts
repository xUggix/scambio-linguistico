import { describe, expect, it } from "vitest";
import { PUBLIC_ENV_NAMES, SERVER_ENV_NAMES, readEnv } from "./env";

describe("readEnv", () => {
  it("restituisce i valori presenti, senza spazi", () => {
    expect(readEnv({ A: " uno ", B: "due" }, ["A", "B"])).toEqual({
      A: "uno",
      B: "due",
    });
  });

  it("elenca le variabili mancanti o vuote senza mostrare i valori", () => {
    const source = { A: "valore-segreto", B: "   " };
    expect(() => readEnv(source, ["A", "B", "C"])).toThrow(
      "Variabili d'ambiente mancanti: B, C",
    );
    try {
      readEnv(source, ["A", "B", "C"]);
    } catch (error) {
      expect(String(error)).not.toContain("valore-segreto");
    }
  });
});

describe("separazione tra chiavi pubbliche e segrete", () => {
  it("nessuna chiave segreta ha il prefisso che la esporrebbe al browser", () => {
    for (const name of SERVER_ENV_NAMES) {
      expect(name.startsWith("NEXT_PUBLIC_")).toBe(false);
    }
  });

  it("tutte le variabili pubbliche hanno il prefisso NEXT_PUBLIC_", () => {
    for (const name of PUBLIC_ENV_NAMES) {
      expect(name.startsWith("NEXT_PUBLIC_")).toBe(true);
    }
  });
});
