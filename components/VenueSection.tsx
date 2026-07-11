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

export default function VenueSection() {
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
    <section id="venue" className="venue-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">Where Love Awaits</span>
        <h2 className="section-heading text-maroon">Our Cherished<br />Venue</h2>
        <OrnamentDivider />
      </div>

      <div className="venue-card reveal reveal-delay-2">
        <div className="venue-img-ph">
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "2rem" }}>🏛️</span>
            <span>Venue Photo Placeholder</span>
          </span>
        </div>

        <div className="venue-info">
          <h3 className="venue-name">{WEDDING.venue.name}</h3>
          <p className="venue-address">{WEDDING.venue.address}</p>

          <iframe
            className="venue-map"
            src={WEDDING.venue.mapsEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue location map"
          />
          <br />
          <a
            className="directions-btn"
            href={WEDDING.venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
