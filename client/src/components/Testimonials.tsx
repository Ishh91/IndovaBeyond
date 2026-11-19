import React from 'react';
import { Quote } from 'lucide-react';
import InteractiveBook, { BookPage } from '@/components/ui/interactive-book';
import { TestimonialsCard } from '@/components/ui/testimonials-card';

interface Testimonial {
  company: string;
  role: string;
  quote: string;
  result: string;
  resultLabel: string;
}

// PLACEHOLDER COPY: these quotes are sample text written around the case studies in the
// Portfolio section. Replace them with real, approved client testimonials before launch.
const testimonials: Testimonial[] = [
  {
    company: 'AeroTrans Global',
    role: 'Head of Operations',
    quote:
      'Dispatch used to eat most of our day. The agent pipeline INDOVA BEYOND built now handles customs, routing and carrier bids on its own, and our team finally works on exceptions instead of paperwork.',
    result: '84%',
    resultLabel: 'less manual dispatch work',
  },
  {
    company: 'Veloce Luxury Beauty',
    role: 'Growth Marketing Lead',
    quote:
      'We went from a handful of ad creatives a month to dozens of tested video hooks every week. The quality stayed on-brand and the numbers moved almost immediately.',
    result: '4.8x',
    resultLabel: 'return on Meta ad spend',
  },
  {
    company: 'Novus Legal & Compliance',
    role: 'Director of Legal Technology',
    quote:
      'Contract review was our bottleneck. Their document intelligence suite cross-references our regulatory library in seconds, and our lawyers trust the citations it gives back.',
    result: '10x',
    resultLabel: 'faster contract review',
  },
  {
    company: 'Kinetix SaaS',
    role: 'VP of Revenue',
    quote:
      'They rebuilt our acquisition funnel end to end: search campaigns, landing pages and lead scoring all feed one pipeline. Sales now spends its time on leads that actually close.',
    result: '+340%',
    resultLabel: 'pipeline growth in 6 months',
  },
];

const QuotePage: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div className="flex h-full flex-col">
    <Quote className="mb-3 h-6 w-6 text-[#C9962E]" />
    <p className="text-[13px] leading-relaxed text-neutral-700">{t.quote}</p>
    <div className="mt-5 border-t border-neutral-200 pt-3 font-sans">
      <div className="text-xs font-semibold text-neutral-800">{t.role}</div>
      <div className="text-[11px] uppercase tracking-wider text-[#B8860B]">{t.company}</div>
    </div>
  </div>
);

const ResultPage: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div className="flex h-full flex-col items-center justify-center text-center font-sans">
    <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">The result</div>
    <div className="mt-3 text-5xl font-extrabold text-[#B8860B]">{t.result}</div>
    <div className="mt-2 text-sm text-neutral-600">{t.resultLabel}</div>
    <div className="mt-6 text-[11px] uppercase tracking-wider text-neutral-500">{t.company}</div>
  </div>
);

const bookPages: BookPage[] = testimonials.map((t, i) => ({
  pageNumber: i + 1,
  title: t.company,
  content: <QuotePage t={t} />,
  backContent: <ResultPage t={t} />,
}));

// The card stack needs an image per story. There are no client photos, so each card
// shows the headline result as a generated gold-on-black tile.
const resultTile = (t: Testimonial) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="bg" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#1b1f2b"/><stop offset="1" stop-color="#050608"/></radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C5"/><stop offset=".45" stop-color="#E6B54A"/><stop offset="1" stop-color="#C9962E"/></linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg)"/>
    <rect x="18" y="18" width="364" height="364" rx="14" fill="none" stroke="#E6B54A" stroke-opacity=".45"/>
    <text x="200" y="205" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="${t.result.length > 4 ? 84 : 110}" fill="url(#gold)">${t.result}</text>
    <text x="200" y="252" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#cbd5e1">${t.resultLabel}</text>
    <text x="200" y="345" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" letter-spacing="3" fill="#E6B54A">${t.company.toUpperCase().replace(/&/g, '&amp;')}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const cardItems = testimonials.map((t) => ({
  id: t.company,
  title: `${t.role}, ${t.company}`,
  description: t.quote,
  image: resultTile(t),
}));

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E6B54A]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center space-x-5">
            <div className="h-[1.5px] w-12 sm:w-32 bg-gradient-to-r from-transparent to-[#E6B54A]" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Client <span className="gold-text-gradient">Stories</span>
            </h2>
            <div className="h-[1.5px] w-12 sm:w-32 bg-gradient-to-l from-transparent to-[#E6B54A]" />
          </div>
          <p className="text-sm sm:text-base text-slate-300">
            <span className="hidden md:inline">Open the book and turn the pages to read what our partners say.</span>
            <span className="md:hidden">What our partners say about working with us.</span>
          </p>
        </div>

        {/* Tablet and desktop: the interactive book */}
        <div className="hidden md:flex w-full justify-center overflow-hidden">
          <InteractiveBook
            coverImage="/assets/logo.jpg"
            bookTitle="Client Stories"
            bookAuthor="INDOVA BEYOND"
            pages={bookPages}
            width={320}
            height={440}
            className="flex-shrink-0"
          />
        </div>
        <p className="hidden md:block text-center text-xs text-slate-500 mt-2">
          Click the cover to open. Click a page or use the arrow keys to turn it, Esc to close.
        </p>

        {/* Phones: the same stories as a swipe-through card stack (the book is too small to read there) */}
        <div className="md:hidden">
          <TestimonialsCard items={cardItems} width={340} className="p-2 [&>div]:gap-y-5" />
        </div>
      </div>
    </section>
  );
};
