import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "../types/types";
import type { Translations } from "./types";
import { pt } from "./pt";
import { en } from "./en";

/** Os dois dicionários numa gaveta só, etiquetados pelo código do idioma. */
const dictionaries: Record<Language, Translations> = { pt, en };

/** Chave usada no localStorage para lembrar a escolha entre visitas. */
const STORAGE_KEY = "portfolio:language";

/** O formato exato do que o Provider transmite. */
type I18nValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

/**
 * O canal. `null` é só uma rede de segurança para o caso de alguém ler o
 * Context sem ter um <I18nProvider> por cima — o useI18n abaixo trata isso.
 */
const I18nContext = createContext<I18nValue | null>(null);

/**
 * Decide o idioma inicial, em ordem de prioridade:
 *   1. a escolha que a pessoa fez numa visita anterior
 *   2. o idioma do navegador dela
 *   3. inglês, para quem chega de qualquer outro lugar
 *
 * Para fixar um padrão diferente, troque o `return "en"` do final.
 */
function detectInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // localStorage pode estar bloqueado (aba privada, cookies desligados):
    // segue para a detecção pelo navegador.
  }

  if (navigator.language?.toLowerCase().startsWith("pt")) return "pt";

  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);

  // Roda sempre que o idioma muda: guarda a escolha e avisa o navegador,
  // o que importa para leitores de tela e para o SEO.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Sem localStorage a escolha vale só para esta visita.
    }
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const value: I18nValue = {
    language,
    setLanguage,
    t: dictionaries[language],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * O jeito de qualquer componente pegar as traduções, em qualquer
 * profundidade da árvore e sem receber nada por prop.
 */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n precisa ser usado dentro de <I18nProvider>.");
  }
  return ctx;
}
