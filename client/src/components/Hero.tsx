import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { HeroGlobe } from './HeroGlobe';

interface HeroProps {
  onExploreServices: () => void;
  onWatchStory: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onWatchStory }) => {
  // Global window scroll
  const { scrollY } = useScroll();

  // Smooth inertial spring
  const smoothY = useSpring(scrollY, {
    stiffness: 90,
    damping: 26,
    mass: 0.25,
  });

  // =========================================================================
  // 1. FIRST: WEBSITE NAME & 3D LOGO ZOOM OUT ON SCROLL (0px -> 380px)
  // =========================================================================
  const brandTitleScale = useTransform(smoothY, [0, 380], [1.08, 0.82]);
  const brandTitleY = useTransform(smoothY, [0, 380], [0, 25]);

  const logoGlobeScale = useTransform(smoothY, [0, 420], [1.1, 0.8]);
  const logoGlobeY = useTransform(smoothY, [0, 420], [0, 35]);

  // =========================================================================
  // 2. THEN: FULL HERO CONTENT ZOOMS OUT AS YOU SCROLL TOWARDS SERVICES (200px -> 680px)
  // =========================================================================
  const heroContentScale = useTransform(smoothY, [200, 680], [1, 0.72]);
  const heroContentOpacity = useTransform(smoothY, [200, 500, 700], [1, 0.9, 0.25]);
  const heroContentY = useTransform(smoothY, [200, 680], [0, 60]);

  return (
    <section id="hero" className="relative min-h-[92vh] pt-24 pb-10 lg:pt-28 lg:pb-14 flex items-center overflow-hidden">
      
      {/* Diagonal gold streaks on the edges (desktop only) */}
      <div
        className="gold-streak hidden lg:block absolute right-0 top-0 h-full w-[260px] pointer-events-none z-10"
        style={{ clipPath: 'polygon(100% 34%, 100% 54%, 74% 100%, 63% 100%)' }}
      />
      <div
        className="gold-streak hidden lg:block absolute left-0 top-0 h-full w-[200px] opacity-80 pointer-events-none z-10"
        style={{ clipPath: 'polygon(0 78%, 30% 22%, 32% 22%, 0 84%)' }}
      />

      {/* Ambient radial lighting flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#E6B54A]/15 via-[#D49B28]/5 to-transparent rounded-full filter blur-[150px] pointer-events-none" />

      {/* Main Container — Wrapped in the secondary content zoom-out */}
      <motion.div
        style={{
          scale: heroContentScale,
          opacity: heroContentOpacity,
          y: heroContentY,
          transformOrigin: 'center 40%',
          willChange: 'transform, opacity',
        }}
        className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Brand Name & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Top Badge with Gold Divider */}
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-slate-300 uppercase">
                <span className="text-[#FFDF78]">AI</span>
                <span className="text-[#E6B54A] font-bold">•</span>
                <span className="text-[#FFDF78]">INNOVATION</span>
                <span className="text-[#E6B54A] font-bold">•</span>
                <span className="text-[#FFDF78]">GROWTH</span>
              </div>
              <div className="h-[1px] flex-1 max-w-[140px] sm:max-w-[180px] bg-gradient-to-r from-[#E6B54A]/80 via-[#E6B54A]/30 to-transparent" />
            </div>

            {/* FIRST ZOOM OUT TARGET: WEBSITE NAME */}
            <motion.div
              style={{
                scale: brandTitleScale,
                y: brandTitleY,
                transformOrigin: 'left center',
                willChange: 'transform',
              }}
              className="space-y-2 relative"
            >
              {/* Backlight flare */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-[#E6B54A]/15 to-transparent blur-2xl -z-10 pointer-events-none" />

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[5.25rem] 2xl:text-[6rem] font-extrabold tracking-tight uppercase leading-[1.05] lg:whitespace-nowrap">
                <span className="metallic-text-shimmer drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]">
                  INDOVA
                </span>{' '}
                <span className="gold-text-shimmer drop-shadow-[0_4px_35px_rgba(230,181,74,0.45)]">
                  BEYOND
                </span>
              </h1>
            </motion.div>

            {/* Subheadline — Always Clearly Visible */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] xl:text-4xl 2xl:text-[2.4rem] font-semibold text-white xl:whitespace-nowrap">
              Turning Ideas into{' '}
              <span className="italic font-bold gold-text-shimmer pr-1">Intelligent</span>{' '}
              Solutions
            </h2>

            {/* Lead Description — Always Clearly Visible */}
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-200 max-w-xl 2xl:max-w-2xl leading-relaxed font-light">
              A next-generation technology company, delivering{' '}
              <span className="text-white font-medium underline decoration-[#E6B54A]/40 underline-offset-4">AI Automation</span>,{' '}
              <span className="text-white font-medium">Software Development</span>,{' '}
              <span className="text-white font-medium">AI Videos & Ads</span> and{' '}
              <span className="text-white font-medium">Digital Marketing</span> to take your business Beyond.
            </p>

            {/* Action Buttons — Immediately Clickable & Visible */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button
                onClick={onExploreServices}
                className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#FFDF78] via-[#E6B54A] to-[#D49B28] hover:from-[#FFF1C5] hover:to-[#E6B54A] transition-all duration-300 shadow-[0_0_30px_rgba(230,181,74,0.45)] hover:shadow-[0_0_55px_rgba(230,181,74,0.75)] hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onWatchStory}
                className="group inline-flex items-center space-x-3 text-sm sm:text-base font-medium text-slate-200 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-[#E6B54A]/70 flex items-center justify-center bg-black/50 group-hover:bg-[#E6B54A] group-hover:border-[#E6B54A] group-hover:shadow-[0_0_25px_rgba(230,181,74,0.7)] transition-all">
                  <Play className="w-4 h-4 fill-current text-[#FFDF78] group-hover:text-black transition-colors ml-0.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="group-hover:text-[#FFDF78] transition-colors font-medium">Watch Our Story</span>
                  <div className="flex items-center space-x-1 h-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="w-0.5 h-1.5 bg-[#E6B54A] rounded-full animate-pulse" />
                    <span className="w-0.5 h-2.5 bg-[#FFDF78] rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-0.5 h-2 bg-[#E6B54A] rounded-full animate-pulse [animation-delay:300ms]" />
                    <span className="w-0.5 h-1 bg-[#FFDF78] rounded-full animate-pulse [animation-delay:450ms]" />
                  </div>
                </div>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#E6B54A]" />
                <span>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#E6B54A]" />
                <span>Proprietary AI Pipelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#E6B54A]" />
                <span>Guaranteed ROI Execution</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D LOGO & GLOBE ZOOM OUT TARGET */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Top Floating Badge */}
            <div className="hidden sm:flex absolute -top-2 right-4 z-20 items-center space-x-2.5 px-3.5 py-2 rounded-xl glass-panel border border-[#E6B54A]/30 bg-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-300 font-semibold tracking-wider">AUTONOMOUS MESH</div>
                <div className="text-[9px] text-[#FFDF78]">99.8% System Accuracy</div>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-3 left-4 z-20 items-center space-x-2.5 px-3.5 py-2 rounded-xl glass-panel border border-[#E6B54A]/30 bg-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-float [animation-delay:2s]">
              <div className="w-6 h-6 rounded-lg bg-[#E6B54A]/20 flex items-center justify-center text-[#FFDF78] text-xs">
                ⚡
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-300 font-semibold tracking-wider">ENTERPRISE RAG</div>
                <div className="text-[9px] text-[#FFDF78]">Sub-12ms Response Time</div>
              </div>
            </div>

            {/* FIRST ZOOM OUT TARGET: 3D METALLIC EMBLEM & GLOBE */}
            <motion.div
              style={{
                scale: logoGlobeScale,
                y: logoGlobeY,
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
              className="w-full flex items-center justify-center"
            >
              <HeroGlobe />
            </motion.div>

          </div>

        </div>
      </motion.div>

    </section>
  );
};
