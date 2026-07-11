"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <footer id="footer" className="footer-section" ref={sectionRef}>
      {/* Top — couple name + hashtag */}
      <div className="footer-top reveal">
        <span className="footer-couple-name">
          {WEDDING.bride.nickname} &amp; {WEDDING.groom.name}
        </span>
        <div className="footer-divider">
          <div className="footer-divider-line" />
          <span className="footer-heart">♥</span>
          <div className="footer-divider-line" />
        </div>
        <span className="footer-hashtag">{WEDDING.hashtag}</span>
      </div>

      {/* Families */}
      <div className="footer-grid">
        <div className="reveal">
          <span className="footer-family-heading">{WEDDING.bride.familyLabel}</span>
          <ul className="footer-family-list">
            <li>{WEDDING.bride.father} &amp; {WEDDING.bride.mother}</li>
          </ul>
        </div>

        <div className="reveal reveal-delay-2">
          <span className="footer-family-heading">{WEDDING.groom.familyLabel}</span>
          <ul className="footer-family-list">
            <li>{WEDDING.groom.father}</li>
            <li>{WEDDING.groom.mother}</li>
          </ul>
        </div>

        <div className="footer-endnote reveal">
          <p>
            12–14th February 2027 · Fri–Sun
            <br />
            {WEDDING.venue.name}, {WEDDING.venue.address}
          </p>

          {/* Decorative Om */}
          <div style={{
            marginTop: "2rem",
            fontFamily: "'Great Vibes',cursive",
            fontSize: "2rem",
            color: "var(--gold-light)",
            opacity: 0.4,
          }}>
            ॐ
          </div>

          <p style={{
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginTop: "1.5rem",
          }}>
            Made with love · {WEDDING.hashtag}
          </p>
        </div>
      </div>

      {/* Instagram handle */}
      {WEDDING.instagramHandle !== "@yourhandle" && (
        <a
          href={`https://instagram.com/${WEDDING.instagramHandle.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "2rem",
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
          }}
        >
          {WEDDING.instagramHandle}
        </a>
      )}
    </footer>
  );
}
