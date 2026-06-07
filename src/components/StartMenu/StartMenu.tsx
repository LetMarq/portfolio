import "./StartMenu.css";
import type { Language } from "../../types/types";

type StartMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appName: string) => void;
  language: Language;
};

export function StartMenu({
  isOpen,
  onClose,
  onSelectApp,
  language,
}: StartMenuProps) {
  const apps = [
    {
      id: "portfolio",
      label: language === "pt" ? "Portfólio" : "Portfolio",
      icon: "/icons/folder.png",
    },
    {
      id: "about",
      label: language === "pt" ? "Sobre" : "About",
      icon: "/icons/notepad.png",
    },
    {
      id: "contact",
      label: language === "pt" ? "Contato" : "Contact",
      icon: "/icons/computer.png",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="menu-sidebar">
          <span className="sidebar-text">
            Letícia<strong>00</strong>
          </span>
        </div>

        <div className="menu-main">
          <div className="menu-items">
            {apps.map((app) => (
              <button
                key={app.id}
                className="menu-item"
                onClick={() => {
                  onSelectApp(app.id);
                  onClose();
                }}
              >
                <img
                  className="item-icon"
                  src={app.icon}
                  alt=""
                  width={32}
                  height={32}
                  draggable={false}
                />
                <span className="item-label">{app.label}</span>
              </button>
            ))}
          </div>

          <div className="menu-separator" />

          <div className="menu-bottom">
            <button className="menu-item" onClick={onClose}>
              <span className="item-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M12 3 v9" />
                  <path d="M7 6.5 a7 7 0 1 0 10 0" />
                </svg>
              </span>
              <span className="item-label">
                {language === "pt" ? "Desligar..." : "Shut Down..."}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
