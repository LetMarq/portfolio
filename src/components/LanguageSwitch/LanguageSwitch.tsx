import { useI18n } from "../../i18n/I18nContext";
import "./LanguageSwitch.css";

export function LanguageSwitch() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="start-bar-window flex gap-1 px-1 w-fit items-center">
      <button
        onClick={() => setLanguage("pt")}
        className={`lang-button ${language === "pt" ? "pressed" : ""} p-1`}
        aria-pressed={language === "pt"}
      >
        <img
          src="https://flagcdn.com/br.svg"
          alt={t.taskbar.switchToPt}
          className="h-6"
        />
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`lang-button ${language === "en" ? "pressed" : ""} p-1`}
        aria-pressed={language === "en"}
      >
        <img
          src="https://flagcdn.com/au.svg"
          alt={t.taskbar.switchToEn}
          className="h-6"
        />
      </button>
    </div>
  );
}
