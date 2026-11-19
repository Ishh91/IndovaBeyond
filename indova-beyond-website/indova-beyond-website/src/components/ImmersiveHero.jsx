
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ImmersiveHero.css";

import logo from "../assets/indova-logo.png";

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  { n: "01", code: 'const company = "INDOVA BEYOND";', type: "purple" },
  { n: "02", code: "const vision = intelligence + creativity;", type: "blue" },
  { n: "03", code: "function transformIdeas(ideas) {", type: "yellow" },
  { n: "04", code: "  return buildIntelligentSolutions(ideas);", type: "green" },
  { n: "05", code: "}", type: "yellow" },
  { n: "06", code: "AI. AUTOMATION. DEVELOPMENT.", type: "white" },
  { n: "07", code: "CREATIVITY // WITHOUT LIMITS", type: "gold" },
];

const THREEProgress = (progress) =>
  Math.min(Math.max(progress / 0.72, 0), 1);

export default function ImmersiveHero({ progressRef }) {
  const sectionRef = useRef(null);
  const localProgressRef = useRef(0);

  const cameraProgress = progressRef || localProgressRef;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      /* INITIAL STATES */

      gsap.set(q(".cinematic-line"), {
        autoAlpha: 0,
        y: 45,
        filter: "blur(12px)",
      });

      gsap.set(q(".cinematic-logo"), {
        autoAlpha: 0,
        scale: 0.72,
      });

      gsap.set(q(".cinematic-final-text"), {
        autoAlpha: 0,
        y: 35,
      });

      gsap.set(q(".code-interface"), {
        autoAlpha: 0,
        y: 60,
        scale: 0.94,
      });

      gsap.set(q(".code-row"), {
        autoAlpha: 0,
        x: -25,
      });

      gsap.set(q(".cinematic-scroll-progress-fill"), {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(q(".code-scan-line"), {
        y: 0,
      });

      /* MAIN CINEMATIC TIMELINE */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",

          // Extended journey for complete coding sequence
          end: "+=7500",

          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            cameraProgress.current = THREEProgress(self.progress);
          },

          onLeaveBack: () => {
            cameraProgress.current = 0;
          },
        },
      });

      /* SCROLL PROGRESS */

      timeline.to(
        q(".cinematic-scroll-progress-fill"),
        {
          scaleX: 1,
          duration: 11.5,
          ease: "none",
        },
        0
      );

      /* INTRO */

      timeline.to(
        q(".cinematic-intro"),
        {
          autoAlpha: 0,
          y: -65,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.45
      );

      /* TAGLINE 01 */

      timeline.to(
        q(".line-one"),
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        1.35
      );

      timeline.to(
        q(".line-one"),
        {
          autoAlpha: 0,
          y: -45,
          duration: 0.6,
        },
        2.45
      );

      /* TAGLINE 02 */

      timeline.to(
        q(".line-two"),
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        2.95
      );

      timeline.to(
        q(".line-two"),
        {
          autoAlpha: 0,
          y: -45,
          duration: 0.6,
        },
        4.05
      );

      /* LOGO REVEAL */

      timeline.to(
        q(".cinematic-logo"),
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        4.5
      );

      timeline.to(
        q(".cinematic-logo"),
        {
          autoAlpha: 0,
          scale: 1.16,
          duration: 0.75,
          ease: "power2.in",
        },
        5.75
      );

      /* =================================
         CODE INTERFACE REVEAL
      ================================= */

      timeline.to(
        q(".code-interface"),
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        6.2
      );

      /* CODING LINES — SEQUENTIAL REVEAL */

      timeline.to(
        q(".code-row"),
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.18,
          duration: 0.45,
          ease: "power2.out",
        },
        7.1
      );

      /* BUILD SUCCESSFUL STATUS */

      timeline.fromTo(
        q(".code-window-footer"),
        {
          autoAlpha: 0,
          y: 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        8.8
      );

      /* CODE CAPTION REVEAL */

      timeline.fromTo(
        q(".code-caption"),
        {
          autoAlpha: 0,
          y: 25,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
        },
        9
      );

      /* =================================
         IMPORTANT: CODE INTERFACE HOLD
         Do not hide before complete.
      ================================= */

      timeline.to(
        {},
        {
          duration: 1.5,
        },
        9.8
      );

      /* CODE INTERFACE EXIT */

      timeline.to(
        q(".code-interface"),
        {
          autoAlpha: 0,
          y: -45,
          scale: 1.035,
          duration: 0.8,
          ease: "power2.inOut",
        },
        11.3
      );

      /* FINAL TEXT */

      timeline.to(
        q(".cinematic-final-text"),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        11.8
      );

      /* FINAL HOLD */

      timeline.to(
        {},
        {
          duration: 1.2,
        },
        12.7
      );

      /* =================================
         INDEPENDENT CODE ANIMATIONS
      ================================= */

      gsap.to(q(".code-cursor"), {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: "steps(1)",
      });

      gsap.to(q(".code-scan-line"), {
        y: 360,
        repeat: -1,
        duration: 4,
        ease: "none",
      });

    }, section);

    return () => {
      ctx.revert();
      cameraProgress.current = 0;
    };
  }, [cameraProgress]);

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero"
      id="home"
    >
      <div className="cinematic-vignette" />

      {/* INTRO */}

      <div className="cinematic-intro">
        <span>INDOVA BEYOND PRESENTS</span>

        <h1>
          ENTER THE
          <br />
          FUTURE.
        </h1>

        <p>SCROLL TO BEGIN THE JOURNEY ↓</p>
      </div>

      {/* TAGLINE 01 */}

      <div className="cinematic-line line-one">
        <span>01 / INTELLIGENCE</span>

        <h2>
          THINK BEYOND
          <br />
          LIMITS.
        </h2>

        <p>Where intelligence meets possibility.</p>
      </div>

      {/* TAGLINE 02 */}

      <div className="cinematic-line line-two">
        <span>02 / CREATIVITY</span>

        <h2>
          IMAGINE.
          <br />
          CREATE. EVOLVE.
        </h2>

        <p>
          Ideas transformed into extraordinary experiences.
        </p>
      </div>

      {/* BRAND LOGO */}

      <div className="cinematic-logo">
        <div className="cinematic-logo-glow" />

        <img
          src={logo}
          alt="INDOVA BEYOND"
          draggable="false"
        />

        <p>
          INTELLIGENCE · CREATIVITY · INNOVATION
        </p>
      </div>

      {/* FINAL TEXT */}

      <div className="cinematic-final-text">
        <span>04 / INNOVATION</span>

        <h2>
          THE FUTURE
          <br />
          STARTS HERE.
        </h2>

        <a href="#about">
          EXPLORE INDOVA ↗
        </a>
      </div>

      {/* BRAND MARK */}

      <div className="cinematic-brand-mark">
        IB<span>®</span>
      </div>

      {/* SCROLL PROGRESS */}

      <div className="cinematic-scroll-progress">
        <div className="cinematic-scroll-progress-fill" />
      </div>

      {/* =================================
          LIVE CODING INTERFACE
      ================================= */}

      <div className="code-interface">

        <div className="code-window">

          <div className="code-window-header">

            <div className="code-window-dots">
              <i />
              <i />
              <i />
            </div>

            <span>indova_future.js</span>

            <span className="code-live">
              <i /> LIVE SYSTEM
            </span>

          </div>

          <div className="code-window-body">

            <div className="code-sidebar">
              <span>EX</span>
              <span>⌘</span>
              <span>◈</span>
              <span>⚙</span>
            </div>

            <div className="code-editor">

              <div className="code-editor-top">
                <span>src / core / indova_future.js</span>
                <span>JavaScript · UTF-8</span>
              </div>

              <div className="code-content">

                {codeLines.map((line) => (
                  <div
                    className="code-row"
                    key={line.n}
                  >
                    <span className="code-line-number">
                      {line.n}
                    </span>

                    <code className={`syntax-${line.type}`}>
                      {line.code}
                    </code>
                  </div>
                ))}

                <div className="code-row code-last-row">
                  <span className="code-line-number">
                    08
                  </span>

                  <code className="syntax-gold">
                    <span className="code-cursor">▌</span>
                  </code>
                </div>

              </div>

              <div className="code-scan-line" />

            </div>
          </div>

          <div className="code-window-footer">
            <span>● BUILD SUCCESSFUL</span>
            <span>INDOVA ENGINE v1.0</span>
            <span>100% INTELLIGENCE</span>
          </div>

        </div>

        <div className="code-caption">

          <span>03 / ENGINEERING INTELLIGENCE</span>

          <h2>
            IDEAS INTO
            <br />
            <span>INTELLIGENT SOLUTIONS.</span>
          </h2>

          <p>
            We turn complex possibilities into
            intelligent digital reality.
          </p>

        </div>

      </div>

    </section>
  );
}
