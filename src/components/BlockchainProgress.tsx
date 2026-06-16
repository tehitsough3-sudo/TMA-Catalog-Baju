import React, { useState, useEffect } from 'react';
import { Cpu, Server, Check, Activity } from 'lucide-react';

interface BlockchainProgressProps {
  onSuccess: (txHash: string) => void;
  addLog: (log: string) => void;
}

export const BlockchainProgress: React.FC<BlockchainProgressProps> = ({
  onSuccess,
  addLog,
}) => {
  const [blockHeight, setBlockHeight] = useState(38290142);
  const [step, setStep] = useState<number>(0);
  const [simulatedTxHash, setSimulatedTxHash] = useState('');

  const steps = [
    { title: 'Broadcasting Payload', desc: 'Distributing signed payload to mempool clusters' },
    { title: 'Mining Transaction', desc: 'Validating signatures against state ledger addresses' },
    { title: 'Awaiting Confirmations', desc: 'Synchronizing shards across consensus validators' },
  ];

  useEffect(() => {
    // Generate simulated txHash
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 40; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSimulatedTxHash(hash);

    addLog(`Broadcasting transaction to TON network mempool...`);
    addLog(`Transaction registered: hash=${hash.substring(0, 10)}...`);

    const blockTimer = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 1500);

    // Step progression
    const timer1 = setTimeout(() => {
      setStep(1);
      addLog(`Mined! Appending transaction state to block #${blockHeight + 1}.`);
    }, 1200);

    const timer2 = setTimeout(() => {
      setStep(2);
      addLog(`Consensus achieved. 3/3 TON validators fully confirmed payment state.`);
    }, 2800);

    const timer3 = setTimeout(() => {
      addLog(`Transaction successfully validated inside TON Blockchain block.`);
      onSuccess(hash);
    }, 4500);

    return () => {
      clearInterval(blockTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="flex-grow flex flex-col justify-between bg-[#0C0D14] p-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-gray-500 border-b border-gray-900 pb-2">
        <span className="flex items-center gap-1">
          <Activity className="w-4 h-4 text-emerald-500" /> Transaksi Blockchain
        </span>
      </div>

      <div className="my-auto space-y-7">
        
        {/* Hologram loading orbit */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 border-t-emerald-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border border-blue-500/10 border-b-blue-400 animate-spin" style={{ animationDirection: 'reverse' }} />
          <Cpu className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>

        {/* Text descriptions */}
        <div className="text-center space-y-1.5">
          <h3 className="text-md font-bold text-white tracking-tight">Memproses Transaksi...</h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Menulis data transaksi pembayaran pakaian ke dalam TON Blockchain. Mohon tunggu sejenak.
          </p>
        </div>

        {/* High-fidelity Steps timeline progress */}
        <div className="space-y-3 max-w-xs mx-auto">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-350 ${
                step === idx 
                  ? 'bg-emerald-500/10 border border-emerald-500/20' 
                  : step > idx 
                    ? 'bg-gray-900/60 opacity-60 border border-transparent' 
                    : 'opacity-30 border border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${
                step > idx 
                  ? 'bg-emerald-500 text-black' 
                  : step === idx 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : 'bg-gray-800 text-gray-500'
              }`}>
                {step > idx ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">{st.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-normal pt-0.5">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Metadata card */}
        <div className="bg-[#12141C] border border-gray-850 rounded-xl p-3 text-[10px] space-y-1 font-mono text-gray-500">
          <div className="flex justify-between">
            <span>NETWORK CLUSTER:</span>
            <span className="text-white">TON-MAINNET-SHARD-4</span>
          </div>
          <div className="flex justify-between">
            <span>BLOCK HEIGHT:</span>
            <span className="text-white">#{blockHeight}</span>
          </div>
          <div className="flex justify-between">
            <span>TX HASH:</span>
            <span className="text-blue-400 truncate max-w-[120px]">{simulatedTxHash || 'Generating...'}</span>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-[9px] text-gray-650 text-center font-mono">
        BLOCK_VERIFICATION_INDEXER_LIVE
      </div>
    </div>
  );
};
