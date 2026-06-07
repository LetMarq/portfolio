import "./DesktopIcon.css";

type DesktopIconProps = {
  src: string;
  label: string;
  onDoubleClick: () => void;
};

export function DesktopIcon({ src, label, onDoubleClick }: DesktopIconProps) {
  return (
    <div className="desktop-icon" onDoubleClick={onDoubleClick}>
      <img src={src} width={48} height={48} alt={label} draggable={false} />
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
}
