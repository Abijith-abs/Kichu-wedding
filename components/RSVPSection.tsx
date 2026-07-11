"use client";

import { useEffect, useRef, useState } from "react";
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

type ModalType = "success" | "error" | null;

export default function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0); // 0=details, 1=attendance, 2=events+message
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);

  const TOTAL_STEPS = 3;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, any> = Object.fromEntries(formData.entries());
    data.clientId = WEDDING.rsvp.clientId;

    // Handle multiple checkbox values for attending_events
    const attendingEvents = formData.getAll("attending_events");
    if (attendingEvents.length > 0) {
      data.attending_events = attendingEvents;
    }

    if (!WEDDING.rsvp.endpointUrl) {
      // Simulate success
      await new Promise((r) => setTimeout(r, 700));
      setModal("success");
      form.reset();
      setStep(0);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(WEDDING.rsvp.endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      const isSuccess = res.ok && (result.success || result.success === undefined);
      setModal(isSuccess ? "success" : "error");
      if (isSuccess) {
        form.reset();
        setStep(0);
      }
    } catch (err) {
      console.error(err);
      setModal("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="rsvp-section" ref={sectionRef}>
      <div className="text-center reveal">
        <span className="section-label">Join the Celebration</span>
        <h2 className="section-heading text-maroon">Celebrate<br />With Us</h2>
        <OrnamentDivider />
        <p className="reveal reveal-delay-2" style={{
          fontStyle: "italic",
          color: "var(--text-light)",
          fontSize: "1.1rem",
          marginBottom: "2.5rem",
        }}>
          A few fun questions before the big day!
        </p>
      </div>

      <form id="rsvp-form" className="rsvp-form" onSubmit={handleSubmit}>

        {/* Step indicators */}
        <div className="form-steps">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`form-step-dot ${i === step ? "active" : ""}`} />
          ))}
        </div>

        {/* Step 0 — Guest Details */}
        <div className={`form-step-panel ${step === 0 ? "active" : ""}`}>
          <div className="form-card reveal">
            <p className="form-card-title">Guest Details</p>
            <div className="field-group">
              <label className="field-label" htmlFor="f-name">Your Name</label>
              <input className="field-input" type="text" id="f-name" name="name" required placeholder="Full name" />
            </div>
            <div className="field-group" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="f-phone">Phone Number</label>
              <input className="field-input" type="tel" id="f-phone" name="phone" required placeholder="+91 00000 00000" />
            </div>
          </div>

          <div className="form-nav-row">
            <button
              type="button"
              className="submit-btn submit-btn-full"
              onClick={() => setStep(1)}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Step 1 — Attendance */}
        <div className={`form-step-panel ${step === 1 ? "active" : ""}`}>
          <div className="form-card reveal">
            <p className="form-card-title">Will you join us?</p>
            <div className="radio-pill-row">
              <label className="radio-pill">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                />
                Joyfully Accept 🎉
              </label>
              <label className="radio-pill">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                Regrettably Decline
              </label>
            </div>
          </div>

          {attending === "yes" && (
            <div className="form-card reveal">
              <p className="form-card-title">Party Size</p>
              <p className="form-card-subtitle">Including yourself, how many guests?</p>
              <div className="field-group" style={{ marginBottom: 0 }}>
                <select className="field-input" name="guest_count">
                  {["1 (Just me)", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6+ Guests"].map((opt, i) => (
                    <option key={i} value={i === 0 ? "1" : i === 5 ? "6+" : String(i + 1)}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="form-nav-row">
            <button type="button" className="btn-secondary" onClick={() => setStep(0)}>← Back</button>
            <button type="button" className="submit-btn" onClick={() => setStep(2)}>Next →</button>
          </div>
        </div>

        {/* Step 2 — Events + Message */}
        <div className={`form-step-panel ${step === 2 ? "active" : ""}`}>
          {attending === "yes" && (
            <div className="form-card reveal">
              <p className="form-card-title">Ceremonies You&apos;ll Attend</p>
              <p className="form-card-subtitle">Select all that you&apos;ll be joining</p>
              <div className="checkbox-row">
                {WEDDING.rsvpEvents.map((ev) => (
                  <label className="checkbox-pill" key={ev.value}>
                    <div>
                      <span>{ev.label}</span>
                      <small className="checkbox-date">{ev.date}</small>
                    </div>
                    <input
                      type="checkbox"
                      name="attending_events"
                      value={ev.value}
                      defaultChecked={'defaultChecked' in ev ? ev.defaultChecked : false}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-card reveal">
            <p className="form-card-title">Leave Us a Note</p>
            <p className="form-card-subtitle">Share a wish or memory.</p>
            <textarea
              className="text-area"
              name="message"
              rows={3}
              placeholder="Write something from the heart..."
            />
          </div>

          <div className="form-nav-row">
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
                    <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                    <path d="M12 2a10 10 0 0110 10" strokeOpacity=".75" />
                  </svg>
                  Sending...
                </span>
              ) : "Send Love ❤️"}
            </button>
          </div>

          {!WEDDING.rsvp.endpointUrl && (
            <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-light)", fontStyle: "italic", marginTop: "0.75rem" }}>
              RSVP endpoint not connected — set <code>rsvp.endpointUrl</code> in <code>lib/constants.ts</code>
            </p>
          )}
        </div>
      </form>

      {/* Confirmation Modal */}
      {modal && (
        <div
          className="rsvp-modal open"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="modal-card">
            <div className="modal-icon-ring">
              <span style={{ fontSize: "2rem" }}>{modal === "success" ? "🎉" : "⚠️"}</span>
            </div>
            <h3 className="modal-title">{modal === "success" ? "Thank You!" : "Oops!"}</h3>
            <p className="modal-msg">
              {modal === "success"
                ? "We can't wait to celebrate with you on our special day! See you soon 🪔"
                : "There was an error submitting your RSVP. Please try again."}
            </p>
            <button className="modal-close-btn" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
