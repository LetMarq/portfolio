import { Window } from "./components/Window/Window";
import { Taskbar } from "./components/Taskbar/Taskbar";
import { StartMenu } from "./components/StartMenu/StartMenu";
import { DesktopIcon } from "./components/DesktopIcon/DesktopIcon";
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { BootScreen } from "./components/BootScreen/BootScreen";
import { Island } from "./components/Island/Island";
import { useState } from "react";
import { useI18n } from "./i18n/I18nContext";
import { playStartup, playShutdown, playOpen } from "./sounds";
import { skills } from "./skillsData";
import "./App.css";

type WindowId =
  | "about"
  | "checklist"
  | "portfolio"
  | "contact"
  | "skills"
  | "island";

function SkillsContent() {
  return (
    <div className="skills-grid">
      {skills.map(({ name, color, path }) => (
        <div className="skill-cell" key={name} title={name}>
          <svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill={color}
            role="img"
            aria-label={name}
          >
            <path d={path} />
          </svg>
        </div>
      ))}
    </div>
  );
}

function AboutContent() {
  const { t } = useI18n();

  return (
    <div className="notepad-text">
      <div className="about-section">
        <p>{t.about.greeting}</p>
        <p>{t.about.passion}</p>
        <p>{t.about.masters}</p>
      </div>
      <p>&nbsp;</p>
      <p>
        {"— "}
        {t.about.technologiesHeading}
        {" —"}
      </p>
      {/* nomes de tecnologia não mudam de idioma, então ficam fora do dicionário */}
      <p>React · TypeScript · CSS · Node.js</p>
      <p>Vite · Tailwind · Git · Figma</p>
      <p>&nbsp;</p>
      <p>
        <a className="notepad-link" href="/pdf/CV.pdf" download>
          {t.about.downloadCv}
        </a>
      </p>
    </div>
  );
}

function ChecklistContent() {
  const { t } = useI18n();

  return (
    <div className="notepad-text">
      {t.checklist.items.map((item, i) => (
        <p key={i}>
          {i + 1} - {item}
        </p>
      ))}
    </div>
  );
}

const CONTACT = {
  email: "leticia.marquespinho@gmail.com",
  github: "https://github.com/LetMarq",
  linkedin: "https://www.linkedin.com/in/leticia-marques-pinho",
};

