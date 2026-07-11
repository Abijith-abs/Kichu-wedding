"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";

function OrnamentDivider() {
  return (
    <div className="ornament mt-4">
      <div className="ornament-line rev" />
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
      <div className="ornament-line" />
    </div>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.12 }
    );
    el.querySelectorAll(".reveal").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" className="story-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">Every Love Has a Story</span>
        <h2 className="section-heading text-maroon">Our<br />Journey</h2>
        <OrnamentDivider />
      </div>

      <div className="timeline">
        {WEDDING.story.map((item, i) => (
          <div className="timeline-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="timeline-dot">{item.icon}</div>
            <p className="timeline-year">{item.year}</p>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
