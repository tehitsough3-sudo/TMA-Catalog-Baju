import React from 'react';
import { CreditCard, Landmark, RefreshCw, Send, Plus, ArrowDownLeft } from 'lucide-react';
import { User } from '../types';
import { motion } from 'motion/react';

interface WalletTabProps {
  user: User;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onAddFunds: (amount: number) => void;
  addLog: (log: string) => void;
}

export const WalletTab: React.FC<WalletTabProps> = ({
  user,
  onConnectWallet,
  onDisconnectWallet,
  onAddFunds,
  addLog,
}) => {
  return (
    <div className="flex-grow flex flex-col justify-between p-6 bg-[#0C0D14] overflow-y-auto pb-12 select-none select-none">
      
      {/* Scrollable contents wrapper */}
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-900">
          <h3 className="text-md font-bold text-white tracking-tight">TON Network</h3>
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Ton Connect v2</span>
        </div>

        {user.walletAddress ? (
          /* CONNECTED STATE PANEL */
          <div className="space-y-5">
            {/* Wallet Credit Card */}
            <div className="relative bg-gradient-to-tr from-[#1E293B] via-[#0F172A] to-[#1E293B] border border-gray-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-[155px] overflow-hidden group">
              {/* glow circle background */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/15 transition-all" />

              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Consensus Wallet Connected</span>
                  <div className="text-xl font-extrabold text-white font-mono leading-none pt-1">
                    {user.walletBalanceTON.toFixed(2)} <span className="text-xs text-blue-400">TON</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs select-none">
                  💎
                </div>
              </div>

              {/* address display */}
              <div className="space-y-1 z-10 pt-2">
                <span className="text-[8.5px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Ledger Address</span>
                <span className="text-xs font-mono text-gray-300 font-semibold truncate block">
                  {user.walletAddress}
                </span>
              </div>
            </div>

            {/* Quick Actions (Add Funds) */}
            <div className="bg-[#12141C] border border-gray-850 p-4 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white tracking-tight">Simulated Wallet Actions</h4>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => {
                    onAddFunds(1.5);
                    addLog(`Injected +1.50 TON to simulated wallet state.`);
                  }}
                  className="bg-gray-900 border border-gray-850 py-2.5 px-3 rounded-xl text-xs text-gray-300 font-bold hover:text-white hover:bg-gray-850 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  +1.5 TON
                </button>
                <button
                  onClick={() => {
                    onAddFunds(5.0);
                    addLog(`Injected +5.00 TON to simulated wallet state.`);
                  }}
                  className="bg-gray-900 border border-gray-850 py-2.5 px-3 rounded-xl text-xs text-gray-300 font-bold hover:text-white hover:bg-gray-850 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  +5.0 TON
                </button>
              </div>
            </div>

            {/* Disconnect CTA */}
            <button
              onClick={() => {
                onDisconnectWallet();
                addLog(`Wallet state disconnected manually.`);
              }}
              className="w-full bg-red-950/15 hover:bg-red-950/30 border border-red-900/30 text-red-400 hover:text-red-300 py-3 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          /* DISCONNECTED STATE PANEL */
          <div className="space-y-5 text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-850 flex items-center justify-center text-gray-400 mx-auto animate-float">
              <CreditCard className="w-8 h-8" />
            </div>
            <div className="space-y-1 px-2">
              <h4 className="text-sm font-extrabold text-white">No Wallet Linked</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto">
                Hubungkan wallet TON Anda untuk melihat rincian saldo, menambahkan saldo uji coba, dan melakukan pembayaran instan.
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onConnectWallet}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-blue-500/10"
            >
              <Landmark className="w-4 h-4" /> Connect TON Wallet
            </motion.button>
          </div>
        )}

        {/* Ledger Metadata Logs for Fidelity */}
        <div className="bg-[#12141C]/50 border border-gray-850/60 rounded-xl p-3 text-[9.5px] space-y-1.5 font-mono text-gray-500">
          <div className="flex justify-between">
            <span>CLIENT SDK:</span>
            <span className="text-white">@tonconnect/sdk-v2.0.4</span>
          </div>
          <div className="flex justify-between">
            <span>NETWORK SPEED:</span>
            <span className="text-emerald-400 font-bold">~0.15s (920 TPS)</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS:</span>
            <span className="text-white">{user.walletAddress ? 'SYNC_ACTIVE' : 'IDLE'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
