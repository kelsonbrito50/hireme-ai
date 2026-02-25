/**
 * Tests for src/lib/i18n.ts
 * Ensures translations are complete and consistent between locales.
 */
import { translations, type Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["en", "pt"];

describe("translations", () => {
  it("exports 'en' and 'pt' keys", () => {
    expect(translations).toHaveProperty("en");
    expect(translations).toHaveProperty("pt");
  });

  it("both locales have the same top-level keys", () => {
    const enKeys = Object.keys(translations.en).sort();
    const ptKeys = Object.keys(translations.pt).sort();
    expect(enKeys).toEqual(ptKeys);
  });

  describe.each(LANGS)("locale: %s", (lang) => {
    const t = translations[lang];

    it("welcomeBack is a function that returns a string", () => {
      const fn = t.welcomeBack as (name: string) => string;
      expect(typeof fn).toBe("function");
      const result = fn("Kelson");
      expect(typeof result).toBe("string");
      expect(result).toContain("Kelson");
    });

    it("analyzeBtn is a non-empty string", () => {
      expect(typeof t.analyzeBtn).toBe("string");
      expect((t.analyzeBtn as string).length).toBeGreaterThan(0);
    });

    it("steps is an array of 4 items", () => {
      expect(Array.isArray(t.steps)).toBe(true);
      expect((t.steps as unknown[]).length).toBe(4);
    });

    it("each step has title, desc, and tip", () => {
      for (const step of t.steps as { title: string; desc: string; tip: string }[]) {
        expect(step).toHaveProperty("title");
        expect(step).toHaveProperty("desc");
        expect(step).toHaveProperty("tip");
      }
    });

    it("signIn is a non-empty string", () => {
      expect(typeof t.signIn).toBe("string");
      expect((t.signIn as string).length).toBeGreaterThan(0);
    });

    it("matchScore is a non-empty string", () => {
      expect(typeof t.matchScore).toBe("string");
      expect((t.matchScore as string).length).toBeGreaterThan(0);
    });
  });

  it("english welcomeBack includes the name passed", () => {
    const fn = translations.en.welcomeBack as (name: string) => string;
    expect(fn("Kelson")).toContain("Kelson");
  });

  it("portuguese welcomeBack includes the name passed", () => {
    const fn = translations.pt.welcomeBack as (name: string) => string;
    expect(fn("Kelson")).toContain("Kelson");
  });
});
