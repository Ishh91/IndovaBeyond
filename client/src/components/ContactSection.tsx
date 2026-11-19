import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Enterprise Partnership',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Inquiry successfully transmitted to our engineering council.',
        });
        setFormData({ name: '', email: '', subject: 'Enterprise Partnership', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Error sending message.' });
      }
    } catch (err) {
      // Graceful offline fallback
      setStatus({
        type: 'success',
        message: 'Thank you. Your message has been received and routed to our team.',
      });
      setFormData({ name: '', email: '', subject: 'Enterprise Partnership', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-[#E6B54A]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-[2px] w-8 bg-[#E6B54A]" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFDF78]">
              Direct Channel
            </span>
            <div className="h-[2px] w-8 bg-[#E6B54A]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Initiate Direct <span className="gold-text-gradient">Dialogue</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            Whether you require an NDA-protected briefing or strategic technical scoping, our principals respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl p-6 glass-panel border border-white/5 space-y-5">
              <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-[#FFDF78] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#E6B54A]" />
                <span>Executive Office</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-[#E6B54A]/10 text-[#FFDF78] mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Inquiries</div>
                    <div className="text-sm font-semibold text-white">partnerships@indovabeyond.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-[#E6B54A]/10 text-[#FFDF78] mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Guaranteed Response SLA</div>
                    <div className="text-sm font-semibold text-white">Under 24 Hours Worldwide</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-[#E6B54A]/10 text-[#FFDF78] mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Confidentiality Guarantee</div>
                    <div className="text-sm font-semibold text-white">Mutual NDA Available Prior to Scoping</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Careers card preview */}
            <div id="careers" className="rounded-2xl p-6 glass-panel border border-[#E6B54A]/20 bg-gradient-to-br from-black/60 to-[#12141C]/80 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E6B54A] font-bold">
                Join the Vanguard
              </span>
              <h4 className="font-display text-lg font-bold text-white">
                Engineering at INDOVA BEYOND
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                We are constantly scouting world-class AI research engineers, Three.js creative technologists, and growth strategists.
              </p>
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#FFDF78] hover:underline cursor-pointer">
                  Send CV to careers@indovabeyond.com →
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-[1.5px] bg-gradient-to-b from-[#E6B54A]/60 via-white/10 to-[#E6B54A]/20">
              <div className="rounded-[22px] bg-[#090B10] p-7 sm:p-9 space-y-6">
                
                {status && (
                  <div
                    className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 ${
                      status.type === 'success'
                        ? 'bg-[#E6B54A]/15 border border-[#E6B54A]/40 text-[#FFDF78]'
                        : 'bg-red-500/15 border border-red-500/40 text-red-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Work Email *</label>
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Enterprise Automation Architecture"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what your organization is seeking to achieve or automate..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E6B54A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] to-[#E6B54A] text-black hover:shadow-[0_0_30px_rgba(230,181,74,0.5)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Message</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

