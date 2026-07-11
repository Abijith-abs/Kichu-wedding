"use client";

import { WEDDING } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-deco" />
      <div className="hero-frame"><span /></div>

      <div className="hero-card">
        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        <div className="om-icon">ॐ</div>

        <p className="blessings-label">
          With the blessings of the Almighty &amp; our elders
        </p>

        <p className="blessings-text">
          We joyfully invite you to celebrate the sacred union of
        </p>

        {/* Bride */}
        <div className="couple-block">
          <span className="couple-name shimmer-gold">{WEDDING.bride.name}</span>
          <div className="couple-nick">
            &ldquo;{WEDDING.bride.nickname}&rdquo; · Nakshatram: {WEDDING.bride.nakshatram} · Rashi: {WEDDING.bride.rashi}
          </div>
          <p className="family-line">
            Daughter of {WEDDING.bride.father} &amp; {WEDDING.bride.mother}
          </p>
        </div>

        <div className="ampersand-wrap">
          <div className="ampersand-line" />
          <span className="ampersand">&amp;</span>
          <div className="ampersand-line" />
        </div>

        {/* Groom */}
        <div className="couple-block">
          <span className="couple-name shimmer-gold">{WEDDING.groom.name}</span>
          <div className="couple-nick">
            Nakshatram: {WEDDING.groom.nakshatram} · Rashi: {WEDDING.groom.rashi}
          </div>
          <p className="family-line">
            Son of {WEDDING.groom.father} &amp; {WEDDING.groom.mother}
          </p>
        </div>

        {/* Wedding date pill */}
        <div style={{
          marginTop: "2rem",
          padding: "0.75rem 1.75rem",
          background: "var(--cream-2)",
          border: "1px solid var(--border)",
          borderRadius: "9999px",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
        }}>
          <span style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}>
            {WEDDING.weddingDate.day}
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "var(--maroon)",
          }}>
            {WEDDING.weddingDate.display}
          </span>
          <span style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            color: "var(--text-light)",
          }}>
            {WEDDING.venue.name}
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <p>Scroll</p>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
