
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GoldenTunnel from "./components/GoldenTunnel";
import ImmersiveHero from "./components/ImmersiveHero";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// SERVICES DATA
// ==========================================

const services = [
  {
    number: "01",
    title: "AI AUTOMATION",
    description:
      "Automate repetitive workflows, streamline operations and build intelligent business systems.",
    tags: ["Workflow Automation", "AI Agents", "Business Process"],
  },
  {
    number: "02",
    title: "AI VIDEOS & ADS",
    description:
      "Create premium AI-powered advertisements, promotional films and engaging visual campaigns.",
    tags: ["AI Commercials", "Product Ads", "Creative Videos"],
  },
  {
    number: "03",
    title: "WEB DEVELOPMENT",
    description:
      "Build modern, responsive and high-performance websites for ambitious businesses.",
    tags: ["Business Websites", "Landing Pages", "Web Experiences"],
  },
  {
    number: "04",
    title: "SOFTWARE DEVELOPMENT",
    description:
      "Transform business requirements into practical, scalable digital software solutions.",
    tags: ["Custom Software", "Dashboards", "Web Applications"],
  },
  {
    number: "05",
    title: "DIGITAL MARKETING",
    description:
      "Build a stronger digital presence through creative strategy and performance-focused marketing.",
    tags: ["Brand Strategy", "Social Media", "Campaigns"],
  },
  {
    number: "06",
    title: "AI INTEGRATION",
    description:
      "Connect intelligent AI capabilities with your existing products, platforms and workflows.",
    tags: ["AI Integration", "Smart Systems", "API Solutions"],
  },
];

// ==========================================
// NAVBAR
// ==========================================

function Navbar() {
  return (
    <header className="ib-navbar">
      <a href="#home" className="ib-nav-brand">
        INDOVA<span> BEYOND</span>
      </a>

      <nav className="ib-nav-links">
        <a href="#home">HOME</a>
        <a href="#about">ABOUT</a>
        <a href="#services">SERVICES</a>
        <a href="#studio">STUDIO</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <a href="#contact" className="ib-nav-cta">
        LET'S TALK <span>↗</span>
      </a>
    </header>
  );
}

// ==========================================
// ABOUT
// ==========================================

