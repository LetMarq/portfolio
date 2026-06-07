import type { Language } from "../../types/types";
import "./LanguageSwitch.css";

type LanguageSwitchProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export function LanguageSwitch({ language, setLanguage }: LanguageSwitchProps) {
  return (
    <div className="start-bar-window flex gap-1 px-1 w-fit items-center">
      <button
        onClick={() => setLanguage("pt")}
        className={`lang-button ${language === "pt" ? "pressed" : ""} p-1`}
      >
        <img src="https://flagcdn.com/br.svg" alt="Português" className="h-6" />
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`lang-button ${language === "en" ? "pressed" : ""} p-1`}
      >
        <img src="https://flagcdn.com/au.svg" alt="English" className="h-6" />
      </button>
    </div>
  );
}
