"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

interface AudioToggleProps {
  visible: boolean;
}

export default function AudioToggle({ visible }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasAudio = Boolean(WEDDING.media.bgMusicUrl);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasAudio || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.warn("Audio play blocked:", err);
      }
    }
  };

  // Auto-play when site is revealed and audio src exists
  useEffect(() => {
    if (visible && hasAudio && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [visible, hasAudio]);

  return (
    <>
      {hasAudio && (
        <audio ref={audioRef} loop preload="metadata">
          <source src={WEDDING.media.bgMusicUrl} type="audio/mpeg" />
        </audio>
      )}
      <button
        className="audio-btn"
        onClick={toggle}
        title={playing ? "Pause music" : "Play music"}
        aria-label={playing ? "Pause background music" : "Play background music"}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 1s" }}
      >
        {playing ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
          </svg>
        )}
      </button>
    </>
  );
}