function About() {
  return (
    <section className="ib-section ib-about" id="about">
      <div className="ib-section-label">
        <span>01</span> // ABOUT_INDOVA
      </div>

      <div className="ib-about-grid">
        <div>
          <p className="ib-eyebrow">WHO_WE_ARE.init()</p>

          <h2>
            WE BUILD
            <br />
            WHAT'S <span>NEXT.</span>
          </h2>

          <div className="ib-terminal-status">
            <i />
            SYSTEM STATUS: INNOVATING
          </div>
        </div>

        <div className="ib-about-copy">
          <div className="ib-code-comment">// Our mission</div>

          <p>
            INDOVA BEYOND is a technology and creative solutions company
            focused on bringing intelligence, innovation and creativity
            together.
          </p>

          <p>
            From AI automation and software development to AI-powered
            advertising and digital experiences, we help businesses move
            forward with purpose.
          </p>

          <div className="ib-about-values">
            <span>INTELLIGENCE</span>
            <span>CREATIVITY</span>
            <span>INNOVATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SERVICES
// ==========================================

function Services() {
  return (
    <section className="ib-section ib-services" id="services">
      <div className="ib-section-label">
        <span>02</span> // OUR_CAPABILITIES
      </div>

      <div className="ib-section-heading">
        <p className="ib-eyebrow">WHAT_WE_CREATE()</p>

        <h2>
          IDEAS INTO
          <br />
          <span>INTELLIGENT SOLUTIONS.</span>
        </h2>

        <p className="ib-section-description">
          We transform ideas, technology and creativity into solutions
          designed for the next generation of business.
        </p>
      </div>

      <div className="ib-service-grid">
        {services.map((service) => (
          <article
            className="ib-service-card"
            key={service.number}
          >
            <div className="ib-card-top">
              <span className="ib-service-number">
                [{service.number}]
              </span>

              <span className="ib-card-icon">↗</span>
            </div>

            <div className="ib-card-line" />

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <div className="ib-service-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a
              href="#contact"
              aria-label={`Discuss ${service.title}`}
            >
              EXPLORE SERVICE <span>↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// STUDIO
// ==========================================

function Studio() {
  return (
    <section className="ib-section ib-studio" id="studio">
      <div className="ib-section-label">
        <span>03</span> // THE_STUDIO
      </div>

      <div className="ib-studio-content">
        <p className="ib-eyebrow">
          TECHNOLOGY_MEETS_CREATIVITY()
        </p>

        <h2>
          THINK IT.
          <br />
          BUILD IT.
          <br />
          <span>MAKE IT REAL.</span>
        </h2>

        <p className="ib-studio-description">
          We combine emerging technologies, intelligent automation and
          creative thinking to build digital experiences that move
          businesses forward.
        </p>

        <a href="#contact" className="ib-outline-button">
          START A PROJECT ↗
        </a>
      </div>

      <div className="ib-studio-code">
        <span>// INDOVA STUDIO</span>

        <code>
          const future = await indova.build(vision);
        </code>

        <span className="ib-studio-success">
          ✓ READY_TO_CREATE
        </span>
      </div>
    </section>
  );
}

// ==========================================
// CONTACT
// ==========================================

function Contact() {
  return (
    <section className="ib-section ib-contact" id="contact">
      <div className="ib-section-label">
        <span>04</span> // CONNECT_WITH_US
      </div>

      <p className="ib-eyebrow">HAVE_AN_IDEA?</p>

      <h2>
        LET'S BUILD
        <br />
        <span>BEYOND.</span>
      </h2>

      <p className="ib-contact-copy">
        Have a project, business challenge or creative idea?
        Let's make something extraordinary together.
      </p>

      <a
        href="mailto:hello@indovabeyond.com"
        className="ib-contact-email"
      >
        hello@indovabeyond.com ↗
      </a>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================

function Footer() {
  return (
    <footer className="ib-footer-wrap">
      <div className="ib-footer-card">
        <div className="ib-footer-top">
          <div>
            <span className="ib-footer-overline">
              // END_OF_PAGE
            </span>

            <h2>
              THE FUTURE
              <br />
              IS <span>BEYOND.</span>
            </h2>

            <p>
              Intelligence. Creativity. Innovation.
              <br />
              Let's create what's next.
            </p>

            <a href="#contact" className="ib-footer-cta">
              START YOUR PROJECT <span>↗</span>
            </a>
          </div>

          <div className="ib-footer-links">
            <span className="ib-footer-heading">
              NAVIGATION
            </span>

            <a href="#home">01 / HOME</a>
            <a href="#about">02 / ABOUT</a>
            <a href="#services">03 / SERVICES</a>
            <a href="#studio">04 / STUDIO</a>
            <a href="#contact">05 / CONTACT</a>
          </div>

          <div className="ib-footer-links">
            <span className="ib-footer-heading">
              OUR EXPERTISE
            </span>

            <a href="#services">AI AUTOMATION</a>
            <a href="#services">AI VIDEOS & ADS</a>
            <a href="#services">WEB DEVELOPMENT</a>
            <a href="#services">SOFTWARE DEVELOPMENT</a>
            <a href="#services">DIGITAL MARKETING</a>
            <a href="#services">AI INTEGRATION</a>
          </div>
        </div>

        <div className="ib-footer-bottom">
          <a href="#home" className="ib-footer-brand">
            INDOVA<span> BEYOND</span>
          </a>

          <p>
            INTELLIGENCE · CREATIVITY · INNOVATION
          </p>

          <span>
            © {new Date().getFullYear()} INDOVA BEYOND.
            ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN APP
// ==========================================

export default function App() {
  const pageRef = useRef(null);
  const tunnelProgressRef = useRef(0);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: page,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          tunnelProgressRef.current = self.progress;
        },
      });
    }, page);

    return () => {
      ctx.revert();
      tunnelProgressRef.current = 0;
    };
  }, []);

  return (
    <div className="ib-website" id="home" ref={pageRef}>
      {/* ONE GLOBAL GOLDEN TUNNEL */}
      <div className="ib-global-tunnel" aria-hidden="true">
        <GoldenTunnel progressRef={tunnelProgressRef} />
      </div>

      {/* ALL WEBSITE CONTENT ABOVE THE TUNNEL */}
      <div className="ib-content-layer">
        <Navbar />

        <main>
          <ImmersiveHero />
          <About />
          <Services />
          <Studio />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
