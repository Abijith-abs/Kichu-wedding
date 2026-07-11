"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Heavy/client-only components loaded dynamically
const EntryGate    = dynamic(() => import("@/components/EntryGate"),    { ssr: false });
const PetalsCanvas = dynamic(() => import("@/components/PetalsCanvas"), { ssr: false });
const AudioToggle  = dynamic(() => import("@/components/AudioToggle"),  { ssr: false });

import NavBar          from "@/components/NavBar";
import HeroSection     from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection    from "@/components/StorySection";
import MemoriesSection from "@/components/MemoriesSection";
import VenueSection    from "@/components/VenueSection";
import EventsSection   from "@/components/EventsSection";
import ItinerarySection from "@/components/ItinerarySection";
import GallerySection  from "@/components/GallerySection";
import RSVPSection     from "@/components/RSVPSection";
import FooterSection   from "@/components/FooterSection";

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleReveal = () => {
    setRevealed(true);
    // Activate petals
    const canvas = document.getElementById("petals-canvas");
    if (canvas) canvas.classList.add("active");
    // Scroll to top
    window.scrollTo({ top: 0 });
    // Lock scroll to top momentarily for hero animation
    document.body.style.overflow = "auto";
  };

  // Lock scroll until gate is dismissed
  useEffect(() => {
    if (!revealed) {
      document.body.style.overflow = "hidden";
    }
  }, [revealed]);

  // Global scroll-reveal observer for sections added after gate
  useEffect(() => {
    if (!revealed) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [revealed]);

  return (
    <>
      {/* Fixed ambient elements */}
      <PetalsCanvas />
      <AudioToggle visible={revealed} />
      <NavBar visible={revealed} />

      {/* Entry gate overlay */}
      <EntryGate onReveal={handleReveal} />

      {/* Main site content */}
      <div
        ref={mainRef}
        id="main-content"
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
          paddingTop: "var(--nav-height)",
        }}
      >
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <MemoriesSection />
        <VenueSection />
        <EventsSection />
        <ItinerarySection />
        <GallerySection />
        <RSVPSection />
        <FooterSection />
      </div>
    </>
  );
}
