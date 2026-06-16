# Shashank Hegde — Professional Developer Portfolio

[![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38b2ac?style=flat-square&logo=tailwind-css&logoColor=fff)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055ff?style=flat-square&logo=framer&logoColor=fff)](https://www.framer.com/motion/)

A premium, highly interactive portfolio website showcasing projects, skills, and background. The site combines modern, dark-themed aesthetics with hardware-accelerated interactive web physics.

---

## 🌟 Core Features

-   **Interactive Particle Typography:** A custom HTML5 Canvas particle system tracking user mouse movements with spring physics for the hero title.
-   **Terminal Console Preloader:** A retro-futuristic terminal boot sequence that displays real-time loading updates before resolving into the main page.
-   **Glassmorphic Custom Cursor:** An ultra-smooth, physics-based follower ring (`stiffness: 350`, `damping: 20`, `mass: 0.1`) using `backdrop-filter: invert(1)` to dynamically invert colors over text and video assets.
-   **Aesthetic Project Showcase:** Dynamic hover cards featuring tailored dark-themed abstract technology graphics.
-   **Fully Responsive:** Optimized performance and layouts across fine-pointer desktop displays and touch-based mobile viewports.

---

## 🛠️ Tech Stack

-   **Core:** React (Functional Components, Hooks)
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS (utility classes) & Custom Vanilla CSS (fluid layouts and typographic rules)
-   **Animations & Physics:** Framer Motion (spring trajectories, opacity fades, layout transitions)

---

## 📁 Project Structure

```text
├── public/                 # Static assets (videos, project images)
│   ├── bg.mp4              # Background video loops
│   ├── project1.png        # Generated project graphics
│   └── ...
├── src/
│   ├── CustomCursor.jsx    # Standalone cursor with backdrop-filter: invert(1)
│   ├── main.jsx            # Main app shell, page sections, and particle engine
│   ├── styles.css          # Global Tailwind declarations and typography layouts
│   └── index.css           # Local stylesheet overrides
├── index.html              # HTML Entry Point
├── vite.config.js          # Vite configuration with React integration
└── package.json            # Node project configuration
```

---

## 🚀 Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Clone the repository
```bash
git clone https://github.com/shashankhegde555-debug/shashank_hegde.dev.git
cd shashank_hegde.dev
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run local development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
