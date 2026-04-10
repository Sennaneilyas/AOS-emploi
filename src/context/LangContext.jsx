/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

const DEFAULT_LANG = "fr";
const STORAGE_KEY = "aos_lang";

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const savedLang = window.localStorage.getItem(STORAGE_KEY);
    return savedLang === "ar" || savedLang === "fr" ? savedLang : DEFAULT_LANG;
  });

  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", direction);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => ({
      lang,
      setLang,
      toggleLang: () => setLang((current) => (current === "fr" ? "ar" : "fr")),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}
