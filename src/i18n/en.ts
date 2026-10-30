import type { Translations } from "./types";

/**
 * Traduções em inglês.
 *
 * A anotação `: Translations` é o "fiscal": se faltar uma chave que existe no
 * pt.ts, o VSCode sublinha e o `npm run build` falha, em vez de aparecer
 * `undefined` na tela.
 */
export const en: Translations = {
  boot: {
    starting: "Starting...",
  },

  login: {
    passwordPlaceholder: "Password",
    logIn: "Log in",
    hint: "Type any password and press →",
  },

  taskbar: {
    start: "Start",
    switchToPt: "Portuguese",
    switchToEn: "English",
  },

  apps: {
    about: "about_me",
    checklist: "Check List",
    portfolio: "Portfolio",
    contact: "Contact",
    skills: "Skills",
    island: "Procedural Island",
    cleaning: "House Cleaning",
    recycleBin: "Recycle Bin",
  },

  windowTitles: {
    about: "about_me - Notepad",
    checklist: "Check List - Notes",
  },

  startMenu: {
    about: "About",
    shutDown: "Shut Down...",
  },

  about: {
    greeting: "Hi, I'm Letícia Marques.",
    passion:
      "I'm a developer passionate about creating unique experiences on the web.",
    masters:
      "I'm currently doing a master's at Unicamp, focused on games in education.",
    technologiesHeading: "Technologies",
    downloadCv: "Download my resume",
  },

  checklist: {
    items: [
      "Finish the portfolio.",
      "Travel the world.",
      "Learn how to make coffee.",
    ],
  },

  portfolio: {
    underConstruction: "Under construction...",
  },

  contact: {
    send: "Send",
    to: "To:",
    subject: "Subject:",
    bodyPlaceholder: "Write your message...",
    findMe: "Or find me on:",
  },

  island: {
    seed: "Seed",
    newIsland: "New island",
    hint: "Drag to rotate · scroll to zoom",
  },
};
