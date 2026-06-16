import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Radio } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [time, setTime] = useState('14:38');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[820px] bg-[#090A0F] rounded-[50px] p-3.5 shadow-[0_0_80px_rgba(0,0,0,0.85)] border-[4px] border-[#22242B] flex flex-col overflow-hidden group select-none">
      
      {/* Top Outer Gloss Frame Accent */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[46px]" />

      {/* Screen Container */}
      <div className="relative w-full h-full bg-[#0A0A0E] rounded-[38px] overflow-hidden flex flex-col border border-white/5">
        
        {/* iOS StatusBar */}
        <div className="relative h-11 px-7 flex justify-between items-center z-50 text-white font-medium text-xs select-none pointer-events-none bg-[#0A0A0E]">
          
          {/* Time widget on the left */}
          <span className="font-semibold tracking-tight text-white/90">{time}</span>

          {/* Simulated iOS Dynamic Island / Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[110px] h-7 bg-black rounded-3xl flex items-center justify-center border border-white/5 shadow-inner">
            {/* Camera dot highlight */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D14] ml-auto mr-3 border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/40" />
            </div>
          </div>

          {/* Right side connection widget icons */}
          <div className="flex items-center gap-1.5 text-white/90">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-semibold tracking-widest">LTE</span>
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <Battery className="w-4 h-4 ml-0.5" />
            </div>
          </div>
        </div>

        {/* Dynamic Client Body Canvas */}
        <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#0C0D14]">
          {children}
        </div>

        {/* Simulated iOS Home Indicator Bar */}
        <div className="h-6 w-full flex justify-center items-center bg-[#0C0D14] border-t border-white/[0.02] z-50 select-none pointer-events-none">
          <div className="w-[120px] h-[4.5px] bg-white/30 rounded-full" />
        </div>

      </div>
    </div>
  );
};
