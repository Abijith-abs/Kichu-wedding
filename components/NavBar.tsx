"use client";

import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "#hero",       label: "Home" },
  { href: "#countdown",  label: "Countdown" },
  { href: "#story",      label: "Our Story" },
  { href: "#venue",      label: "Venue" },
  { href: "#events",     label: "Ceremonies" },
  { href: "#itinerary",  label: "Schedule" },
  { href: "#gallery",    label: "Gallery" },
  { href: "#rsvp",       label: "RSVP" },
];

interface NavBarProps {
  visible: boolean;
}

export default function NavBar({ visible }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`navbar ${visible ? "visible" : ""}`}
        style={{ boxShadow: scrolled ? "0 4px 24px rgba(122,31,43,0.08)" : "none" }}
      >
        <a href="#hero" className="nav-brand" onClick={() => handleNavClick("#hero")}>
          {WEDDING.bride.nickname} &amp; {WEDDING.groom.name}
        </a>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle mobile menu"
        >
          <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : undefined }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : undefined }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
          >
            {item.label}
          </a>
        ))}
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "1.8rem",
          color: "var(--maroon)",
          marginTop: "1rem",
          opacity: 0.6,
        }}>
          {WEDDING.hashtag}
        </p>
      </div>
    </>
  );
}
