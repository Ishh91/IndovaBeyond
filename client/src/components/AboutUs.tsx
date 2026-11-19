import React from 'react';
import { Shield, Sparkles, Target, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

// Angled left edge for the skyline frame
const FRAME_CLIP = 'polygon(13% 0, 100% 0, 100% 100%, 0 100%)';

// Deterministic skyline so it renders the same on every load
const FAR_TOWERS = [38, 55, 46, 70, 52, 80, 60, 44, 74, 58, 88, 50, 66, 42, 72, 56, 48, 62];
const NEAR_TOWERS = [
  { h: 34, w: 1.2, lit: 0.55, warm: false },
  { h: 52, w: 1, lit: 0.7, warm: true },
  { h: 44, w: 1.4, lit: 0.5, warm: false },
  { h: 78, w: 1, lit: 0.8, warm: false, spire: true },
  { h: 60, w: 1.3, lit: 0.6, warm: true },
  { h: 92, w: 1.1, lit: 0.85, warm: false, spire: true },
  { h: 68, w: 1.5, lit: 0.6, warm: false },
  { h: 84, w: 1, lit: 0.75, warm: true, spire: true },
  { h: 56, w: 1.3, lit: 0.55, warm: false },
  { h: 72, w: 1.1, lit: 0.7, warm: false },
  { h: 46, w: 1.4, lit: 0.6, warm: true },
  { h: 62, w: 1, lit: 0.65, warm: false },
];
const STARS = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: ((i * 53 + 7) % 45),
  o: 0.25 + ((i * 17) % 60) / 100,
}));

interface AboutUsProps {
  onOpenQuote: () => void;
  onExplorePortfolio: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenQuote, onExplorePortfolio }) => {
  const highlights = [
    {
      title: 'Architectural Sovereignty',
      desc: 'We engineer bespoke models and workflows owned completely by your enterprise without vendor lock-in.',
      icon: Shield,
    },
    {
      title: 'Multimodal Execution',
      desc: 'Seamlessly converging enterprise software, AI video creation, and mathematical growth marketing.',
      icon: Zap,
    },
    {
      title: 'Measured Business Outcomes',
      desc: 'No theoretical science projects. Every line of code is benchmarked against revenue, cost reduction, and speed.',
      icon: Target,
    },
  ];

  return (
    <section id="about" className="relative py-14 lg:py-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#E6B54A]/5 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Header Badge */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-5">
                <div className="h-[2px] w-14 bg-gradient-to-r from-[#E6B54A] to-[#E6B54A]/30" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  About <span className="gold-text-gradient">Us</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-200 lg:pl-[76px]">
                Innovating Today. Empowering Tomorrow.
              </p>
            </div>

            {/* Paragraphs matching the spirit of the brand */}
            <div className="space-y-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-white font-semibold">INDOVA BEYOND</strong> is a leading next-generation AI technology company, focused on building intelligent solutions that help forward-thinking businesses scale exponentially, automate complex friction, and achieve market dominance.
              </p>
              <p>
                Founded on the principle that artificial intelligence should not merely exist as an abstract capability, we engineer production systems that deliver decisive competitive advantages. From custom neural microservices and autonomous business pipelines to high-converting generative commercial media, we turn ambitious visions into scalable digital infrastructure.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#E6B54A]/40 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#E6B54A]/10 text-[#FFDF78] flex items-center justify-center mb-3 group-hover:bg-[#E6B54A] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-white mb-1.5 group-hover:text-[#FFDF78] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenQuote}
                className="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] to-[#E6B54A] text-black hover:shadow-[0_0_25px_rgba(230,181,74,0.5)] transition-all"
              >
                Partner With Us
              </button>
              <button
                onClick={onExplorePortfolio}
                className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white px-5 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all"
              >
                <span>View Selected Works</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E6B54A]" />
              </button>
            </div>

          </div>

          {/* Right Column: night city skyline in an angled gold frame */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative p-[2px] bg-gradient-to-br from-[#FFDF78] via-[#E6B54A] to-[#8a6a1c] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              style={{ clipPath: FRAME_CLIP }}
            >
              <div
                className="relative h-80 sm:h-[420px] w-full overflow-hidden bg-gradient-to-b from-[#050b1c] via-[#12305f] to-[#1d4a86]"
                style={{ clipPath: FRAME_CLIP }}
              >
                {/* Horizon glow */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(120,180,255,0.55)_0%,rgba(40,90,170,0.2)_45%,transparent_70%)]" />

                {/* Stars */}
                {STARS.map((s, i) => (
                  <span
                    key={i}
                    className="absolute w-[2px] h-[2px] rounded-full bg-white"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.o }}
                  />
                ))}

                {/* Far skyline */}
                <div className="absolute inset-x-0 bottom-0 h-[62%] flex items-end gap-[3px] px-1 opacity-70">
                  {FAR_TOWERS.map((h, i) => (
                    <div key={i} className="flex-1 bg-[#16305c] rounded-t-[2px]" style={{ height: `${h}%` }} />
                  ))}
                </div>

                {/* Near skyline with lit windows */}
                <div className="absolute inset-x-0 bottom-0 h-[86%] flex items-end gap-[5px] px-2">
                  {NEAR_TOWERS.map((t, i) => (
                    <div
                      key={i}
                      className="relative rounded-t-[3px] bg-[#071224] border-t border-x border-[#5d8fd8]/30"
                      style={{ height: `${t.h}%`, flex: t.w }}
                    >
                      {t.spire && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#5d8fd8]/60" />
                      )}
                      <div
                        className="absolute inset-x-[3px] top-2 bottom-0"
                        style={{
                          opacity: t.lit,
                          backgroundImage: `repeating-linear-gradient(0deg, #071224 0 5px, transparent 5px 9px), repeating-linear-gradient(90deg, ${t.warm ? 'rgba(255,214,130,0.9)' : 'rgba(150,200,255,0.85)'} 0 3px, #071224 3px 7px)`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Ground glow and fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#03060d] via-[#03060d]/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF78] to-transparent shadow-[0_0_18px_#E6B54A]" />

                {/* Caption */}
                <div className="absolute bottom-5 left-8 right-5 z-20 px-4 py-3 rounded-xl bg-black/55 border border-[#E6B54A]/40 backdrop-blur-md">
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#FFDF78] font-bold mb-0.5">
                    <Sparkles className="w-3 h-3 text-[#E6B54A]" />
                    <span>Enterprise Velocity</span>
                  </div>
                  <div className="font-display text-sm sm:text-base font-semibold text-white">
                    Built for high-growth enterprises who refuse to settle.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
