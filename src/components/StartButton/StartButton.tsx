import windowsIcon from "./Images/WindowsLogo.svg";
import { useI18n } from "../../i18n/I18nContext";
import "./StartButton.css";

type StartButtonProps = {
  onClick: () => void;
  active?: boolean;
};

export function StartButton({ onClick, active = false }: StartButtonProps) {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      className={`
        start-button-wrapper flex items-center gap-2 font-win98 text-[18px] leading-none select-none
        ${active ? "pressed" : ""}
      `}
    >
      <img src={windowsIcon} alt="" className="h-5 w-auto" />

      <span className="font-bold leading-none">{t.taskbar.start}</span>
    </button>
  );
}
