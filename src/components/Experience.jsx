import React, { useEffect, useRef } from 'react';

const experiences = [
  {
    role: "AI/ML Engineer & Systems Developer",
    company: "Core AI Research Lab",
    period: "Jun 2025 – Present",
    description: "Architecting real-time neural speech suppression systems and deploying on low-latency Android JNI wrappers. Building LLM-based agentic workflows and training custom FastAPI backend orchestrators.",
    tags: ["FastAPI", "Android NDK", "PyTorch", "LLM APIs", "Agentic Workflows"]
  },
  {
    role: "Embedded Firmware Engineer",
    company: "IoT & Hardware Prototyping Group",
    period: "Nov 2024 – Apr 2025",
    description: "Designed multi-state firmware interfaces for custom OLED devices using ESP32-C3 controllers. Wrote low-level C++ libraries for I2C and hardware serial interfaces.",
    tags: ["ESP32-C3", "Embedded C++", "I2C", "OLED Hardware"]
  },
  {
    role: "Open Source Contributor & Systems Researcher",
    company: "Systems Laboratory",
    period: "Jan 2024 – Oct 2024",
    description: "Developed native Java Native Interface (JNI) bridge patterns linking Java Android audio services directly with low-latency native audio libraries.",
    tags: ["JNI / NDK", "Google Oboe", "C++", "Audio Focus API"]
  }
];

const ROW_DELAYS = [0, 120, 240];

export default function Experience() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => {
                row.classList.add('exp-row-visible');
              }, ROW_DELAYS[i] ?? i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow">MY JOURNEY</p>
          <h2 className="exp-section-heading">Experience</h2>
        </div>

        <div className="exp-table">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="exp-row"
              ref={(el) => { rowRefs.current[idx] = el; }}
            >
              <div className="exp-date">{exp.period}</div>
              <div className="exp-role">
                <span className="exp-role-title">{exp.role}</span>
                <span className="exp-company">{exp.company}</span>
              </div>
              <div className="exp-body">
                <p className="exp-desc">{exp.description}</p>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