function ContactContent() {
  const { t } = useI18n();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const send = () => {
    const url = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <div className="contact">
      <div className="contact-toolbar">
        <button className="contact-send" onClick={send}>
          <span className="contact-send-icon">✉</span>
          {t.contact.send}
        </button>
      </div>

      <div className="contact-row">
        <span className="contact-label">{t.contact.to}</span>
        <a className="contact-link" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-label">{t.contact.subject}</span>
        <input
          className="contact-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <textarea
        className="contact-body"
        placeholder={t.contact.bodyPlaceholder}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="contact-social">
        <span>{t.contact.findMe}</span>
        <a
          className="contact-link"
          href={CONTACT.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="contact-link"
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

const fileMenu = ["File", "Edit", "View", "Help"];

export default function App() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(
    new Set(["about", "checklist"]),
  );

  const [zOrder, setZOrder] = useState<WindowId[]>(["about", "checklist"]);
  const [screen, setScreen] = useState<
    "boot" | "desktop" | "off" | "login" | "on"
  >("boot");

  const isOpen = (id: WindowId) => openWindows.has(id);

  const focusWindow = (id: WindowId) =>
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);

  const getZ = (id: WindowId) => 10 + zOrder.indexOf(id);

  const openWindow = (id: WindowId) => {
    playOpen();
    setOpenWindows((prev) => new Set(prev).add(id));
    focusWindow(id);
  };

  const handleShutDown = () => {
    playShutdown();
    setScreen("off");
  };

  const handleLogin = () => {
    playStartup();
    setScreen("on");
  };

  const closeWindow = (id: WindowId) =>
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  // largura da viewport para ancorar janelas à direita em qualquer tela
  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1280;

  /**
   * Um ícone da área de trabalho abre uma janela (`id`) OU um site externo
   * (`href`), nunca os dois.
   */
  type DesktopItem = {
    src: string;
    label: string;
    id?: WindowId;
    href?: string;
  };

  const openItem = (item: DesktopItem) => {
    if (item.href) {
      playOpen();
      // noopener/noreferrer: a aba nova não ganha acesso a esta página
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.id) openWindow(item.id);
  };

  const desktopIcons: DesktopItem[] = [
    {
      id: "about" as WindowId,
      src: "/icons/notepad.png",
      label: t.apps.about,
    },
    {
      id: "checklist" as WindowId,
      src: "/icons/write.png",
      label: t.apps.checklist,
    },
    {
      id: "portfolio" as WindowId,
      src: "/icons/folder.png",
      label: t.apps.portfolio,
    },
    {
      id: "contact" as WindowId,
      src: "/icons/computer.png",
      label: t.apps.contact,
    },
    {
      id: "skills" as WindowId,
      src: "/icons/tech.png",
      label: t.apps.skills,
    },
    {
      id: "island" as WindowId,
      src: "/icons/palm.png",
      label: t.apps.island,
    },
    {
      href: "https://house-cleaning-athens.vercel.app/",
      src: "/icons/bucket.png",
      label: t.apps.cleaning,
    },
    {
      id: "checklist" as WindowId,
      src: "/icons/recycle.png",
      label: t.apps.recycleBin,
    },
  ];

  if (screen === "boot") {
    return <BootScreen onDone={() => setScreen("on")} />;
  }

  if (screen === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="screen-frame">
      <div
        className={`desktop ${
          screen === "off" ? "crt-off" : screen === "on" ? "crt-on" : ""
        }`}
        onAnimationEnd={(e) => {
          if (screen === "off" && e.animationName === "crt-off") {
            setScreen("login");
          }
          if (screen === "on" && e.animationName === "crt-on") {
            setScreen("desktop");
          }
        }}
      >
        <div className="desktop-icons-grid">
          {desktopIcons.map((item, i) => (
            <DesktopIcon
              key={i}
              src={item.src}
              label={item.label}
              onDoubleClick={() => openItem(item)}
            />
          ))}
        </div>

        {isOpen("about") && (
          <Window
            title={t.windowTitles.about}
            iconSrc="/icons/notepad16.png"
            menuItems={fileMenu}
            variant="notepad"
            accent={{ from: "#b3135a", to: "#ff7eb9" }}
            onClose={() => closeWindow("about")}
            onFocus={() => focusWindow("about")}
            zIndex={getZ("about")}
            initialPosition={{ x: Math.max((viewportW - 320) / 2, 90), y: 70 }}
          >
            <AboutContent />
          </Window>
        )}

        {isOpen("checklist") && (
          <Window
            title={t.windowTitles.checklist}
            variant="postit"
            onClose={() => closeWindow("checklist")}
            onFocus={() => focusWindow("checklist")}
            zIndex={getZ("checklist")}
            initialPosition={{ x: Math.max(viewportW - 360, 460), y: 90 }}
          >
            <ChecklistContent />
          </Window>
        )}

        {isOpen("portfolio") && (
          <Window
            title={t.apps.portfolio}
            iconSrc="/icons/folder16.png"
            accent={{ from: "#0d6e6e", to: "#4fc4c4" }}
            onClose={() => closeWindow("portfolio")}
            onFocus={() => focusWindow("portfolio")}
            zIndex={getZ("portfolio")}
            initialPosition={{ x: 200, y: 150 }}
          >
            <p style={{ padding: 8 }}>{t.portfolio.underConstruction}</p>
          </Window>
        )}

        {isOpen("contact") && (
          <Window
            title={t.apps.contact}
            iconSrc="/icons/computer16.png"
            accent={{ from: "#c75b00", to: "#ff9e57" }}
            onClose={() => closeWindow("contact")}
            onFocus={() => focusWindow("contact")}
            zIndex={getZ("contact")}
            initialPosition={{ x: 250, y: 120 }}
          >
            <ContactContent />
          </Window>
        )}

        {isOpen("skills") && (
          <Window
            title={t.apps.skills}
            iconSrc="/icons/tech16.png"
            accent={{ from: "#1452b3", to: "#5a8de0" }}
            onClose={() => closeWindow("skills")}
            onFocus={() => focusWindow("skills")}
            zIndex={getZ("skills")}
            initialPosition={{ x: 300, y: 180 }}
          >
            <SkillsContent />
          </Window>
        )}

        {isOpen("island") && (
          <Window
            title={t.apps.island}
            iconSrc="/icons/palm16.png"
            accent={{ from: "#0d7a4e", to: "#4fd48a" }}
            onClose={() => closeWindow("island")}
            onFocus={() => focusWindow("island")}
            zIndex={getZ("island")}
            initialPosition={{ x: 160, y: 60 }}
          >
            <Island />
          </Window>
        )}

        <StartMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSelectApp={(id) => openWindow(id as WindowId)}
          onShutDown={handleShutDown}
        />

        <Taskbar menuOpen={menuOpen} toggleMenu={() => setMenuOpen((o) => !o)} />
      </div>
    </div>
  );
}
