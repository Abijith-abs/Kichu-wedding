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

export default function EventsSection() {
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
    <section id="events" className="events-section" ref={sectionRef}>
      <div className="events-section-inner">
        <div className="text-center reveal">
          <span className="section-label">The Celebration Unfolds</span>
          <h2 className="section-heading text-maroon">Five Sacred<br />Ceremonies</h2>
          <OrnamentDivider />
        </div>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="events-scroll-wrapper">
        {WEDDING.ceremonies.map((ceremony, i) => (
          <div
            key={ceremony.id}
            className={`event-card reveal ${ceremony.highlighted ? "highlighted" : ""}`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {/* Gradient media placeholder */}
            <div
              className="event-media-ph"
              style={{
                background: `linear-gradient(135deg, ${ceremony.gradientFrom}, ${ceremony.gradientTo})`,
              }}
            >
              <div className="event-ph-icon">{ceremony.icon}</div>
              <div className="event-ph-label">Add ceremony photo/video</div>

              {/* Highlighted badge */}
              {ceremony.highlighted && (
                <div style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  background: "rgba(232,197,104,0.9)",
                  color: "#2B1810",
                  fontFamily: "'Tenor Sans',sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "9999px",
                  fontWeight: 600,
                }}>
                  Main Event
                </div>
              )}
            </div>

            <div className="event-body">
              <div className="event-icon-row">
                <span className="event-icon">{ceremony.icon}</span>
                <span className="event-subtitle">
                  Ceremony {["I","II","III","IV","V"][i]} · {ceremony.date} · {ceremony.time}
                </span>
              </div>

              <h3 className="event-title">{ceremony.title}</h3>

              <p className="event-malayalam mal">
                {ceremony.malayalam} · {ceremony.subtitle}
              </p>

              <p className="event-desc">{ceremony.description}</p>

              <div className="event-meta">
                <span className="event-chip">📍 {ceremony.venue}</span>
              </div>

              <p className="event-dresscode">👗 Dresscode: {ceremony.dresscode}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll hint */}
      <p style={{
        textAlign: "center",
        fontFamily: "'Tenor Sans',sans-serif",
        fontSize: "0.58rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--text-light)",
        marginTop: "0.5rem",
        paddingBottom: "1rem",
      }}
      className="reveal"
      >
        ← Swipe to see all ceremonies →
      </p>
    </section>
  );
}
