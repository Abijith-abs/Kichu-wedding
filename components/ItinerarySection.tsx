"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";

function OrnamentDivider() {
  return (
    <div className="ornament mt-4 mb-8">
      <div className="ornament-line rev" />
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
      <div className="ornament-line" />
    </div>
  );
}

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="itinerary" className="itinerary-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">{WEDDING.weddingDate.display}</span>
        <h2 className="section-heading text-maroon">
          The Wedding<br />Day, Hour by Hour
        </h2>
        <OrnamentDivider />
      </div>

      <div className="itin-list">
        {WEDDING.itinerary.map((item, i) => (
          <div
            key={i}
            className={`itin-row reveal ${item.highlighted ? "highlighted" : ""}`}
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="itin-time">{item.time}</span>
            <span className="itin-icon">{item.icon}</span>
            <div className="itin-content">
              <div className="itin-title">{item.title}</div>
              <div className="itin-desc">{item.description}</div>
              <span className="itin-tag">{item.tag}</span>
            </div>

            {item.highlighted && (
              <div style={{
                flexShrink: 0,
                alignSelf: "center",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--gold)",
                boxShadow: "0 0 8px var(--gold)",
              }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
