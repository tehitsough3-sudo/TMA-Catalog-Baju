import React, { useState } from 'react';
import { Eye, MonitorPlay, Sparkles, Trophy, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface WatchAdsTabProps {
  adsgramPoints: number;
  setAdsgramPoints: React.Dispatch<React.SetStateAction<number>>;
  incrementWatchAdCount: () => void;
  addLog: (log: string) => void;
  triggerAdPlayerOnComplete: () => void;
}

export const WatchAdsTab: React.FC<WatchAdsTabProps> = ({
  adsgramPoints,
  setAdsgramPoints,
  incrementWatchAdCount,
  addLog,
  triggerAdPlayerOnComplete,
}) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#0C0D14] pb-12 select-none">
      <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-900">
        <h3 className="text-md font-bold text-white tracking-tight">Earn Ad Rewards</h3>
        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Watch & Earn</span>
      </div>

      <div className="space-y-5">
        
        {/* Core Points Showcase Card - Matches fitness styling */}
        <div className="bg-gradient-to-br from-[#121422] to-[#0D0F1A] border border-gray-850 p-5 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto animate-float">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Your Adsgram Balance</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-0.5">{adsgramPoints} <span className="text-sm font-bold text-gray-400 font-sans">PTS</span></div>
          </div>
          <div className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Earning points helps unlock free items and discount tokens instantly at checkout. Each ad view awards <b>100 PTS</b>!
          </div>
        </div>

        {/* Video stream simulator trigger item */}
        <div className="bg-[#12141C] border border-gray-850 p-4.5 rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">Interactive Reward Clip</h4>
              <p className="text-[10px] text-gray-500 leading-normal">Watch 4s of sponsor content to gain rewards</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">+100 PTS</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={triggerAdPlayerOnComplete}
            className="w-full bg-emerald-500 text-black hover:bg-emerald-400 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <MonitorPlay className="w-4 h-4 fill-black" />
            Watch Video Ad (Adsgram SDK)
          </motion.button>
        </div>

        {/* Points Benefits Table */}
        <div className="bg-[#12141C]/50 border border-gray-850/60 rounded-2xl p-4 space-y-3 font-medium">
          <h4 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-orange-400" /> Redemption Guide
          </h4>
          <div className="space-y-2 text-xs text-gray-400 leading-normal">
            <div className="flex justify-between pb-1.5 border-b border-gray-900">
              <span>Sponsor ads complete:</span>
              <span className="text-white">+100 PTS</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-gray-900">
              <span>Next clothing discount token:</span>
              <span className="text-emerald-400 font-bold font-mono">3 watched</span>
            </div>
            <p className="text-[9px] text-gray-500 leading-normal pt-1.5">
              Simulasi SDK Adsgram terintegrasi secara modular dengan state machine browser ini secara real-time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
