"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

interface EntryGateProps {
  onReveal: () => void;
}

export default function EntryGate({ onReveal }: EntryGateProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const hasVideo = Boolean(WEDDING.media.entryVideoUrl);

  // Pre-gate petal animation on the entry canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const GOLD_COLORS = ["#C9972C", "#E8C568", "#F5E4C0", "rgba(201,151,44,0.6)"];
    const COUNT = window.innerWidth < 600 ? 18 : 36;

    class GatePetal {
      x!: number; y!: number; r!: number;
      vx!: number; vy!: number; rot!: number; drot!: number;
      color!: string; alpha!: number;

      constructor() { this.reset(true); }

      reset(initial: boolean) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -20;
        this.r = 3 + Math.random() * 4;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = 0.4 + Math.random() * 0.9;
        this.rot = Math.random() * Math.PI * 2;
        this.drot = (Math.random() - 0.5) * 0.03;
        this.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
        this.alpha = 0.25 + Math.random() * 0.4;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx + Math.sin(this.y * 0.008) * 0.35;
        this.y += this.vy;
        this.rot += this.drot;
        if (this.y > canvas.height + 20) this.reset(false);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r * 0.5, this.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals: GatePetal[] = [];
    for (let i = 0; i < COUNT; i++) petals.push(new GatePetal());

    let animId: number;
    function loop() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const doReveal = () => {
    if (revealed) return;
    setRevealed(true);
    if (gateRef.current) gateRef.current.classList.add("fade-out");
    setTimeout(() => {
      if (gateRef.current) gateRef.current.style.display = "none";
    }, 1000);
    onReveal();
  };

  const handleClick = async () => {
    if (revealed) return;

    if (hasVideo && videoRef.current && !videoStarted) {
      setVideoStarted(true);
      if (videoRef.current) videoRef.current.classList.add("playing");
      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
      } catch {
        doReveal();
      }
    } else {
      doReveal();
    }
  };

  return (
    <div
      ref={gateRef}
      className="entry-gate"
      onClick={handleClick}
      role="button"
      aria-label="Open wedding invitation"
    >
      {/* Pre-gate golden petal canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Decorative mandala rings */}
      <div className="gate-mandala" style={{ zIndex: 1 }}>
        <svg width="min(90vw, 600px)" height="min(90vw, 600px)" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#C9972C" strokeWidth="0.5" opacity="0.5" />
          <circle cx="300" cy="300" r="240" stroke="#C9972C" strokeWidth="0.3" opacity="0.4" />
          <circle cx="300" cy="300" r="200" stroke="#C9972C" strokeWidth="0.5" opacity="0.35" />
          <circle cx="300" cy="300" r="160" stroke="#E8C568" strokeWidth="0.4" opacity="0.3" />
          {/* Petal ring */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x = 300 + Math.cos(angle) * 260;
            const y = 300 + Math.sin(angle) * 260;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="6"
                ry="14"
                fill="#C9972C"
                opacity="0.25"
                transform={`rotate(${(i / 16) * 360 + 90}, ${x}, ${y})`}
              />
            );
          })}
          {/* Star-like inner pattern */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = 300 + Math.cos(angle) * 60;
            const y1 = 300 + Math.sin(angle) * 60;
            const x2 = 300 + Math.cos(angle) * 180;
            const y2 = 300 + Math.sin(angle) * 180;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#E8C568"
                strokeWidth="0.5"
                opacity="0.4"
              />
            );
          })}
        </svg>
      </div>

      {/* Video layer (hidden until URL provided) */}
      {hasVideo && (
        <video
          ref={videoRef}
          className={`entry-gate-video has-src`}
          playsInline
          preload="auto"
          muted
          onEnded={doReveal}
          onError={doReveal}
          style={{ zIndex: 2 }}
        >
          <source src={WEDDING.media.entryVideoUrl} type="video/mp4" />
        </video>
      )}

      {/* Inner content */}
      <div className={`gate-inner ${videoStarted ? "hidden" : ""}`} style={{ zIndex: 3 }}>
        {/* Decorative top corners */}
        <div style={{
          position: "absolute", top: "1.5rem", left: "1.5rem", right: "1.5rem",
          display: "flex", justifyContent: "space-between", pointerEvents: "none",
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 38 L2 2 L38 2" stroke="rgba(232,197,104,0.4)" strokeWidth="1.5" />
          </svg>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M38 38 L38 2 L2 2" stroke="rgba(232,197,104,0.4)" strokeWidth="1.5" />
          </svg>
        </div>

        <span className="gate-om">ॐ</span>

        <div className="gate-names">
          {WEDDING.bride.nickname}
          <span style={{ display: "block", fontSize: "0.45em", fontFamily: "'Tenor Sans',sans-serif", letterSpacing: "0.3em", opacity: 0.6, margin: "0.2em 0" }}>
            &amp;
          </span>
          {WEDDING.groom.name}
        </div>

        <p className="gate-sub">You&apos;re Invited</p>
        <p className="gate-date">{WEDDING.weddingDate.display} · {WEDDING.weddingDate.day}</p>

        <div className="gate-tap">
          <span>✦</span>
          <span>{hasVideo ? "Tap to Play" : "Open Invitation"}</span>
          <span>✦</span>
        </div>

        {/* Bottom corners */}
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem",
          display: "flex", justifyContent: "space-between", pointerEvents: "none",
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 2 L2 38 L38 38" stroke="rgba(232,197,104,0.4)" strokeWidth="1.5" />
          </svg>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M38 2 L38 38 L2 38" stroke="rgba(232,197,104,0.4)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <p className="gate-petal-hint">
        {WEDDING.hashtag}
      </p>
    </div>
  );
}
