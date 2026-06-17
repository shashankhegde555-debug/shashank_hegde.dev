import React, { useEffect, useRef } from 'react';

const focusAreas = [
  "Neural Audio Processing",
  "Embedded Firmware Systems",
  "Agentic LLM Workflows",
  "Low-Latency C++ Architecture",
  "Full-Stack API Design",
];

const skillCategories = [
  {
    category: "ML / AI",
    badges: ["PyTorch", "FastAPI", "LLM API Orchestration", "Agentic Workflows", "RNNoise", "TensorFlow", "Scikit-Learn"]
  },
  {
    category: "Languages",
    badges: ["Python", "C++", "JavaScript", "TypeScript", "Java", "SQL", "Bash"]
  },
  {
    category: "Systems & DevOps",
    badges: ["Android NDK / JNI", "Google Oboe (C++)", "ESP32-C3 Firmware", "Git / GitHub", "Docker", "Linux Systems", "Android Profiler"]
  },
  {
    category: "Frontend",
    badges: ["React.js", "HTML5 / CSS3", "Tailwind CSS", "Framer Motion", "Vite", "Responsive UI Design"]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const badgesRef = useRef([]);

  useEffect(() => {
    // Heading + eyebrow entrance via IntersectionObserver
    const heading = headingRef.current;
    const eyebrow = eyebrowRef.current;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skills-heading-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heading) revealObserver.observe(heading);
    if (eyebrow) revealObserver.observe(eyebrow);

    // Badge stagger entrance
    const badges = badgesRef.current.filter(Boolean);
    const badgeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            badges.forEach((badge, i) => {
              setTimeout(() => {
                badge.classList.add('badge-visible');
              }, i * 30);
            });
            badgeObserver.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) badgeObserver.observe(sectionRef.current);

    return () => {
      revealObserver.disconnect();
      badgeObserver.disconnect();
    };
  }, []);

  let badgeIndex = 0;

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header skills-section-header">
          <p className="eyebrow skills-eyebrow" ref={eyebrowRef}>TECHNICAL STACK</p>
          <h2 className="skills-heading" ref={headingRef}>Capabilities</h2>
        </div>

        <div className="skills-two-col">
          {/* LEFT: Focus Areas list */}
          <div className="focus-areas-col">
            <p className="col-label">FOCUS AREAS</p>
            <ul className="focus-list">
              {focusAreas.map((area, i) => (
                <li key={i} className="focus-item">
                  <span className="focus-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="focus-name">{area}</span>
                  <span className="focus-arrow" aria-hidden="true">→</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Tools & Frameworks */}
          <div className="skills-cloud-container">
            <p className="col-label">TOOLS &amp; FRAMEWORKS</p>
            <div className="skill-categories">
              {skillCategories.map((cat) => (
                <div key={cat.category} className="skill-category-group">
                  <h4>{cat.category}</h4>
                  <div className="badge-cloud">
                    {cat.badges.map((badge) => {
                      const currentIndex = badgeIndex++;
                      return (
                        <span
                          key={badge}
                          className="skill-badge"
                          ref={(el) => { badgesRef.current[currentIndex] = el; }}
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
