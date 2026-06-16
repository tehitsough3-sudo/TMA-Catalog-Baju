import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Cpu, RefreshCw, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface TelegramAuthGateProps {
  authStatus: 'valid' | 'invalid';
  onSuccess: () => void;
  addLog: (log: string) => void;
}

export const TelegramAuthGate: React.FC<TelegramAuthGateProps> = ({
  authStatus,
  onSuccess,
  addLog,
}) => {
  const [stage, setStage] = useState<'checking' | 'error' | 'success'>('checking');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStage('checking');
    setProgress(0);
    addLog(`Initiating Telegram WebApp handshake...`);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        if (authStatus === 'valid') {
          setStage('success');
          addLog(`Telegram auth signature verified successfully! Hash match ok.`);
          setTimeout(() => {
            onSuccess();
          }, 850);
        } else {
          setStage('error');
          addLog(`CRITICAL: Telegram WebApp verification signature mismatch. Rejecting connection.`);
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [authStatus]);

  return (
    <div className="flex-1 flex flex-col justify-between items-center p-6 bg-[#0B0C10] text-gray-200 text-center select-none">
      
      {/* Top Graphic Area */}
      <div className="w-full flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-gray-600 border-b border-gray-900 pb-2">
        <span>TG://WEBAPP</span>
        <span className="flex items-center gap-1">
          <Smartphone className="w-3 h-3" /> SECURITY GATEWAY
        </span>
      </div>

      {stage === 'checking' && (
        <div className="my-auto space-y-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* outer glowing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
            <Cpu className="w-8 h-8 text-emerald-400" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">Cek Telegram Auth</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              Verifying credentials with secure Telegram gateway standard crypt-hash...
            </p>
          </div>

          <div className="w-48 bg-gray-900 h-1.5 rounded-full mx-auto overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-150" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/80 block">{progress}% CHECKED</span>
        </div>
      )}

      {stage === 'error' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-auto space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/30 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          <div className="space-y-2 px-4">
            <h3 className="text-xl font-extrabold text-white tracking-tight">Tampilkan Error</h3>
            <div className="bg-red-950/20 text-red-400 text-xs px-4 py-2.5 rounded-lg border border-red-900/40 font-mono text-left max-w-xs leading-relaxed space-y-1">
              <div>[API_VERIFY_ERROR]</div>
              <div>Code: 403 (Invalid Signature)</div>
              <div>Hash check failed. Access denied.</div>
            </div>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed pt-2">
              The Telegram auth signature is invalid or altered. If you are developing locally, please use the <b>Simulator Controller</b> sidebar to toggle the Auth Status to "Valid".
            </p>
          </div>

          <button
            onClick={() => {
              addLog(`Retrying Telegram handshake handshake...`);
              setStage('checking');
              setProgress(0);
              let currPro = 0;
              const intv = setInterval(() => {
                currPro += 20;
                setProgress(currPro);
                if (currPro >= 100) {
                  clearInterval(intv);
                  if (authStatus === 'valid') {
                    setStage('success');
                    setTimeout(() => onSuccess(), 800);
                  } else {
                    setStage('error');
                  }
                }
              }, 100);
            }}
            className="px-5 py-2.5 bg-gray-900 hover:bg-gray-850 text-white rounded-xl text-xs font-semibold border border-gray-800 transition shadow hover:shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-4.5 h-4.5 text-gray-400" /> Retry Verification
          </button>
        </motion.div>
      )}

      {stage === 'success' && (
        <div className="my-auto space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="space-y-1.5 animate-pulse">
            <h3 className="text-lg font-bold text-white">Verification Success</h3>
            <p className="text-xs text-emerald-400 font-medium">Entering Dashboard Unclothes...</p>
          </div>
        </div>
      )}

      {/* Info footprint line */}
      <div className="text-[9px] text-gray-600 font-mono">
        SECURE GATEWAY ENFORCED • TLS 1.3
      </div>
    </div>
  );
};
