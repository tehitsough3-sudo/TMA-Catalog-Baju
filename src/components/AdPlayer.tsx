import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Tv, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AdPlayerProps {
  onSuccess: () => void;
  addLog: (log: string) => void;
}

export const AdPlayer: React.FC<AdPlayerProps> = ({ onSuccess, addLog }) => {
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [muted, setMuted] = useState(true);
  const [stage, setStage] = useState<'playing' | 'rewarded'>('playing');

  useEffect(() => {
    addLog(`Loading Adsgram SDK video player...`);
    addLog(`Adsgram script tag found: loading responsive iframe banner...`);
    addLog(`Playing Adsgram rewarded video ad. ID: ad_684920`);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 && stage === 'playing') {
      setStage('rewarded');
      addLog(`Adsgram: Reward event triggered. user_rewarded=true`);
      addLog(`Applied discount token to active checkout session.`);
      
      const timeout = setTimeout(() => {
        onSuccess();
      }, 1500);
      return () => clearTimeout(timeout);
    } else if (secondsLeft > 0 && secondsLeft < 4) {
      addLog(`Playing ad clip... user must watch ${secondsLeft} more seconds.`);
    }
  }, [secondsLeft, stage]);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#090A0E] text-white select-none">
      
      {/* Top Bar with logo and mute */}
      <div className="flex justify-between items-center bg-[#12141C] p-3 rounded-xl border border-gray-850">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold uppercase font-sans">
          <Tv className="w-4 h-4 fill-emerald-500/10" /> ADSGRAM SDK INTEGRATION
        </div>
        <button 
          onClick={() => setMuted(!muted)}
          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {stage === 'playing' ? (
        <div className="my-auto space-y-6">
          {/* Main Visual TV screen representing simulated video ad */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-gray-950 via-slate-900 to-gray-950 border border-gray-850 flex flex-col items-center justify-center p-4">
            
            {/* Animated pulsating visual lines */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent top-1/4 animate-pulse" />
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent top-2/3 animate-pulse" />

            {/* Glowing circle representing fashion presentation */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-bounce mb-3">
              <Sparkles className="text-emerald-400 w-8 h-8" />
            </div>

            <p className="text-xs font-bold text-center tracking-tight text-white max-w-xs leading-snug">
              "Minimal design, durable materials. Discover Unclothes streetwear collections."
            </p>
            <span className="text-[9px] text-gray-500 font-mono mt-2 font-bold block bg-gray-950 px-2 py-0.5 rounded border border-gray-850">
              ADVERTISER: Brand Unclothes Ltd
            </span>

            {/* Floating timer overlay absolute */}
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 font-mono text-xs font-bold text-emerald-400">
              Ad: {secondsLeft}s
            </div>
          </div>

          <div className="space-y-1.5 text-center">
            <h4 className="text-sm font-extrabold text-white">Watching Advertisement</h4>
            <p className="text-[11px] text-gray-400 leading-normal max-w-xs mx-auto">
              Please watch the video completely to receive your <b>50% TON discount token</b>.
            </p>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-auto space-y-5 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center check-success glow-emerald animate-bounce">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white tracking-tight">Reward Success</h4>
            <span className="text-xs text-emerald-400 font-extrabold tracking-wide uppercase block">Diskon 50% Aktif!</span>
            <p className="text-[10px] text-gray-500 max-w-xs mx-auto pt-1 leading-relaxed">
              Adsgram SDK has verified ad-view completion. Your discount is successfully applied to this order. Moving to wallet check!
            </p>
          </div>
        </motion.div>
      )}

      {/* Embedded Developers Info */}
      <div className="bg-[#12141C] p-3 rounded-xl border border-gray-850">
        <span className="text-[9px] uppercase font-mono text-gray-500 tracking-wider font-semibold block mb-1">
          Adsgram Sandbox Console:
        </span>
        <div className="font-mono text-[9px] text-emerald-500/80 leading-relaxed space-y-0.5">
          <div>&gt; Object.assign(window, {"{"} Adsgram: true {"}"})</div>
          <div>&gt; Event: onRewardComplete()</div>
          <div>&gt; Status: OK. Token issued.</div>
        </div>
      </div>

    </div>
  );
};
