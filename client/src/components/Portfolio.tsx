import React, { useState } from 'react';
import { ExternalLink, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  description: string;
  tags: string[];
}

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'AI Automation', 'Generative Media', 'Web Platforms', 'Growth'];

  const projects: Project[] = [
    {
      id: '1',
      title: 'Autonomous Global Freight & Logistics Agent',
      category: 'AI Automation',
      client: 'AeroTrans Global',
      metric: '84% Reduction in Manual Dispatch',
      description: 'Engineered an autonomous multi-agent orchestration pipeline handling customs compliance, routing optimization, and automated carrier bidding across 40 countries.',
      tags: ['Autonomous Agents', 'FastAPI', 'Node.js', 'Vector DB'],
    },
    {
      id: '2',
      title: 'Hyper-Realistic AI Digital Human Ad Engine',
      category: 'Generative Media',
      client: 'Veloce Luxury Beauty',
      metric: '4.8x Meta ROAS Scaled to $2.4M',
      description: 'Constructed an automated creative generation engine producing 60+ tailored video ad hooks weekly with proprietary multilingual avatar lip-syncing.',
      tags: ['Generative Video', 'Voice Synthesis', 'Meta Ads API', 'A/B Testing'],
    },
    {
      id: '3',
      title: 'Institutional Grade Wealth & Trading Portal',
      category: 'Web Platforms',
      client: 'Aether Capital',
      metric: 'Under 12ms Streaming Latency',
      description: 'Ultra-fast Next.js & React SPA with sub-second order book streaming, real-time portfolio risk calculators, and biometrics-level authentication.',
      tags: ['React', 'Node.js', 'WebSocket', 'Tailwind CSS'],
    },
    {
      id: '4',
      title: 'Enterprise RAG Document Intelligence Suite',
      category: 'AI Automation',
      client: 'Novus Legal & Compliance',
      metric: '10x Faster Contract Review',
      description: 'Proprietary fine-tuned legal LLM model integrated with hybrid semantic graph search capable of cross-referencing 200,000 regulatory documents instantly.',
      tags: ['Fine-Tuned LLM', 'Graph RAG', 'Enterprise Security'],
    },
    {
      id: '5',
      title: 'Omnichannel Algorithmic Growth Engine',
      category: 'Growth',
      client: 'Kinetix SaaS',
      metric: '+340% Pipeline Expansion in 6 Months',
      description: 'End-to-end programmatic acquisition funnel combining hyper-targeted Google search campaigns, AI-written dynamic landing pages, and lead scoring.',
      tags: ['Programmatic SEO', 'Google Ads', 'HubSpot Integration'],
    },
    {
      id: '6',
      title: 'Luxury 3D Interactive Brand Flagship',
      category: 'Web Platforms',
      client: 'Chronos Horology',
      metric: '92% Average Session Engagement',
      description: 'Bespoke WebGL dark-mode experience featuring real-time 3D watch customizers, physics-driven lighting models, and seamless stripe checkout.',
      tags: ['Three.js', 'WebGL', 'Tailwind', 'Node.js'],
    },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-[2px] w-8 bg-[#E6B54A]" />
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFDF78]">
                Proven Impact
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Selected <span className="gold-text-gradient">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl">
              Real systems. Verified metrics. How INDOVA BEYOND delivers transformative outcomes for visionary brands.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeFilter === cat
                    ? 'bg-[#E6B54A] text-black shadow-[0_0_15px_rgba(230,181,74,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-[#E6B54A]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl p-7 glass-panel glass-card-hover flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6B54A]/30 group-hover:via-[#E6B54A] to-transparent transition-all" />

              <div>
                {/* Client & Category Badge */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#E6B54A]/10 text-[#FFDF78] font-semibold border border-[#E6B54A]/20">
                    {project.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#FFDF78] transition-colors leading-snug mb-3">
                  {project.title}
                </h3>

                {/* Key Metric Highlight */}
                <div className="mb-4 inline-flex items-center space-x-2 text-xs font-semibold text-[#FFDF78] bg-black/40 px-3 py-1.5 rounded-lg border border-[#E6B54A]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6B54A]" />
                  <span>{project.metric}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

