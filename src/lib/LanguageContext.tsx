"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "./i18n";

type TranslationSet = (typeof translations)[Lang];

interface LanguageContextType {
  lang: Lang;
  t: TranslationSet;
  toggle: () => void;
}

const STORAGE_KEY = "hireme-lang";

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "pt") {
        setLang(stored);
      }
    } catch {
      // localStorage unavailable (SSR/privacy mode) — keep default
    }
  }, []);

  const toggle = () =>
    setLang((prev) => {
      const next = prev === "en" ? "pt" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
