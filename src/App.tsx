import { Window } from "./components/Window/Window";
import { Taskbar } from "./components/Taskbar/Taskbar";
import { StartMenu } from "./components/StartMenu/StartMenu";
import { DesktopIcon } from "./components/DesktopIcon/DesktopIcon";
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { useState } from "react";
import type { Language } from "./types/types";
import "./App.css";

type WindowId = "about" | "checklist" | "portfolio" | "contact";

function AboutContent({ language }: { language: Language }) {
  return (
    <div className="notepad-text">
      <p>
        {language === "pt"
          ? "Oi, eu sou a Letícia Marques."
          : "Hi, I'm Letícia Marques."}
      </p>
      <p>&nbsp;</p>
      <p>
        {language === "pt"
          ? "Sou uma desenvolvedora apaixonada por criar"
          : "I'm a developer passionate about creating"}
      </p>
      <p>
        {language === "pt"
          ? "experiências únicas na web."
          : "unique experiences on the web."}
      </p>
      <p>&nbsp;</p>
      <p>
        {language === "pt"
          ? "Atualmente faço mestrado na Unicamp,"
          : "I'm currently doing a master's at Unicamp,"}
      </p>
      <p>
        {language === "pt"
          ? "voltado a jogos na educação."
          : "focused on games in education."}
      </p>
      <p>&nbsp;</p>
      <p>
        {"— "}
        {language === "pt" ? "Tecnologias" : "Technologies"}
        {" —"}
      </p>
      <p>React · TypeScript · CSS · Node.js</p>
      <p>Vite · Tailwind · Git · Figma</p>
      <p>&nbsp;</p>
      <p>
        <a className="notepad-link" href="/pdf/CV.pdf" download>
          {language === "pt" ? "Baixar meu currículo" : "Download my resume"}
        </a>
      </p>
    </div>
  );
}

function ChecklistContent({ language }: { language: Language }) {
  const items =
    language === "pt"
      ? [
          "Terminar o portfólio.",
          "Viajar pelo mundo.",
          "Aprender a fazer café.",
        ]
      : [
          "Finish the portfolio.",
          "Travel the world.",
          "Learn how to make coffee.",
        ];

  return (
    <div className="notepad-text">
      {items.map((item, i) => (
        <p key={i}>
          {i + 1} - {item}
        </p>
      ))}
    </div>
  );
}

const fileMenu = ["File", "Edit", "View", "Help"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(
    new Set(["about", "checklist"]),
  );
  const [language, setLanguage] = useState<Language>("pt");

  const [zOrder, setZOrder] = useState<WindowId[]>(["about", "checklist"]);
  const [screen, setScreen] = useState<"desktop" | "off" | "login" | "on">(
    "desktop",
  );

  const isOpen = (id: WindowId) => openWindows.has(id);

  const focusWindow = (id: WindowId) =>
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);

  const getZ = (id: WindowId) => 10 + zOrder.indexOf(id);

  const openWindow = (id: WindowId) => {
    setOpenWindows((prev) => new Set(prev).add(id));
    focusWindow(id);
  };

  const closeWindow = (id: WindowId) =>
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const desktopIcons = [
    {
      id: "about" as WindowId,
      src: "/icons/notepad.png",
      label: language === "pt" ? "sobre_mim" : "about_me",
    },
    {
      id: "checklist" as WindowId,
      src: "/icons/write.png",
      label: "Check List",
    },
    {
      id: "portfolio" as WindowId,
      src: "/icons/folder.png",
      label: language === "pt" ? "Portfólio" : "Portfolio",
    },
    {
      id: "contact" as WindowId,
      src: "/icons/computer.png",
      label: language === "pt" ? "Contato" : "Contact",
    },
    {
      id: "checklist" as WindowId,
      src: "/icons/recycle.png",
      label: language === "pt" ? "Lixeira" : "Recycle Bin",
    },
  ];

  if (screen === "login") {
    return <LoginScreen language={language} onLogin={() => setScreen("on")} />;
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
            onDoubleClick={() => openWindow(item.id)}
          />
        ))}
      </div>

      {isOpen("about") && (
        <Window
          title={
            language === "pt" ? "sobre_mim - Notepad" : "about_me - Notepad"
          }
          iconSrc="/icons/notepad16.png"
          menuItems={fileMenu}
          variant="notepad"
          accent={{ from: "#b3135a", to: "#ff7eb9" }}
          onClose={() => closeWindow("about")}
          onFocus={() => focusWindow("about")}
          zIndex={getZ("about")}
          initialPosition={{ x: 80, y: 60 }}
        >
          <AboutContent language={language} />
        </Window>
      )}

      {isOpen("checklist") && (
        <Window
          title="Check List - Notes"
          variant="postit"
          onClose={() => closeWindow("checklist")}
          onFocus={() => focusWindow("checklist")}
          zIndex={getZ("checklist")}
          initialPosition={{ x: 460, y: 100 }}
        >
          <ChecklistContent language={language} />
        </Window>
      )}

      {isOpen("portfolio") && (
        <Window
          title={language === "pt" ? "Portfólio" : "Portfolio"}
          iconSrc="/icons/folder16.png"
          accent={{ from: "#0d6e6e", to: "#4fc4c4" }}
          onClose={() => closeWindow("portfolio")}
          onFocus={() => focusWindow("portfolio")}
          zIndex={getZ("portfolio")}
          initialPosition={{ x: 200, y: 150 }}
        >
          <p style={{ padding: 8 }}>
            {language === "pt" ? "Em construção..." : "Under construction..."}
          </p>
        </Window>
      )}

      {isOpen("contact") && (
        <Window
          title={language === "pt" ? "Contato" : "Contact"}
          iconSrc="/icons/computer16.png"
          accent={{ from: "#c75b00", to: "#ff9e57" }}
          onClose={() => closeWindow("contact")}
          onFocus={() => focusWindow("contact")}
          zIndex={getZ("contact")}
          initialPosition={{ x: 250, y: 120 }}
        >
          <p style={{ padding: 8 }}>
            {language === "pt" ? "Em construção..." : "Under construction..."}
          </p>
        </Window>
      )}

      <StartMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectApp={(id) => openWindow(id as WindowId)}
        onShutDown={() => setScreen("off")}
        language={language}
      />

      <Taskbar
        menuOpen={menuOpen}
        windowOpen={openWindows.size > 0}
        toggleMenu={() => setMenuOpen((o) => !o)}
        language={language}
        setLanguage={setLanguage}
      />
      </div>
    </div>
  );
}
