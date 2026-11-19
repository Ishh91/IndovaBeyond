
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GoldenTunnel from "./GoldenTunnel";
import "./ImmersiveHero.css";

import logo from "../assets/indova-logo.png";
import walk from "../assets/golden-walk.png";

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

export default function ImmersiveHero() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const codeRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.set(q(".cinematic-line"), {
        autoAlpha: 0,
        y: 45,
        filter: "blur(12px)",
      });

      gsap.set(q(".cinematic-logo"), {
        autoAlpha: 0,
        scale: 0.72,
      });

      gsap.set(q(".cinematic-walk"), {
        autoAlpha: 0,
        scale: 1.12,
      });

      gsap.set(q(".cinematic-final-text"), {
        autoAlpha: 0,
        y: 35,
      });

      gsap.set(q(".code-interface"), {
        autoAlpha: 0,
        y: 50,
        scale: 0.94,
      });

      gsap.set(q(".code-row"), {
        autoAlpha: 0,
        x: -20,
      });

      gsap.set(q(".cinematic-intro"), {
        autoAlpha: 1,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=6500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = Math.min(
              Math.max(self.progress / 0.72, 0),
              1
            );
          },
        },
      });

      // SCROLL PROGRESS
      timeline.to(
        q(".cinematic-scroll-progress-fill"),
        {
          scaleX: 1,
          duration: 10,
          ease: "none",
        },
        0
      );

      // INTRO
      timeline.to(
        q(".cinematic-intro"),
        {
          autoAlpha: 0,
          y: -65,
          duration: 0.8,
        },
        0.45
      );

      // TAGLINE ONE
      timeline.to(
        q(".line-one"),
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
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

      // TAGLINE TWO
      timeline.to(
        q(".line-two"),
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
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

      // LOGO REVEAL
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
          scale: 1.12,
          duration: 0.7,
        },
        5.7
      );

      // CODING INTERFACE
      timeline.to(
        q(".code-interface"),
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        6.05
      );

      timeline.to(
        q(".code-row"),
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.13,
          duration: 0.35,
          ease: "power2.out",
        },
        6.4
      );

      timeline.to(
        q(".code-interface"),
        {
          autoAlpha: 0,
          y: -40,
          scale: 1.04,
          duration: 0.65,
        },
        8.1
      );

      // WALKING SCENE
      timeline.to(
        q(".cinematic-walk"),
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        8.35
      );

      timeline.to(
        q(".cinematic-final-text"),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
        },
        9.05
      );

      timeline.to({}, { duration: 0.7 }, 9.85);

      // Infinite code cursor blink
      gsap.to(q(".code-cursor"), {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: "steps(1)",
      });

      // Subtle code scan animation
      gsap.to(q(".code-scan-line"), {
        y: 360,
        repeat: -1,
        duration: 4,
        ease: "none",
      });

    }, section);

    return () => {
      ctx.revert();
      progressRef.current = 0;
    };
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-hero">

      <GoldenTunnel progressRef={progressRef} />

      <div className="cinematic-vignette" />
      <div className="cinematic-grain" />

      {/* INTRO */}
      <div className="cinematic-intro">
        <span className="terminal-label">
          <i /> SYSTEM.INITIALIZED // INDOVA BEYOND
        </span>

        <h1>
          ENTER THE
          <br />
          <span>FUTURE.</span>
        </h1>

        <p>SCROLL TO BEGIN THE JOURNEY <b>↓</b></p>
      </div>

      {/* TAGLINE ONE */}
      <div className="cinematic-line line-one">
        <span>01 / INTELLIGENCE</span>
        <h2>
          THINK BEYOND
          <br />
          LIMITS<span>.</span>
        </h2>
        <p>Where intelligence meets possibility.</p>
      </div>

      {/* TAGLINE TWO */}
      <div className="cinematic-line line-two">
        <span>02 / CREATIVITY</span>
        <h2>
          IMAGINE<span>.</span>
          <br />
          CREATE<span>.</span> EVOLVE<span>.</span>
        </h2>
        <p>Ideas transformed into extraordinary experiences.</p>
      </div>

      {/* BRAND LOGO */}
      <div className="cinematic-logo">
        <div className="cinematic-logo-glow" />
        <img src={logo} alt="INDOVA BEYOND" draggable="false" />
        <p>INTELLIGENCE · CREATIVITY · INNOVATION</p>
      </div>

      {/* LIVE CODING INTERFACE */}
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
                  <div className="code-row" key={line.n}>
                    <span className="code-line-number">{line.n}</span>
                    <code className={`syntax-${line.type}`}>
                      {line.code}
                    </code>
                  </div>
                ))}

                <div className="code-row code-last-row">
                  <span className="code-line-number">08</span>
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
          <p>We turn complex possibilities into intelligent digital reality.</p>
        </div>
      </div>

      {/* FINAL WALKING SCENE */}
      <div className="cinematic-walk">
        <img
          src={walk}
          alt="A person walking towards a golden light"
          draggable="false"
        />
        <div className="walk-overlay" />
      </div>

      <div className="cinematic-final-text">
        <span>04 / INNOVATION</span>
        <h2>
          THE FUTURE
          <br />
          STARTS HERE<span>.</span>
        </h2>
        <a href="#about">EXPLORE INDOVA ↗</a>
      </div>

      <div className="cinematic-brand-mark">
        IB<span>®</span>
      </div>

      <div className="cinematic-scroll-progress">
        <div className="cinematic-scroll-progress-fill" />
      </div>

      <div className="cinematic-scroll-indicator">
        SCROLL TO EXPLORE <span>↓</span>
      </div>

    </section>
  );
}
