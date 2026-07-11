"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

const CIRCUMFERENCE = 2 * Math.PI * 32; // r=32

function getRingOffset(value: number, max: number) {
  const progress = max > 0 ? 1 - value / max : 0;
  return CIRCUMFERENCE * progress;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [married, setMarried] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date(WEDDING.weddingDate.iso).getTime();

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setMarried(true);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const units = [
    { label: "Days",  value: timeLeft.d, max: 365  },
    { label: "Hours", value: timeLeft.h, max: 24   },
    { label: "Mins",  value: timeLeft.m, max: 60   },
    { label: "Secs",  value: timeLeft.s, max: 60   },
  ];

  return (
    <section id="countdown" className="countdown-section" ref={sectionRef}>
      <div className="countdown-card reveal">
        <span className="section-label">The Big Day</span>

        {married ? (
          <p className="section-heading text-maroon" style={{ marginTop: "1rem" }}>
            They&apos;re Married! 🎉
          </p>
        ) : (
          <>
            <p className="countdown-quote">
              The most auspicious moment — under the divine Muhurtham
            </p>
            <p className="countdown-date">{WEDDING.weddingDate.muhurthamDisplay}</p>

            <div className="countdown-grid">
              {units.map(({ label, value, max }) => (
                <div className="countdown-unit" key={label}>
                  <div className="countdown-ring-wrapper">
                    <svg className="countdown-ring-svg" viewBox="0 0 72 72">
                      <circle className="countdown-ring-bg" cx="36" cy="36" r="32" />
                      <circle
                        className="countdown-ring-fg"
                        cx="36"
                        cy="36"
                        r="32"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={getRingOffset(value, max)}
                      />
                    </svg>
                    <div className="countdown-number">
                      {String(value).padStart(2, "0")}
                    </div>
                  </div>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
