"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations } from "./i18n";

type TranslationSet = (typeof translations)[Lang];

interface LanguageContextType {
  lang: Lang;
  t: TranslationSet;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "pt" : "en"));
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
