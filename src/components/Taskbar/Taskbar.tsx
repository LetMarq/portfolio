import { StartButton } from "../StartButton/StartButton";
import { useState, useEffect } from "react";
import "./Taskbar.css";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

type TaskbarProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

export function Taskbar({ menuOpen, toggleMenu }: TaskbarProps) {
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
        <StartButton onClick={toggleMenu} active={menuOpen} />
      </div>

      <div className="right-section">
        <LanguageSwitch />
        <div className="time start-bar-window">
          <span>{formattedTime}</span>
        </div>
      </div>
    </footer>
  );
}
