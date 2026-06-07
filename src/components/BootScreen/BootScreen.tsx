import { useEffect, useRef } from "react";
import "./BootScreen.css";

type BootScreenProps = {
  onDone: () => void;
  durationMs?: number;
};

export function BootScreen({ onDone, durationMs = 2600 }: BootScreenProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  return (
    <div className="boot-screen">
      <div className="boot-logo">
        Letícia<span>00</span>
      </div>
      <div className="boot-bar">
        <div className="boot-bar-fill" />
      </div>
      <div className="boot-text">Iniciando...</div>
    </div>
  );
}
