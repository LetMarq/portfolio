/**
 * Traduções em português.
 *
 * Este arquivo é a FONTE DA VERDADE: o tipo `Translations` (em ./types.ts) é
 * derivado dele. Adicionar uma chave aqui faz o TypeScript exigir a mesma
 * chave em todos os outros idiomas.
 *
 * Nomes próprios (React, TypeScript, LinkedIn, GitHub, Unicamp...) não entram
 * aqui porque não mudam de idioma.
 */
export const pt = {
  boot: {
    starting: "Iniciando...",
  },

  login: {
    passwordPlaceholder: "Senha",
    logIn: "Entrar",
    hint: "Digite qualquer senha e pressione →",
  },

  taskbar: {
    start: "Iniciar",
    switchToPt: "Português",
    switchToEn: "Inglês",
  },

  /** Nome de cada "programa": usado no ícone da área de trabalho e na janela. */
  apps: {
    about: "sobre_mim",
    checklist: "Check List",
    portfolio: "Portfólio",
    contact: "Contato",
    skills: "Tecnologias",
    island: "Ilha Procedural",
    cleaning: "Escala de Faxina",
    recycleBin: "Lixeira",
  },

  /** Só para as janelas cujo título difere do nome do programa. */
  windowTitles: {
    about: "sobre_mim - Notepad",
    checklist: "Check List - Notes",
  },

  startMenu: {
    /** No menu Iniciar o item aparece como "Sobre", não como "sobre_mim". */
    about: "Sobre",
    shutDown: "Desligar...",
  },

  about: {
    greeting: "Oi, eu sou a Letícia Marques.",
    passion:
      "Sou uma desenvolvedora apaixonada por criar experiências únicas na web.",
    masters: "Atualmente faço mestrado na Unicamp, voltado a jogos na educação.",
    technologiesHeading: "Tecnologias",
    downloadCv: "Baixar meu currículo",
  },

  checklist: {
    items: [
      "Terminar o portfólio.",
      "Viajar pelo mundo.",
      "Aprender a fazer café.",
    ],
  },

  portfolio: {
    underConstruction: "Em construção...",
  },

  contact: {
    send: "Enviar",
    to: "Para:",
    subject: "Assunto:",
    bodyPlaceholder: "Escreva sua mensagem...",
    findMe: "Ou me ache em:",
  },

  island: {
    seed: "Seed",
    newIsland: "Nova ilha",
    hint: "Arraste para girar · scroll para zoom",
  },
};
