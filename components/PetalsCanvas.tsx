"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";

export default function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const COLORS = [
      WEDDING.colors.gold,
      WEDDING.colors.goldLight,
      WEDDING.colors.maroon,
      WEDDING.colors.maroonLight,
      WEDDING.colors.goldPale,
      WEDDING.colors.border,
    ];

    const COUNT = window.innerWidth < 600 ? 28 : 52;

    class Petal {
      x!: number;
      y!: number;
      r!: number;
      vx!: number;
      vy!: number;
      rot!: number;
      drot!: number;
      color!: string;
      alpha!: number;

      constructor() {
        this.reset(true);
      }

      reset(initial: boolean) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height * 2 - canvas.height : -20;
        this.r = 4 + Math.random() * 5;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = 0.5 + Math.random() * 1.2;
        this.rot = Math.random() * Math.PI * 2;
        this.drot = (Math.random() - 0.5) * 0.04;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 0.45 + Math.random() * 0.45;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.45;
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
        ctx.ellipse(0, 0, this.r * 0.55, this.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals: Petal[] = [];
    for (let i = 0; i < COUNT; i++) petals.push(new Petal());

    let animId: number;
    function loop() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="petals-canvas" />;
}
