import { StartButton } from "../StartButton/StartButton";
import { useState, useEffect } from "react";
import "./Taskbar.css";
import type { Language } from "../../types/types";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

type TaskbarProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
};

export function Taskbar({
  menuOpen,
  toggleMenu,
  language,
  setLanguage,
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: undefined,
    hour12: true,
  });

  return (
    /* usa a classe de estilo da barra */
    <footer className="start-bar">
      <div className="start-bar-window">
        <StartButton onClick={toggleMenu} active={menuOpen} language={language} />
      </div>

      <div className="right-section">
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        <div className="time start-bar-window">
          <span>{formattedTime}</span>
        </div>
      </div>
    </footer>
  );
}
