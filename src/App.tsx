import { Window } from "./components/Window/Window";
import { Taskbar } from "./components/Taskbar/Taskbar";
import { StartMenu } from "./components/StartMenu/StartMenu";
import { DesktopIcon } from "./components/DesktopIcon/DesktopIcon";
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { BootScreen } from "./components/BootScreen/BootScreen";
import { useState } from "react";
import type { Language } from "./types/types";
import { playStartup, playShutdown, playOpen } from "./sounds";
import { skills } from "./skillsData";
import "./App.css";

type WindowId = "about" | "checklist" | "portfolio" | "contact" | "skills";

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

function AboutContent({ language }: { language: Language }) {
  return (
    <div className="notepad-text">
      <div className="about-section">
        <p>
          {language === "pt"
            ? "Oi, eu sou a Letícia Marques."
            : "Hi, I'm Letícia Marques."}
        </p>

        <p>
          {language === "pt"
            ? "Sou uma desenvolvedora apaixonada por criar experiências únicas na web."
            : "I'm a developer passionate about creating unique experiences on the web."}
        </p>

        <p>
          {language === "pt"
            ? "Atualmente faço mestrado na Unicamp, voltado a jogos na educação."
            : "I'm currently doing a master's at Unicamp, focused on games in education."}
        </p>
      </div>
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

const CONTACT = {
  email: "leticia.marquespinho@gmail.com",
  github: "https://github.com/LetMarq",
  linkedin: "https://www.linkedin.com/in/leticia-marques-pinho",
};

function ContactContent({ language }: { language: Language }) {
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
          {language === "pt" ? "Enviar" : "Send"}
        </button>
      </div>

      <div className="contact-row">
        <span className="contact-label">
          {language === "pt" ? "Para:" : "To:"}
        </span>
        <a className="contact-link" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-label">
          {language === "pt" ? "Assunto:" : "Subject:"}
        </span>
        <input
          className="contact-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <textarea
        className="contact-body"
        placeholder={
          language === "pt"
            ? "Escreva sua mensagem..."
            : "Write your message..."
        }
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="contact-social">
        <span>{language === "pt" ? "Ou me ache em:" : "Or find me on:"}</span>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(
    new Set(["about", "checklist"]),
  );
  const [language, setLanguage] = useState<Language>("pt");

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
      id: "skills" as WindowId,
      src: "/icons/tech.png",
      label: language === "pt" ? "Tecnologias" : "Skills",
    },
    {
      id: "checklist" as WindowId,
      src: "/icons/recycle.png",
      label: language === "pt" ? "Lixeira" : "Recycle Bin",
    },
  ];

  if (screen === "boot") {
    return <BootScreen onDone={() => setScreen("on")} />;
  }

  if (screen === "login") {
    return <LoginScreen language={language} onLogin={handleLogin} />;
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
            initialPosition={{ x: Math.max((viewportW - 320) / 2, 90), y: 70 }}
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
            initialPosition={{ x: Math.max(viewportW - 360, 460), y: 90 }}
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
            <ContactContent language={language} />
          </Window>
        )}

        {isOpen("skills") && (
          <Window
            title={language === "pt" ? "Tecnologias" : "Skills"}
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

        <StartMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSelectApp={(id) => openWindow(id as WindowId)}
          onShutDown={handleShutDown}
          language={language}
        />

        <Taskbar
          menuOpen={menuOpen}
          toggleMenu={() => setMenuOpen((o) => !o)}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
}
