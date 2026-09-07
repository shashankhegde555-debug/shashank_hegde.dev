import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CustomCursor from "./CustomCursor";
import AuroraBackground from "./components/AuroraBackground";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import "./styles.css";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="navbar" data-scrolled={scrolled} data-open={open}>
        <a href="#top" className="nav-logo" onClick={close}>
          SHASHANK S HEGDE
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className="mobile-menu" data-open={open}>
        <a href="#work" onClick={close}>WORK</a>
        <a href="#about" onClick={close}>ABOUT</a>
        <a href="#contact" onClick={close}>CONTACT</a>
      </div>
    </>
  );
}

class ParticleText {
  constructor(canvas, text, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.text = text;
    this.options = options;
    this.particles = [];
    this.mouse = { x: -9999, y: -9999, radius: options.mouseRadius || 120 };
    this.animationId = null;
    this.running = false;
    this.resizeTimer = null;
    this.init();
  }

  init() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = width < 768;
    const lenFactor = Math.max(0.55, 7 / Math.max(this.text.replace(/\s/g, "").length, 1));
    
    // Calculate initial font size
    let fontSize = small
      ? Math.min(Math.max(width * 0.14 * lenFactor, 38), 80)
      : Math.min(width * 0.14 * lenFactor, 190);

    // Create temporary context to measure text width
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `300 ${fontSize}px Inter, sans-serif`;
    const textWidth = tempCtx.measureText(this.text).width;

    // Dynamically scale down font size if it exceeds 85% of screen width
    const maxTextWidth = width * 0.85;
    if (textWidth > maxTextWidth) {
      fontSize = fontSize * (maxTextWidth / textWidth);
    }
    this.fontSize = fontSize;

    this.particleSize = this.options.particleSize || 1.5;
    this.particleGap = small ? 2 : (this.options.particleGap || 3);
    this.spring = this.options.spring || 0.06;
    this.friction = this.options.friction || 0.88;
    this.repelForce = this.options.repelForce || 10;
    this.color = this.options.color || "#ffffff";
    this.mouse.radius = small ? 50 : (this.options.mouseRadius || 120);

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    octx.fillStyle = "#ffffff";
    octx.font = `300 ${this.fontSize}px Inter, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(this.text, width / 2, height / 2);

    const imageData = octx.getImageData(0, 0, width, height);
    this.particles = [];
    for (let y = 0; y < height; y += this.particleGap) {
      for (let x = 0; x < width; x += this.particleGap) {
        const index = (y * width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          this.particles.push({
            originX: x,
            originY: y,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            size: this.particleSize,
          });
        }
      }
    }
  }

  update() {
    this.particles.forEach((p) => {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * this.repelForce;
        p.vy -= Math.sin(angle) * force * this.repelForce;
      }

      p.vx += (p.originX - p.x) * this.spring;
      p.vy += (p.originY - p.y) * this.spring;
      p.vx *= this.friction;
      p.vy *= this.friction;
      p.x += p.vx;
      p.y += p.vy;
    });
  }

  draw() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = this.color;
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate = () => {
    if (!this.running) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.animate();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }

  setMouse(x, y) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  clearMouse() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.stop();
      this.init();
      this.start();
    }, 100);
  }

  destroy() {
    clearTimeout(this.resizeTimer);
    this.stop();
  }
}

function GlobalVideoBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);
  }, []);

  return (
    <div className="site-video-wrapper" aria-hidden="true">
      {isMobile ? (
        <div className="absolute inset-0 bg-[#050505]" style={{ width: '100%', height: '100%' }} />
      ) : (
        <video
          className="site-video-bg"
          src={`${import.meta.env.BASE_URL}bg.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
      {/* Vignette: blends edges + covers Gemini watermark in bottom corners */}
      <div className="video-vignette" />
    </div>
  );
}

