import { useI18n } from "../../i18n/I18nContext";
import "./StartMenu.css";

type StartMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appName: string) => void;
  onShutDown: () => void;
};

export function StartMenu({
  isOpen,
  onClose,
  onSelectApp,
  onShutDown,
}: StartMenuProps) {
  const { t } = useI18n();

  const apps = [
    {
      id: "portfolio",
      label: t.apps.portfolio,
      icon: "/icons/folder.png",
    },
    {
      id: "about",
      label: t.startMenu.about,
      icon: "/icons/notepad.png",
    },
    {
      id: "contact",
      label: t.apps.contact,
      icon: "/icons/computer.png",
    },
    {
      id: "island",
      label: t.apps.island,
      icon: "/icons/palm.png",
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
            <button
              className="menu-item"
              onClick={() => {
                onClose();
                onShutDown();
              }}
            >
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
              <span className="item-label">{t.startMenu.shutDown}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
