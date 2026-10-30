import { useEffect, useRef } from "react";
import { useI18n } from "../../i18n/I18nContext";
import "./BootScreen.css";

type BootScreenProps = {
  onDone: () => void;
  durationMs?: number;
};

export function BootScreen({ onDone, durationMs = 2600 }: BootScreenProps) {
  const { t } = useI18n();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs]);

  return (
    <div className="boot-screen">
      <div className="boot-logo">
        Letícia<span>00</span>
      </div>
      <div className="boot-bar">
        <div className="boot-bar-fill" />
      </div>
      <div className="boot-text">{t.boot.starting}</div>
    </div>
  );
}
