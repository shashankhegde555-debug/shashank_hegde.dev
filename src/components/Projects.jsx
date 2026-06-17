import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    number: "01",
    title: "VoiceCast Studio",
    focus: "Real-Time Neural Noise Suppression Engine",
    description:
      "Engineered a real-time mobile audio isolation system using Android NDK. Integrated Google Oboe to bypass standard audio layers and minimize latency. Implemented RNNoise for speech isolation.",
    tags: ["Android NDK", "C++", "Google Oboe", "RNNoise"],
    image: "/project1.webp",
  },
  {
    number: "02",
    title: "The Sleeper Platform",
    focus: "Hardware Prototyping & Firmware Engineering",
    description:
      "Designed a hardware system hidden inside a calculator chassis. Integrated ESP32-C3 with a 0.96-inch I2C OLED and LiPo power circuitry. Authored custom embedded C++ firmware for multi-state UIs.",
    tags: ["ESP32-C3", "Embedded C++", "I2C", "OLED"],
    image: "/project2.webp",
  },
  {
    number: "03",
    title: "Android Native Systems",
    focus: "JNI Bridge & Low-Latency Services",
    description:
      "Designed a robust Java Native Interface (JNI) bridge between UI and C++ engine. Implemented Foreground Services and Audio Focus lifecycle listeners for persistent background processing.",
    tags: ["Android NDK", "JNI", "Foreground Services", "Audio Focus"],
    image: "/project3.webp",
  },
  {
    number: "04",
    title: "Full-Stack Ecosystem",
    focus: "API Integration & Gamified Systems",
    description:
      "Built a Spotify application clone driven by reverse-engineered media APIs. Engineered a Study Planner with gamification mechanics via FastAPI and Node.js.",
    tags: ["React", "FastAPI", "Node.js", "REST APIs"],
    image: "/project4.webp",
  },
];

export default function Projects() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <section className="work section-white" id="work">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="eyebrow">SELECTED WORK</p>
          <h2>Projects</h2>
        </div>
        <div className="project-grid reveal-stagger">
          {projects.map((project) => {
            const cardContent = (
              <div className="project-visual">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-bg-image"
                    loading="lazy"
                  />
                )}
                <div className="project-visual-overlay" />
                <span className="project-number">{project.number}</span>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tags project-tags-dark">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );

            return (
              <article className="project-card reveal" key={project.number}>
                {isTouchDevice ? (
                  <div className="tilt-element">
                    {cardContent}
                  </div>
                ) : (
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    glareEnable={true}
                    glareMaxOpacity={0.08}
                    glareColor="#ffffff"
                    glarePosition="all"
                    scale={1.02}
                    transitionSpeed={400}
                    className="tilt-element"
                  >
                    {cardContent}
                  </Tilt>
                )}
                <div className="project-copy">
                  <p className="project-focus">{project.focus}</p>
                  <p className="project-description">{project.description}</p>
                  <a href="#contact" className="ghost-link">
                    VIEW DETAILS <span>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
