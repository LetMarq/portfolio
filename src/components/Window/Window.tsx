import { useState, useRef, type CSSProperties } from "react";
import "./Window.css";

type WindowProps = {
  title?: string;
  iconSrc?: string;
  children: React.ReactNode;
  onClose?: () => void;
  menuItems?: string[];
  variant?: "default" | "notepad";
  initialPosition?: { x: number; y: number };
  accent?: { from: string; to: string };
  zIndex?: number;
  onFocus?: () => void;
};

export function Window({
  title = "Minha janela",
  iconSrc,
  children,
  onClose,
  menuItems,
  variant = "default",
  initialPosition = { x: 80, y: 80 },
  accent,
  zIndex,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={windowRef}
      className={`window-container window-open ${isDragging ? "dragging" : ""}`}
      style={
        {
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex,
          ...(accent && {
            "--accent-from": accent.from,
            "--accent-to": accent.to,
          }),
        } as CSSProperties
      }
      onMouseDown={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="window-title-bar" onMouseDown={handleMouseDown}>
        <div className="window-title-left">
          {iconSrc && (
            <img src={iconSrc} width={16} height={16} alt="" draggable={false} />
          )}
          <span className="window-title">{title}</span>
        </div>
        <div className="window-title-buttons">
          <button className="window-btn window-btn-min">_</button>
          <button className="window-btn window-btn-max">□</button>
          {onClose && (
            <button className="window-btn window-btn-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      {menuItems && (
        <div className="window-menubar">
          {menuItems.map((item) => (
            <span key={item} className="window-menu-item">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className={`window-content ${variant === "notepad" ? "window-content-notepad" : ""}`}>
        {children}
      </div>
    </div>
  );
}
