import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenTunnel from './components/GoldenTunnel';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ScrollZoom } from './components/ScrollZoom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services, ServiceItem } from './components/Services';
import { StatsRibbon } from './components/StatsRibbon';
import { AboutUs } from './components/AboutUs';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { VideoModal } from './components/VideoModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const tunnelProgressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [preselectedQuoteService, setPreselectedQuoteService] = useState<string | undefined>();

  // Initialize Lenis smooth inertial scrolling & sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronize 3D Golden Tunnel camera scrub with scroll
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: page,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
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

  // Butter-smooth scroll handler using Lenis
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -30, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenQuote = (serviceTitle?: string) => {
    setPreselectedQuoteService(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  return (
    <div ref={pageRef} className="relative isolate min-h-screen bg-[#030201] text-slate-100 selection:bg-[#E6B54A]/30 selection:text-[#FFDF78]">

      {/* 3D Golden Tunnel from Website 2 — Global WebGL Background */}
      <div className="ib-global-tunnel" aria-hidden="true">
        <GoldenTunnel progressRef={tunnelProgressRef} />
      </div>

      {/* Interactive Ambient Cursor Spotlight */}
      <CursorSpotlight />

      {/* Primary Sticky Header */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Website 1 Content Layer floating above 3D Tunnel */}
      <div className="relative z-10 w-full min-h-screen bg-transparent pointer-events-auto">
        <main>
          {/* Cinematic 2-Stage Hero: Brand Name & Logo Zoom Out First, Then Full Content */}
          <Hero
            onExploreServices={() => handleNavigate('services')}
            onWatchStory={() => setVideoModalOpen(true)}
            onOpenQuote={() => handleOpenQuote()}
          />

          {/* Services Section Matching Exact Mockup Cards */}
          <ScrollZoom>
            <Services
              onSelectService={handleSelectService}
              onOpenQuote={handleOpenQuote}
            />
          </ScrollZoom>

          {/* Metrics & Performance Ribbon */}
          <ScrollZoom>
            <StatsRibbon onOpenQuote={() => handleOpenQuote()} />
          </ScrollZoom>

          {/* About Us Brand Mission & Cybernetic Skyline */}
          <ScrollZoom>
            <AboutUs
              onOpenQuote={() => handleOpenQuote()}
              onExplorePortfolio={() => handleNavigate('portfolio')}
            />
          </ScrollZoom>

          {/* Selected Portfolio & Case Studies */}
          <ScrollZoom>
            <Portfolio />
          </ScrollZoom>

          {/* Client testimonials as an interactive book */}
          <ScrollZoom>
            <Testimonials />
          </ScrollZoom>

          {/* Direct Channel & Inquiry Form */}
          <ScrollZoom>
            <ContactSection />
          </ScrollZoom>
        </main>

        {/* Brand Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenQuote={() => handleOpenQuote()}
        />
      </div>

      {/* Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={preselectedQuoteService}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
      />

    </div>
  );
};

export default App;

