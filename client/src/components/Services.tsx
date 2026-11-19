import React, { useState } from 'react';
import { 
  Cpu, 
  Video, 
  Code, 
  BarChart3, 
  CloudLightning, 
  Handshake, 
  ArrowRight
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  shortDesc: string;
  description: string;
  features: string[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Software Development',
    category: 'Core AI & Architecture',
    icon: Cpu,
    shortDesc: 'Automate business workflows and engineer high-scale AI systems tailored to enterprise logic.',
    description: 'We construct end-to-end intelligent automation engines that replace repetitive manual tasks with high-precision autonomous agents, custom fine-tuned LLMs, and distributed microservices.',
    features: [
      'Autonomous Workflow Automation Agents',
      'Custom LLM Fine-Tuning & High-Performance RAG',
      'Enterprise API & Distributed Backend Systems',
      'Automated Document & Invoice Intelligence'
    ],
    deliverables: [
      'Production-ready API & Orchestration Engine',
      'Full CI/CD Pipeline & Cloud Deployment',
      'Admin Monitoring Dashboard & Telemetry',
      'Ongoing Security & Model Drift Management'
    ]
  },
  {
    id: 'ai-videos',
    title: 'AI Videos & Ads Creation',
    category: 'Generative Media',
    icon: Video,
    shortDesc: 'Hyper-realistic video generation, viral ad hooks, and photorealistic virtual avatars that scale conversion.',
    description: 'Transform your marketing ROI with hyper-realistic AI-generated avatars, automated dynamic video variation testing, and photorealistic 3D product motion graphics produced in days, not months.',
    features: [
      'Photorealistic Digital Humans & AI Spokespersons',
      'Multilingual Instant Voice Cloning & Lip-Sync',
      'High-Hook Direct Response Ad Creatives',
      'Automated B-Roll & Visual Effects Generation'
    ],
    deliverables: [
      '30+ Ready-to-Publish Ad Variations',
      'Custom Digital Avatar IP Asset',
      'Social Platform Formats (9:16, 16:9, 1:1)',
      'A/B Performance Creative Retest Strategy'
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Full-Stack Engineering',
    icon: Code,
    shortDesc: 'Bespoke web platforms built with React, Node, and modern tech stacks for maximum speed and luxury aesthetics.',
    description: 'We craft high-performance digital flagship web experiences engineered for lightning-fast responsiveness, conversion psychology, and immersive dark-mode luxury aesthetics.',
    features: [
      'Ultra-Fast React, Next.js & Node.js Architecture',
      'Bespoke Interactive 3D Canvas / WebGL Experiences',
      'Tailwind CSS Responsive & Accessible Layouts',
      'Seamless Payment Gateway & CRM Integrations'
    ],
    deliverables: [
      'Full Source Code & Git Repository',
      '100/100 Lighthouse Performance Audit',
      'Interactive CMS / Headless Content Architecture',
      'Global Edge CDN Setup & DDoS Shielding'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Algorithmic Growth',
    icon: BarChart3,
    shortDesc: 'Data-driven omnichannel campaigns, algorithmic paid acquisition, and viral brand positioning.',
    description: 'Scale acquisition profitably through precision algorithmic targeting, predictive customer lifetime value modeling, and multi-channel marketing campaigns across Google, Meta, and LinkedIn.',
    features: [
      'Algorithmic Meta & Google Performance Ads',
      'High-Intent Programmatic SEO Architecture',
      'Full-Funnel Conversion Rate Optimization (CRO)',
      'Automated Retargeting & Email Omnichannel Funnels'
    ],
    deliverables: [
      'Custom Multi-Touch Attribution Dashboard',
      'Scalable Weekly Media Spend Protocols',
      'High-Converting Landing Page Copy & Creative',
      'Monthly Strategic Executive Growth Reports'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Consulting',
    category: 'Strategic Advisory',
    icon: CloudLightning,
    shortDesc: 'End-to-end strategic guidance to integrate cutting-edge machine learning into legacy operations seamlessly.',
    description: 'De-risk your technological evolution with tier-1 executive advisory. We pinpoint your most profitable AI integration opportunities and deploy secure, compliance-ready enterprise architectures.',
    features: [
      'Enterprise AI Readiness & Security Auditing',
      'Data Lakehouse & Vector Database Structuring',
      'Proprietary ML Model Selection & Evaluation',
      'AI Governance & Regulatory Compliance Standards'
    ],
    deliverables: [
      'Executive AI Strategic Roadmap (3-5 Years)',
      'Data Pipeline & Vector Architecture Blueprint',
      'Cost-Benefit & ROI Analysis Documentation',
      'Hands-On Staff Training & Prompt Engineering Playbook'
    ]
  },
  {
    id: 'business-growth',
    title: 'Business Growth Strategies',
    category: 'Scale & Monetization',
    icon: Handshake,
    shortDesc: 'Holistic growth frameworks aligning tech, brand equity, and execution to propel market dominance.',
    description: 'We partner directly with founders and leadership teams to architect resilient monetization loops, corporate expansion pathways, and automated enterprise sales pipelines.',
    features: [
      'Go-To-Market (GTM) Playbook & Global Launch',
      'Enterprise Deal Flow & CRM Pipeline Automation',
      'Unit Economic Optimization & Pricing Power',
      'Strategic Partnerships & Joint Venture Architecture'
    ],
    deliverables: [
      'Complete GTM Playbook & Execution Milestones',
      'Sales Pipeline Tracking Dashboard',
      'Competitor Disruption & Moat Matrix',
      'Bi-Weekly Founder Strategy Masterminds'
    ]
  }
];

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

const ServiceCard: React.FC<{
  service: ServiceItem;
  index: number;
  onSelect: () => void;
}> = ({ service, index, onSelect }) => {
  const Icon = service.icon;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer rounded-2xl p-4 sm:p-5 glass-panel glass-card-hover flex flex-col items-center text-center gap-3 overflow-hidden border border-white/10 hover:border-[#E6B54A]/60 transition-all duration-300"
    >
      {/* Dynamic Mouse Spotlight inside the card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 181, 74, 0.18), transparent 70%)`,
          }}
        />
      )}

      {/* Top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6B54A]/40 group-hover:via-[#E6B54A] to-transparent transition-all duration-500" />

      {/* High-tech index badge */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-[#FFDF78] transition-colors pb-1">
        <span>[0{index + 1}]</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E6B54A] font-bold">READY</span>
      </div>

      {/* Icon with glowing backdrop aura */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#E6B54A]/25 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E2028] to-[#0A0C10] p-[1.5px] border border-white/5 group-hover:border-[#E6B54A]/50 transition-colors shadow-lg">
          <div className="w-full h-full rounded-[10px] bg-[#07080B] flex items-center justify-center">
            <Icon
              strokeWidth={1.8}
              className="w-6 h-6 text-[#E6B54A] drop-shadow-[0_0_8px_rgba(230,181,74,0.5)] group-hover:text-[#FFDF78] group-hover:scale-110 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <h3 className="font-display text-sm sm:text-[15px] font-semibold text-slate-100 group-hover:text-[#FFDF78] transition-colors leading-snug min-h-[2.6rem] flex items-center justify-center">
        {service.title}
      </h3>

      <div className="w-7 h-7 rounded-full border border-[#E6B54A]/70 group-hover:bg-[#E6B54A] group-hover:border-[#E6B54A] flex items-center justify-center transition-all duration-300 shadow-[0_0_10px_rgba(230,181,74,0.2)] group-hover:shadow-[0_0_15px_rgba(230,181,74,0.6)]">
        <ArrowRight className="w-3.5 h-3.5 text-[#FFDF78] group-hover:text-black transition-colors" />
      </div>
    </button>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative pt-8 pb-10 lg:pt-10 lg:pb-12 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E6B54A]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Golden Accent Wings */}
        <div className="text-center max-w-3xl mx-auto mb-7 space-y-2">
          <div className="flex items-center justify-center space-x-5">
            <div className="h-[1.5px] w-16 sm:w-40 bg-gradient-to-r from-transparent to-[#E6B54A]" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center space-x-2.5">
              <span>Our</span>
              <span className="gold-text-gradient">Services</span>
            </h2>
            <div className="h-[1.5px] w-16 sm:w-40 bg-gradient-to-l from-transparent to-[#E6B54A]" />
          </div>

          <p className="text-sm sm:text-base text-slate-300 tracking-wide">
            Comprehensive digital solutions for your business growth
          </p>
        </div>

        {/* 6 compact service cards in a single row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={() => onSelectService(service)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