function HeroSection() {
  const canvasRef = useRef(null);

  // Fade scroll indicator out after user scrolls past 70% of hero
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero');
      const indicator = document.querySelector('.scroll-indicator');
      if (!hero || !indicator) return;
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const past = scrolled > heroHeight * 0.7;
      indicator.style.opacity = past ? '0' : '1';
      indicator.style.pointerEvents = past ? 'none' : 'auto';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const particleText = new ParticleText(canvas, "SHASHANK HEGDE", {
      particleGap: 3,
      particleSize: 1.5,
      color: "#ffffff",
      mouseRadius: 100,
      spring: 0.06,
      friction: 0.88,
      repelForce: 10,
    });

    particleText.start();

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      particleText.setMouse(event.clientX - rect.left, event.clientY - rect.top);
    };
    const touch = (event) => {
      if (!event.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      particleText.setMouse(event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top);
    };
    const leave = () => particleText.clearMouse();
    const resize = () => particleText.onResize();
    const visibility = () => {
      if (document.hidden) particleText.stop();
      else particleText.start();
    };

    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseleave", leave);
    canvas.addEventListener("touchstart", touch, { passive: true });
    canvas.addEventListener("touchmove", touch, { passive: true });
    canvas.addEventListener("touchend", leave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseleave", leave);
      canvas.removeEventListener("touchstart", touch);
      canvas.removeEventListener("touchmove", touch);
      canvas.removeEventListener("touchend", leave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      particleText.destroy();
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Particle typography hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <p className="hero-subtitle">B.E. AIML — JSSATE-B · BENGALURU</p>
      <svg className="scroll-indicator" viewBox="0 0 100 100" width="80" height="80" aria-hidden="true">
        <defs>
          <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9" fill="#ffffff" fontFamily="system-ui" letterSpacing="3">
          <textPath href="#circle">SCROLL TO EXPLORE · SCROLL TO EXPLORE ·</textPath>
        </text>
      </svg>
      <a href="#contact" className="hero-video-btn" aria-label="Open to collaborate — scroll to contact">
        <video
          src={`${import.meta.env.BASE_URL}hero-btn.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-btn__video"
        />
        <div className="hero-video-btn__vignette" />
      </a>
    </section>
  );
}

function TextHoverEffect({ text, className = "", duration = 0.3 }) {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const uniqueId = React.useId().replace(/:/g, "");
  const vbWidth = Math.max(300, text.length * 58 + 60);

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      setMaskPosition({
        cx: `${((cursor.x - svgRect.left) / svgRect.width) * 100}%`,
        cy: `${((cursor.y - svgRect.top) / svgRect.height) * 100}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      className={`text-hover ${className}`}
      width="100%"
      height="100%"
      viewBox={`0 0 ${vbWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      aria-label={text}
      role="img"
    >
      <defs>
        <linearGradient id={`textGradient-${uniqueId}`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#9a9a9a" />
          <stop offset="100%" stopColor="#636363" />
        </linearGradient>
        <radialGradient id={`revealMask-${uniqueId}`} gradientUnits="userSpaceOnUse" r="40%" cx={maskPosition.cx} cy={maskPosition.cy}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`textMask-${uniqueId}`}>
          <rect
            x="0"
            y="0"
            width={vbWidth}
            height="100"
            fill={`url(#revealMask-${uniqueId})`}
            style={{ transition: `all ${duration}s ease` }}
          />
        </mask>
      </defs>
      <text x="50%" y="72%" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="300" fontSize="88" fill="var(--color-carbon)">
        {text}
      </text>
      <text
        x="50%"
        y="72%"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="300"
        fontSize="88"
        fill="none"
        stroke={`url(#textGradient-${uniqueId})`}
        strokeWidth="0.5"
        opacity={hovered ? 1 : 0}
        style={{ transition: `opacity ${duration}s ease` }}
      >
        {text}
      </text>
      <text
        x="50%"
        y="72%"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="300"
        fontSize="88"
        fill={`url(#textGradient-${uniqueId})`}
        mask={`url(#textMask-${uniqueId})`}
        opacity={hovered ? 1 : 0}
        style={{ transition: `opacity ${duration}s ease` }}
      >
        {text}
      </text>
    </svg>
  );
}

function IntroSection() {
  return (
    <section className="intro section-white">
      <div className="section-container intro-grid">
        <div className="intro-mark reveal">
          <TextHoverEffect text="SSH" />
        </div>
        <div className="intro-copy reveal">
          <h2>
            THIS IS JUST
            <br />
            THE BEGINNING.
          </h2>
          <p>
            A long-term focus on performance,
            <br />
            automation, and intelligent systems.
            <br />
            B.E. in AI & Machine Learning -
            <br />
            bridging high-level frameworks
            <br />
            with low-level system engineering.
          </p>
          <p className="intro-meta">
            Location: Bengaluru, India
            <br />
            Status: Open for Collaboration
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsFrame() {
  return (
    <section className="stats-frame">
      <div className="section-container stats-grid reveal-stagger">
        {[
          ["7+", "Languages", "Mastered"],
          ["4", "Projects", "Shipped"],
          ["2024", "Since", "Year Active"],
        ].map(([value, line1, line2]) => (
          <div className="stat" key={value}>
            <strong>{value}</strong>
            <span>{line1}</span>
            <span>{line2}</span>
          </div>
        ))}
      </div>
      <p className="stats-caption reveal">AIML ENGINEER - SYSTEM DEVELOPER - FIRMWARE AUTHOR</p>
    </section>
  );
}



function ManifestoFrame() {
  return (
    <section className="manifesto">
      <div className="hairline reveal" />
      <h2 className="manifesto-title reveal-stagger">
        <span>IT'S</span> <span>JUST</span>
        <br />
        <span>GETTING</span> <span>STARTED.</span>
      </h2>
      <p className="manifesto-copy reveal">
        This is the beginning of a long-term focus
        <br />
        on performance, automation, and intelligent systems.
        <br />
        The gap between high-level AI frameworks
        <br />
        and low-level system engineering -
        <br />
        that is where I work.
      </p>
      <div className="hairline reveal" />
    </section>
  );
}



function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="section-container about-grid">
        <div className="about-left reveal">
          <p className="about-name-lg">SHASHANK<br />S HEGDE</p>
          <div className="about-stack">
            <span>B.E.</span>
            <span>A I M L</span>
            <span>JSSATE-B</span>
            <span>VTU</span>
          </div>
        </div>
        <div className="about-copy reveal">
          <h2>SHASHANK S HEGDE</h2>
          <p className="about-rule">----------------</p>
          <p className="about-school">
            B.E. in Artificial Intelligence & Machine Learning
            <br />
            JSS Academy of Technical Education, Bangalore
          </p>
          <p>
            I bridge the gap between high-level AI frameworks and low-level system engineering - turning complex algorithms
            into fast, functional software and physical hardware.
          </p>
          <p>From training backend workflows to designing interfaces and writing custom firmware: the full vertical stack.</p>
          <p className="about-meta">
            Bengaluru, India · IST UTC +5:30
            <br />
            Open for Innovation & Core Engineering Collaborations
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section-white" id="contact">
      <p className="eyebrow reveal">LET'S BUILD</p>
      <div className="contact-word reveal">
        <TextHoverEffect text="CONNECT" />
      </div>
      <div className="contact-links reveal">
        <a href="mailto:shashankhegde555@gmail.com">shashankhegde555@gmail.com</a>
        <a href="https://github.com/shashankhegde555-debug" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/shashank-s-hegde-290029393" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <span className="contact-status reveal">OPEN TO COLLABORATE</span>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>SHASHANK S HEGDE · BENGALURU</span>
      <span>© 2026 · AIML · </span>
    </footer>
  );
}

function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [bootText, setBootText] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  const consoleLines = [
    "CONNECTING TO PORTFOLIO_SERVER...",
    "LOADING ML MODELS & NEURAL WORKFLOWS...",
    "INITIALIZING LOW-LEVEL SYSTEM ENGINES...",
    "SYSTEM STATUS: ACTIVE"
  ];

  useEffect(() => {
    // Scroll lock when preloader mounts
    document.body.classList.add("preloader-active");

    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < consoleLines.length) {
        setBootText((prev) => [...prev, consoleLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(interval);
        // Step 1: Transition to Greeting Reveal
        const greetingTimer = setTimeout(() => {
          setStep(1);
        }, 300);
        return () => clearTimeout(greetingTimer);
      }
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (step === 1) {
      // Step 2: Show greeting for 1.4s, then start exit animation
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        // Remove scroll lock slightly before completely unmounting
        document.body.classList.remove("preloader-active");
        
        // Step 3: Wait for CSS transition (0.8s) before unmounting
        const unmountTimer = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(unmountTimer);
      }, 1400);
      return () => clearTimeout(exitTimer);
    }
  }, [step, onComplete]);

  return (
    <div className={`preloader-overlay ${isExiting ? "preloader-exit" : ""}`} aria-live="polite">
      <div className="preloader-bg-noise" />
      <div className="preloader-glow" />

      {step === 0 && (
        <div className="preloader-console">
          {bootText.map((line, i) => (
            <div key={i} className="console-line">
              <span className="console-prompt">&gt;</span> {line}
            </div>
          ))}
          <div className="console-cursor" />
        </div>
      )}

      {step === 1 && (
        <div className="preloader-welcome">
          <div className="welcome-tagline">SHASHANK S HEGDE</div>
          <h1 className="welcome-title">
            <span className="welcome-word">WELCOME</span>
            <span className="welcome-word">TO</span>
            <span className="welcome-word">MY</span>
            <span className="welcome-word">PLAYGROUND</span>
          </h1>
          <div className="welcome-line" />
        </div>
      )}
    </div>
  );
}

function App() {
  useReveal();
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}
      <CustomCursor />
      <GlobalVideoBackground />
      <AuroraBackground />
      <NavBar />
      <main>
        <HeroSection />
        <IntroSection />
        <StatsFrame />
        <Projects />
        <Experience />
        <ManifestoFrame />
        <Skills />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
