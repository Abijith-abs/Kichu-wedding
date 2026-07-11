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

export default function MemoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasVideo = Boolean(WEDDING.media.memoriesVideoUrl);

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
    <section id="memories" className="memories-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">A Glimpse of Us</span>
        <h2 className="section-heading text-maroon">Our Beautiful<br />Moments</h2>
        <OrnamentDivider />
      </div>

      <div className="memories-frame reveal reveal-delay-2">
        <div className="memories-inner">
          {hasVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", display: "block" }}
            >
              <source src={WEDDING.media.memoriesVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="placeholder-media">
              <div className="ph-icon">🎬</div>
              <div className="ph-label">Add your highlight video here</div>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "var(--text-mid)",
                marginTop: "0.5rem",
                maxWidth: "200px",
                lineHeight: 1.5,
              }}>
                Set <code style={{ fontSize: "0.75rem" }}>media.memoriesVideoUrl</code> in <code style={{ fontSize: "0.75rem" }}>lib/constants.ts</code>
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="memories-caption reveal reveal-delay-3">
        A moment captured in time, forever in our hearts
      </p>
    </section>
  );
}
