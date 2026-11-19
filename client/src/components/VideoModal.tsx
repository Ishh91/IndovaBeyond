import React, { useState } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Our story" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-lg transition-opacity"
      />

      {/* Video Cinema Container */}
      <div className="relative w-full max-w-4xl rounded-3xl p-[1.5px] bg-gradient-to-b from-[#E6B54A] via-white/10 to-[#E6B54A]/30 shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        <div className="relative rounded-[22px] bg-[#07080B] overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs uppercase tracking-widest font-mono text-[#FFDF78] font-bold">
                INDOVA BEYOND // Strategic Vision Film
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cinematic Canvas / Player Simulation */}
          <div className="relative aspect-video w-full bg-gradient-to-b from-[#0E1017] via-[#050608] to-[#0A0D14] flex flex-col items-center justify-center p-8 overflow-hidden select-none">
            
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,181,74,0.15)_0%,transparent_70%)]" />

            {/* Glowing Logo Monogram */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1E2028] to-[#090A0D] p-[2px] shadow-[0_0_40px_rgba(230,181,74,0.5)]">
                <img
                  src="/assets/logo.jpg"
                  alt="INDOVA BEYOND"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>

              <div className="space-y-2 max-w-xl">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  The Genesis of <span className="gold-text-gradient">INDOVA BEYOND</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  "Where conventional development finishes, our architecture begins. We engineered a machine intelligence company that bridges speculative frontier AI with ruthlessly profitable enterprise execution."
                </p>
              </div>

              {/* Futuristic Sound Wave Bars */}
              <div className="flex items-center space-x-1.5 h-8">
                {[40, 70, 90, 50, 100, 85, 45, 65, 80, 55, 95, 60, 75, 40, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#E6B54A] rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${h}%` : '20%',
                      opacity: isPlaying ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Simulated Player Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between z-20">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-2 rounded-full bg-[#E6B54A] text-black hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs font-mono text-slate-400">
                  {isPlaying ? '01:42 / 03:15' : 'PAUSED'}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFDF78] to-[#E6B54A] text-black hover:shadow-[0_0_20px_rgba(230,181,74,0.5)] transition-all"
              >
                Schedule Executive Briefing
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

