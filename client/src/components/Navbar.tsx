import React, { useState, useEffect } from 'react';
import { Send, ChevronDown, Menu, X, Sparkles, Layers, Cpu, CloudLightning, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    {
      id: 'services',
      label: 'Services',
      hasDropdown: true,
      dropdownType: 'services',
    },
    {
      id: 'solutions',
      label: 'Solutions',
      hasDropdown: true,
      dropdownType: 'solutions',
    },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const serviceSubItems = [
    { title: 'AI Automation & Software', desc: 'Custom enterprise intelligence & agentic workflows', target: 'services' },
    { title: 'AI Videos & Ads Creation', desc: 'Photorealistic commercial digital avatars & viral hooks', target: 'services' },
    { title: 'Web Development', desc: 'Ultra-fast Next.js/React luxury digital platforms', target: 'services' },
    { title: 'Digital Marketing', desc: 'Algorithmic scaling and full-funnel acquisition', target: 'services' },
    { title: 'AI Solutions & Consulting', desc: 'Executive architectural readiness & system design', target: 'services' },
    { title: 'Business Growth Strategies', desc: 'Strategic market dominance & GTM scaling', target: 'services' },
  ];

  const solutionSubItems = [
    { title: 'Enterprise Intelligence Suite', desc: 'Turn enterprise silos into actionable automated insights', target: 'services' },
    { title: 'Generative Media Studio', desc: 'High-production virtual video production on demand', target: 'services' },
    { title: 'Fintech & Scaled Platforms', desc: 'Sub-millisecond high-concurrency microservices', target: 'services' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setSolutionsDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050608]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-2.5 xl:space-x-3.5 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Hexagon monogram cropped out of the brand logo (screen blend hides its black backdrop) */}
            <div
              role="img"
              aria-label="INDOVA BEYOND logo"
              className="w-12 h-12 xl:w-[68px] xl:h-[68px] flex-shrink-0 mix-blend-screen group-hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: 'url(/assets/logo.jpg)',
                backgroundSize: '190%',
                backgroundPosition: '48.5% 19%',
              }}
            />

            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-display tracking-[0.06em] text-xl sm:text-2xl xl:text-[2rem] font-extrabold metallic-text leading-none">
                INDOVA
              </span>
              <span className="font-display mt-1 text-[11px] xl:text-sm tracking-[0.42em] font-bold text-[#E6B54A] leading-none">
                BEYOND
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center flex-1 space-x-0 xl:space-x-3 ml-4 pl-3 xl:ml-10 xl:pl-10 border-l border-[#E6B54A]/50">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              if (item.hasDropdown) {
                const isOpen = item.dropdownType === 'services' ? servicesDropdown : solutionsDropdown;
                const toggleDropdown = () => {
                  if (item.dropdownType === 'services') {
                    setServicesDropdown(!servicesDropdown);
                    setSolutionsDropdown(false);
                  } else {
                    setSolutionsDropdown(!solutionsDropdown);
                    setServicesDropdown(false);
                  }
                };

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.dropdownType === 'services') setServicesDropdown(true);
                      else setSolutionsDropdown(true);
                    }}
                    onMouseLeave={() => {
                      if (item.dropdownType === 'services') setServicesDropdown(false);
                      else setSolutionsDropdown(false);
                    }}
                  >
                    <button
                      onClick={toggleDropdown}
                      className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 text-sm xl:text-base font-medium transition-colors rounded-lg ${
                        isActive
                          ? 'text-[#FFDF78]'
                          : 'text-white hover:text-[#FFDF78]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-[#E6B54A] ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="glass-panel rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-[#E6B54A]/30 bg-[#0A0C10]/95 backdrop-blur-2xl">
                          <div className="text-[10px] uppercase tracking-widest text-[#E6B54A] font-bold px-3 py-1.5 border-b border-white/5 mb-1.5">
                            {item.dropdownType === 'services' ? 'Available Services' : 'Enterprise Solutions'}
                          </div>

                          {(item.dropdownType === 'services' ? serviceSubItems : solutionSubItems).map(
                            (sub, idx) => (
                              <div
                                key={idx}
                                onClick={() => handleNavClick(sub.target || 'services')}
                                className="group/item flex items-start space-x-3 p-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                              >
                                <div className="p-1.5 rounded-lg bg-[#E6B54A]/10 text-[#FFDF78] group-hover/item:bg-[#E6B54A] group-hover/item:text-black transition-colors mt-0.5">
                                  <Sparkles className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-slate-200 group-hover/item:text-[#FFDF78] transition-colors flex items-center justify-between">
                                    <span>{sub.title}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity transform group-hover/item:translate-x-0.5" />
                                  </div>
                                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {sub.desc}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2.5 xl:px-3.5 py-2 text-sm xl:text-base font-medium transition-colors rounded-lg group whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-white hover:text-[#FFDF78]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#E6B54A] to-transparent rounded-full shadow-[0_0_8px_#E6B54A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Get a Quote Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenQuote}
              className="relative group px-4 xl:px-7 py-2.5 xl:py-3 rounded-full text-sm xl:text-base font-medium whitespace-nowrap overflow-hidden transition-all duration-300 border-[1.5px] border-[#E6B54A] bg-black/40 hover:bg-[#E6B54A] text-[#FFDF78] hover:text-black shadow-[0_0_20px_rgba(230,181,74,0.25)] hover:shadow-[0_0_35px_rgba(230,181,74,0.6)] flex items-center space-x-2 xl:space-x-3"
            >
              <Send className="w-4 h-4 xl:w-5 xl:h-5 fill-current text-[#E6B54A] group-hover:text-black transition-colors" />
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6B54A] group-hover:text-black transform group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase border border-[#E6B54A]/60 text-[#FFDF78] bg-black/40"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#07080B]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#E6B54A]" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#E6B54A] to-[#D49B28] text-black flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(230,181,74,0.5)]"
            >
              <Send className="w-4 h-4" />
              <span>Get a Quote Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
