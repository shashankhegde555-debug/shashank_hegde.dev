export const projects = [
  {
    number: "01",
    title: "VoiceCast Studio",
    focus: "Real-Time Neural Noise Suppression Engine",
    description:
      "Engineered a real-time mobile audio isolation system using Android NDK. Integrated Google Oboe to bypass standard audio layers and minimize latency. Implemented RNNoise for speech isolation.",
    tags: ["Android NDK", "C++", "Google Oboe", "RNNoise"],
    image: "/project1.png",
  },
  {
    number: "02",
    title: "The Sleeper Platform",
    focus: "Hardware Prototyping & Firmware Engineering",
    description:
      "Designed a hardware system hidden inside a calculator chassis. Integrated ESP32-C3 with a 0.96-inch I2C OLED and LiPo power circuitry. Authored custom embedded C++ firmware for multi-state UIs.",
    tags: ["ESP32-C3", "Embedded C++", "I2C", "OLED"],
    image: "/project2.png",
  },
  {
    number: "03",
    title: "Android Native Systems",
    focus: "JNI Bridge & Low-Latency Services",
    description:
      "Designed a robust Java Native Interface (JNI) bridge between UI and C++ engine. Implemented Foreground Services and Audio Focus lifecycle listeners for persistent background processing.",
    tags: ["Android NDK", "JNI", "Foreground Services", "Audio Focus"],
    image: "/project3.png",
  },
  {
    number: "04",
    title: "Full-Stack Ecosystem",
    focus: "API Integration & Gamified Systems",
    description:
      "Built a Spotify application clone driven by reverse-engineered media APIs. Engineered a Study Planner with gamification mechanics via FastAPI and Node.js.",
    tags: ["React", "FastAPI", "Node.js", "REST APIs"],
    image: "/project4.png",
  },
];

export const skillColumns = [
  {
    title: "Languages & Core",
    items: ["Python", "JavaScript / TypeScript", "C++", "Java", "HTML5 / CSS3"],
  },
  {
    title: "Backend & AI",
    items: ["FastAPI", "Node.js / Express", "LLM API Orchestration", "Agentic Workflows", "REST API Design"],
  },
  {
    title: "Systems & Android",
    items: ["Android NDK / JNI", "Google Oboe (C++)", "Foreground Services", "Audio Focus", "Android Profiler"],
  },
];

export const skillBars = [
  { name: "Machine Learning", level: 90 },
  { name: "Python / PyTorch", level: 92 },
  { name: "Systems Programming", level: 78 },
  { name: "React / Frontend", level: 75 },
  { name: "Android NDK / C++", level: 85 },
  { name: "LLM & Agentic AI", level: 82 },
];

export const techBadges = [
  { name: "Python", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "PyTorch", category: "ML/AI" },
  { name: "LLMs", category: "ML/AI" },
  { name: "Agentic AI", category: "ML/AI" },
  { name: "FastAPI", category: "ML/AI" },
  { name: "Android NDK", category: "Systems" },
  { name: "JNI", category: "Systems" },
  { name: "Google Oboe", category: "Systems" },
  { name: "ESP32-C3", category: "Systems" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Frontend" },
  { name: "REST APIs", category: "Frontend" },
  { name: "Docker", category: "DevOps/Infra" },
  { name: "Git", category: "DevOps/Infra" },
  { name: "Embedded C++", category: "DevOps/Infra" },
  { name: "I2C / SPI", category: "DevOps/Infra" },
];

export const badgeCategories = ["ML/AI", "Languages", "Systems", "Frontend", "DevOps/Infra"];

export const marqueeText =
  "Python · TypeScript · C++ · React · Android NDK · JNI · Foreground Services · Audio Focus · Android Studio Profiler · ESP32-C3 · Embedded C++ · LLM APIs · FastAPI · Node.js ·";

export const experiences = [
  {
    role: "AI/ML Engineer",
    company: "Freelance / Open Source",
    period: "Jan 2024 – Present",
    description:
      "Building full-stack AI systems spanning LLM API orchestration, agentic workflows, and low-level Android NDK audio engines. Bridging high-level AI frameworks with systems programming.",
    tags: ["PyTorch", "LLMs", "Android NDK", "FastAPI"],
  },
  {
    role: "B.E. AI & Machine Learning",
    company: "JSS Academy of Technical Education, Bengaluru",
    period: "2024 – 2028",
    description:
      "Pursuing undergraduate degree in Artificial Intelligence and Machine Learning. Focusing on deep learning, embedded systems, and full-stack development.",
    tags: ["Deep Learning", "Embedded Systems", "Full-Stack"],
  },
];