"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

const GALLERY_HEIGHTS = [160, 200, 140, 180, 220, 160, 190, 150, 210, 175, 155, 200, 170, 145, 185];
const GALLERY_SHADES = ["#F5E4C0", "#EEE1CE", "#E8C568", "#FDF4E3", "#F0DDB8"];

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

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxIdx(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">Our Photo Album</span>
        <h2 className="section-heading text-maroon">A Few<br />Frames</h2>
        <OrnamentDivider />
        <p style={{
          fontSize: "0.9rem",
          color: "var(--text-light)",
          maxWidth: 400,
          margin: "0 auto",
          fontStyle: "italic",
        }}>
          Replace each placeholder with your own photos once you have them ready.
        </p>
      </div>

      <div className="gallery-grid reveal reveal-delay-2">
        {WEDDING.galleryCaptions.map((caption, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => setLightboxIdx(i)}
            role="button"
            aria-label={`View: ${caption}`}
          >
            <div
              className="gallery-ph"
              style={{
                background: GALLERY_SHADES[i % GALLERY_SHADES.length],
                minHeight: GALLERY_HEIGHTS[i] ?? 160,
              }}
            >
              <span>📷<br />Photo {i + 1}</span>
            </div>
            <div className="gallery-cap">{caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="lightbox-overlay open"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(null); }}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="lightbox-inner">
            <div
              className="lightbox-ph"
              style={{
                background: GALLERY_SHADES[lightboxIdx % GALLERY_SHADES.length],
                minHeight: 300,
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "2.5rem" }}>📷</span>
                <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                  Photo {lightboxIdx + 1} Placeholder
                </span>
              </span>
            </div>
            <p className="lightbox-caption">{WEDDING.galleryCaptions[lightboxIdx]}</p>
          </div>
        </div>
      )}
    </section>
  );
}
