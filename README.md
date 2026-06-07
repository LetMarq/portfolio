# Portfolio

A personal portfolio built as an interactive Windows 98 style desktop. You can open and drag windows, browse a working Start menu, switch between Portuguese and English, and explore each section like a retro operating system.

## Features

- Desktop with double click icons that open application windows
- Draggable windows with focus handling, so clicking a window brings it to the front
- Each window has its own accent color
- Authentic Windows 98 style Start menu with a side banner
- Taskbar with a live clock
- Language switch between Portuguese (BR) and English (AU) that updates the whole interface

## Libraries and tools

- **React 19** (`react`, `react-dom`): builds the interface and manages the desktop, windows and menu state.
- **TypeScript**: typing across all components.
- **Vite 8** (`vite`, `@vitejs/plugin-react`): development server and production build.
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss`): utility classes for layout and styling, integrated through the Vite plugin.
- **PostCSS** and **Autoprefixer**: CSS processing and vendor prefixing.
- **ESLint 9** (`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint`): linting and code consistency.

### Assets

- **w95fa**: a Windows 95/98 style pixel font used across the interface.
- Icon set sourced from the **react95** icon collection (stored as static images in `public/icons`).

## Getting started

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually `http://localhost:5173`).

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

## Author

Made by Letícia Marques.
