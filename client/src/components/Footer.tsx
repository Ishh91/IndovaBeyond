import React, { useState } from 'react';
import { ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import SocialFlipButton from '@/components/ui/social-flip-button';
import { socialItems } from '@/data/socials';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subStatus, setSubStatus] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      setSubStatus(data.message || 'Subscribed successfully to executive updates.');
      setNewsletterEmail('');
    } catch {
      setSubStatus('Subscribed to executive briefings.');
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040507] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background subtle gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E6B54A]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div
              onClick={() => onNavigate('hero')}
              className="flex items-center space-x-3 cursor-pointer select-none group inline-flex"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2028] to-[#0A0B0E] p-[1.5px] shadow-[0_0_15px_rgba(230,181,74,0.3)]">
                <div className="w-full h-full rounded-[9px] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/logo.jpg"
                    alt="INDOVA BEYOND"
                    className="w-8 h-8 object-cover rounded"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-display tracking-[0.22em] text-lg font-bold metallic-text leading-tight">
                  INDOVA
                </span>
                <span className="text-[10px] tracking-[0.35em] font-semibold text-[#E6B54A]">
                  BEYOND
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              Turning Ideas into Intelligent Solutions. A next-generation technology company delivering AI Automation, Software Development, AI Videos & Ads and Digital Marketing.
            </p>

            <div className="text-[11px] text-[#FFDF78] font-mono tracking-wider flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E6B54A] animate-pulse" />
              <span>Global Enterprise Availability</span>
            </div>

            {/* Social links: tiles spell INDOVA and flip to icons on hover */}
            <SocialFlipButton
              items={socialItems}
              className="justify-start p-0 pt-2"
              frontClassName="bg-[#12141A] text-[#FFDF78] dark:bg-[#12141A] dark:text-[#FFDF78] font-display"
              backClassName="bg-[#E6B54A] text-black dark:bg-[#E6B54A] dark:text-black"
            />
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFDF78]">
                Navigation
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'Careers', id: 'careers' },
                  { label: 'Contact', id: 'contact' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFDF78]">
                Core Pillars
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => onNavigate('services')} className="hover:text-white">AI Automation</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-white">AI Videos & Ads</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-white">Web Engineering</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-white">Digital Marketing</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-white">Growth Consulting</button></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFDF78]">
                Executive AI Intelligence
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Receive monthly strategic briefings on production AI models, enterprise automation architecture, and market breakthroughs.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  className="w-full px-4 py-3 rounded-full bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E6B54A] pr-12 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-full bg-[#E6B54A] text-black hover:bg-[#FFDF78] transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subStatus && (
                <div className="text-[11px] text-[#FFDF78] flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E6B54A]" />
                  <span>{subStatus}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <div>
            © 2026 <strong className="text-slate-300 font-semibold">INDOVA BEYOND</strong>. All rights reserved. Turning Ideas into Intelligent Solutions.
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Enterprise SLA</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-[#E6B54A] hover:text-black text-slate-300 transition-colors ml-2"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

