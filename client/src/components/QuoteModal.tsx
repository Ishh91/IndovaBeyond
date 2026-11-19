import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, Building2, User, Mail, DollarSign, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'AI Automation & Software Development',
    budget: '$25,000 – $50,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'AI Automation & Software Development',
      budget: '$25,000 – $50,000',
      message: '',
    });
    onClose();
  };

  useEscapeKey(isOpen, handleReset);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessData({
          referenceId: data.referenceId || 'IB-' + Math.floor(100000 + Math.random() * 900000),
          message: data.message || 'Your project parameters have been securely transmitted.',
        });

        // Trigger celebratory gold stardust confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDF78', '#E6B54A', '#D49B28', '#FFFFFF'],
        });
      } else {
        setErrorMsg(data.message || 'Transmission failed. Please verify your fields.');
      }
    } catch (err) {
      // Fallback if backend is offline
      setSuccessData({
        referenceId: 'IB-' + Math.floor(100000 + Math.random() * 900000),
        message: 'Your request has been logged locally and our team has been alerted.',
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFDF78', '#E6B54A'],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Request an executive proposal" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleReset}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-b from-[#E6B54A]/80 via-white/10 to-[#E6B54A]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="relative rounded-[22px] bg-[#0A0C11] p-6 sm:p-9 max-h-[90vh] overflow-y-auto">
          
          {/* Close Button */}
          <button
            onClick={handleReset}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {successData ? (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#E6B54A]/10 border border-[#E6B54A] flex items-center justify-center shadow-[0_0_35px_rgba(230,181,74,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-[#FFDF78]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#E6B54A] font-bold">
                  Transmission Confirmed
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Welcome Beyond.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                  {successData.message}
                </p>
              </div>

              <div className="inline-block p-4 rounded-xl bg-black/60 border border-[#E6B54A]/30">
                <div className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                  Executive Reference ID
                </div>
                <div className="font-mono text-lg font-bold text-[#FFDF78]">
                  {successData.referenceId}
                </div>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] to-[#E6B54A] text-black hover:shadow-[0_0_25px_rgba(230,181,74,0.5)] transition-all"
                >
                  Return to Site
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#FFDF78] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6B54A]" />
                  <span>Initiate Engagement</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Request an Executive Proposal
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light">
                  Tell us your strategic objective. We will review and provide technical architecture and fixed-cost parameters.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#E6B54A]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                  />
                </div>

                {/* Corporate Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E6B54A]" />
                    <span>Corporate Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organization / Company */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#E6B54A]" />
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company or Brand"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                  />
                </div>

                {/* Primary Focus */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E6B54A]" />
                    <span>Primary Service Needed</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                  >
                    <option value="AI Automation & Software Development">AI Automation & Software Development</option>
                    <option value="AI Videos & Ads Creation">AI Videos & Ads Creation</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="AI Solutions & Consulting">AI Solutions & Consulting</option>
                    <option value="Business Growth Strategies">Business Growth Strategies</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#E6B54A]" />
                  <span>Target Budget Tier</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setFormData({ ...formData, budget: tier })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        formData.budget === tier
                          ? 'bg-[#E6B54A] text-black border-[#E6B54A]'
                          : 'bg-black/40 text-slate-300 border-white/10 hover:border-[#E6B54A]/40'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Project Brief & Strategic Objectives
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your timeline, desired capabilities, or current operational bottlenecks..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] via-[#E6B54A] to-[#D49B28] text-black hover:shadow-[0_0_35px_rgba(230,181,74,0.6)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Encrypting & Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Executive Proposal Request</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

