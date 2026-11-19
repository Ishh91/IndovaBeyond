import React, { useEffect, useState } from 'react';
import StatsCounter from '@/components/ui/stats-counter';
import { Trophy, Users, ShieldCheck, Headphones, ChevronsRight } from 'lucide-react';

// Counts up from 0 when the ribbon scrolls into view, e.g. "100+" -> 100 with a "+" suffix
const AnimatedValue: React.FC<{ value: string }> = ({ value }) => {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return <>{value}</>;
  return <StatsCounter value={Number(match[1])} suffix={match[2]} />;
};

interface StatsRibbonProps {
  onOpenQuote: () => void;
}

export const StatsRibbon: React.FC<StatsRibbonProps> = ({ onOpenQuote }) => {
  const [stats, setStats] = useState({
    projectsDelivered: '100+',
    happyClients: '500+',
    clientSatisfaction: '98%',
    support: '24/7 Support',
    headline: 'Your Trusted Partner in the AI-Powered Future',
  });

  useEffect(() => {
    // Attempt to fetch from Node.js Express backend
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(() => {
        // Fallback gracefully to default constants
      });
  }, []);

  const items = [
    {
      icon: Trophy,
      value: stats.projectsDelivered,
      label: 'Projects Delivered',
    },
    {
      icon: Users,
      value: stats.happyClients,
      label: 'Happy Clients',
    },
    {
      icon: ShieldCheck,
      value: stats.clientSatisfaction,
      label: 'Client Satisfaction',
    },
    {
      icon: Headphones,
      value: '24/7',
      label: 'Support',
    },
  ];

  return (
    <div className="w-full relative z-20 border-y border-[#E6B54A]/40 bg-gradient-to-r from-[#050608]/80 via-[#0D0F14]/85 to-[#050608]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(230,181,74,0.15)]">
      <div className="flex flex-col lg:flex-row lg:items-stretch">

        {/* 4 metric counters separated by gold dividers */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-y-5 py-5 px-4 sm:px-6 lg:pl-[5%] lg:pr-6 lg:divide-x lg:divide-[#E6B54A]/40">
          {items.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center justify-center lg:justify-start space-x-4 group px-2 lg:px-8 first:lg:pl-0">
                <Icon
                  strokeWidth={1.8}
                  className="w-9 h-9 sm:w-11 sm:h-11 text-[#E6B54A] drop-shadow-[0_0_10px_rgba(230,181,74,0.5)] flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="font-display text-xl sm:text-2xl font-bold gold-text-gradient leading-none mb-1.5">
                    <AnimatedValue value={stat.value} />
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-tight">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Angled gold banner flush with the right edge */}
        <button
          type="button"
          onClick={onOpenQuote}
          className="stats-banner cursor-pointer group relative overflow-hidden bg-gradient-to-r from-[#FFDF78] via-[#E6B54A] to-[#C9962E] text-black px-6 py-4 lg:pr-10 lg:w-[30%] flex items-center justify-center gap-5 text-center"
        >
          <span className="font-display text-sm sm:text-base font-medium leading-snug">
            Your Trusted Partner
            <br />
            in the <span className="font-extrabold">AI-Powered Future</span>
          </span>
          <ChevronsRight strokeWidth={2.5} className="w-9 h-9 flex-shrink-0 group-hover:translate-x-1 transition-transform" />

          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </button>

      </div>
    </div>
  );
};

