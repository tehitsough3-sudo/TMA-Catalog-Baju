import React, { useState } from 'react';
import { ArrowLeft, Wallet, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface WalletConnectGateProps {
  onBack: () => void;
  onConnect: (address: string) => void;
  addLog: (log: string) => void;
}

export const WalletConnectGate: React.FC<WalletConnectGateProps> = ({
  onBack,
  onConnect,
  addLog,
}) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  const wallets = [
    { name: 'Tonkeeper', key: 'tonkeeper', icon: '💎', tagline: 'Popular choice. Secured by biometrics.' },
    { name: 'MyTonWallet', key: 'mytonwallet', icon: '🦊', tagline: 'Multi-account management tool.' },
    { name: 'Tonhub', key: 'tonhub', icon: '🧬', tagline: 'Optimized for high-speed micro-TX.' },
  ];

  const handleConnect = (walletName: string) => {
    setConnectingWallet(walletName);
    addLog(`Initiating TON Connect v2 handshake with ${walletName}...`);
    
    // Simulate short loader
    setTimeout(() => {
      // Create random simulated TON address
      const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
      let randomAddr = 'EQ';
      for (let i = 0; i < 24; i++) {
        randomAddr += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      randomAddr += '...f9A';
      
      addLog(`Wallet linked! Host: secure.connect.ton. Network: Mainnet`);
      addLog(`Signer verified. Connected Address: ${randomAddr}`);
      onConnect(randomAddr);
    }, 1500);
  };

  return (
    <div className="flex-grow flex flex-col justify-between bg-[#0C0D14] p-6 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-gray-500 border-b border-gray-900 pb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-white mr-auto">
          &larr; BACK
        </button>
        <span className="flex items-center gap-1">
          <Wallet className="w-3.5 h-3.5 text-blue-400" /> Cek TON Wallet
        </span>
      </div>

      {connectingWallet ? (
        <div className="my-auto space-y-6 text-center">
          <div className="relative w-18 h-18 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-md font-bold text-white">Connecting with {connectingWallet}...</h3>
            <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-relaxed">
              Open your wallet app on your device to confirm this safe signature request.
            </p>
          </div>
        </div>
      ) : (
        <div className="my-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 animate-float">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">Connect TON Wallet</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              Anda belum menghubungkan dompet TON. Silakan pilih salah satu dompet aman di bawah untuk menyelesaikan pembayaran.
            </p>
          </div>

          <div className="space-y-3.5">
            {wallets.map((w) => (
              <motion.button
                key={w.key}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleConnect(w.name)}
                className="w-full bg-[#12141C] border border-gray-850 hover:border-gray-800 p-4.5 rounded-2xl flex items-center gap-4 transition hover:bg-[#151722] text-left cursor-pointer group"
              >
                <span className="text-2xl font-sans group-hover:scale-105 transition">{w.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition">{w.name}</h4>
                  <p className="text-[10px] text-gray-500 truncate leading-normal text-wrap">{w.tagline}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="bg-[#12141C] p-3 rounded-2xl border border-gray-850/60 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <p className="text-[9px] text-gray-500 leading-normal">
              Dompet Anda dilindungi oleh protokol standard enkripsi TON Connect v2. Sandbox tidak mentransfer aset nyata Anda.
            </p>
          </div>
        </div>
      )}

      {/* footer details */}
      <div className="text-[9px] text-gray-650 text-center font-mono">
        TON_CONNECT_GATEWAY_V2_CLIENT
      </div>
    </div>
  );
};
