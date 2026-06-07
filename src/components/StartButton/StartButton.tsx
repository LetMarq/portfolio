import windowsIcon from "./Images/WindowsLogo.svg";
import type { Language } from "../../types/types";
import "./StartButton.css";

type StartButtonProps = {
  onClick: () => void;
  active?: boolean;
  language: Language;
};

export function StartButton({ onClick, active = false, language }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        start-button-wrapper flex items-center gap-2 font-win98 text-[18px] leading-none select-none
        ${active ? "pressed" : ""}
      `}
    >
      <img src={windowsIcon} alt="" className="h-5 w-auto" />

      <span className="font-bold leading-none">
        {language === "pt" ? "Iniciar" : "Start"}
      </span>
    </button>
  );
}
