import React from 'react';
import { Shield, RefreshCw, Key, Landmark, Eye, Terminal } from 'lucide-react';

interface DevPanelProps {
  authStatus: 'valid' | 'invalid';
  setAuthStatus: (status: 'valid' | 'invalid') => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
  adsgramPoints: number;
  setAdsgramPoints: React.Dispatch<React.SetStateAction<number>>;
  logs: string[];
  clearLogs: () => void;
  resetAll: () => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({
  authStatus,
  setAuthStatus,
  walletConnected,
  setWalletConnected,
  walletBalance,
  setWalletBalance,
  adsgramPoints,
  setAdsgramPoints,
  logs,
  clearLogs,
  resetAll,
}) => {
  return (
    <div className="bg-[#12141C] border-l border-gray-800 text-gray-300 w-full lg:w-80 p-6 flex flex-col justify-between h-full font-sans">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-850">
          <Terminal className="text-emerald-500 w-5 h-5" />
          <h2 className="text-lg font-bold text-white tracking-tight">Simulator Controller</h2>
        </div>

        {/* Telegram Auth Control */}
        <div className="mb-6 space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
            <Key className="w-3.5 h-3.5 text-emerald-400" /> Telegram Authentication
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setAuthStatus('valid')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${
                authStatus === 'valid'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-gray-900 border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Valid (Alex Profile)
            </button>
            <button
              onClick={() => setAuthStatus('invalid')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${
                authStatus === 'invalid'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-gray-900 border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Invalid / Signature Error
            </button>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Choose if the Telegram Mini App <code>initData</code> hash check resolves as authentic.
          </p>
        </div>

        {/* TON Wallet Connection Control */}
        <div className="mb-6 space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-blue-400" /> TON Wallet Control
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setWalletConnected(true)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${
                walletConnected
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  : 'bg-gray-900 border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Connected
            </button>
            <button
              onClick={() => setWalletConnected(false)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${
                !walletConnected
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-gray-900 border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Disconnected
            </button>
          </div>
          
          <div className="space-y-1 pt-1">
            <span className="text-[11px] text-gray-400 flex justify-between">
              <span>Simulated Balance:</span>
              <span className="text-bold text-white">{walletBalance.toFixed(2)} TON</span>
            </span>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={walletBalance}
              onChange={(e) => setWalletBalance(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Adsgram Control */}
        <div className="mb-6 space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-emerald-400" /> Adsgram Points
          </label>
          <div className="flex items-center justify-between bg-gray-900/60 p-2.5 rounded-lg border border-gray-850">
            <span className="text-sm font-mono text-white">{adsgramPoints} PTS</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setAdsgramPoints(prev => Math.max(0, prev - 100))}
                className="bg-gray-800 hover:bg-gray-700 px-2.5 py-1 rounded text-xs text-gray-300 cursor-pointer"
              >
                -100
              </button>
              <button
                onClick={() => setAdsgramPoints(prev => prev + 100)}
                className="bg-gray-800 hover:bg-gray-700 px-2.5 py-1 rounded text-xs text-gray-300 cursor-pointer"
              >
                +100
              </button>
            </div>
          </div>
        </div>

        {/* Console Log Screen */}
        <div className="bg-black/40 border border-gray-850 rounded-xl p-3 flex-1 flex flex-col min-h-[160px] max-h-[220px]">
          <div className="flex justify-between items-center mb-2.5 pb-1.5 border-b border-gray-850/80">
            <span className="text-[11px] font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Device Logs
            </span>
            <button
              onClick={clearLogs}
              className="text-[10px] text-gray-500 hover:text-white hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>
          <div className="font-mono text-[10px] text-gray-400 overflow-y-auto space-y-1.5 flex-1 pr-1 select-all">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-normal">
                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-gray-600 italic">No logs... interact with the Mini App to record.</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-gray-850 flex flex-col gap-2">
        <button
          onClick={resetAll}
          className="w-full bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 hover:text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Simulator State
        </button>
        <div className="text-[10px] text-gray-600 text-center">
          Unclothes TON Sandbox v1.0.0
        </div>
      </div>
    </div>
  );
};
