import React from 'react';
import { X, CheckCircle2, PackageCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from './Services';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForQuote,
}) => {
  useEscapeKey(!!service, onClose);

  if (!service) return null;

  const Icon = service.icon;

  return (
    <div role="dialog" aria-modal="true" aria-label={service.title} className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-b from-[#E6B54A] via-white/10 to-[#E6B54A]/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="relative rounded-[22px] bg-[#0A0C11] p-6 sm:p-9 max-h-[90vh] overflow-y-auto space-y-6">
          
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E2028] to-[#0A0C10] p-[1.5px] shadow-[0_0_20px_rgba(230,181,74,0.3)] flex-shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#090A0E] flex items-center justify-center">
                <Icon className="w-7 h-7 text-[#FFDF78]" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#E6B54A] font-semibold">
                {service.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Detailed Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {service.description}
          </p>

          {/* Capabilities Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#FFDF78]">
              <Sparkles className="w-4 h-4 text-[#E6B54A]" />
              <span>Architectural Capabilities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E6B54A] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 font-medium leading-snug">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Deliverables */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#FFDF78]">
              <PackageCheck className="w-4 h-4 text-[#E6B54A]" />
              <span>Standard Enterprise Deliverables</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E6B54A] mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-light leading-snug">
                    {deliv}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Fixed-milestone agreements • Dedicated technical lead
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectForQuote(service.title);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] to-[#E6B54A] text-black hover:shadow-[0_0_25px_rgba(230,181,74,0.5)] transition-all flex items-center justify-center space-x-2"
            >
              <span>Request Scope for this Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

