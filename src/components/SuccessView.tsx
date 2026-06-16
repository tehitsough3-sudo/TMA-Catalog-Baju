import React from 'react';
import { ShieldCheck, ArrowRight, CornerDownRight, Download, Share2 } from 'lucide-react';
import { Product, Transaction } from '../types';
import { motion } from 'motion/react';

interface SuccessViewProps {
  product: Product;
  transaction: Transaction;
  onDone: () => void;
  addLog: (log: string) => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  product,
  transaction,
  onDone,
  addLog,
}) => {
  return (
    <div className="flex-grow flex flex-col justify-between bg-[#0C0D14] p-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-[#069669] border-b border-gray-900 pb-2">
        <span className="flex items-center gap-1 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Order Berhasil
        </span>
        <span>ID: {transaction.id}</span>
      </div>

      <div className="my-auto space-y-6 pt-4">
        
        {/* Animated Check icon */}
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1.2, bounce: 0.4 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center glow-emerald animate-float"
        >
          <ShieldCheck className="w-12 h-12 text-emerald-400" />
        </motion.div>

        {/* Successful text */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">Order Berhasil Ditempatkan!</h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Pembayaran Anda telah sukses divalidasi via TON blockchain ledger.
          </p>
        </div>

        {/* Digital Receipt */}
        <div className="bg-[#12141C] border border-gray-850 rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-850/60">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-950 border border-gray-850 shrink-0">
              <img 
                src={product.image} 
                alt={product.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white truncate max-w-[160px]">{product.title}</h4>
              <span className="text-[10px] text-gray-500 block font-mono">Tx: {transaction.txHash.substring(0, 16)}...</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-gray-400 font-medium">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-[10px]">Confirmed on-chain</span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="text-white font-mono font-bold">{transaction.pricePaidTON} TON</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-white font-mono">{transaction.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Receipt share/download placeholders for fidelity */}
        <div className="flex gap-2 justify-center">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-850 text-[10px] font-bold text-gray-400 hover:text-white transition cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Download Receipt
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-850 text-[10px] font-bold text-gray-400 hover:text-white transition cursor-pointer">
            <Share2 className="w-3.5 h-3.5" /> Share Order
          </button>
        </div>

      </div>

      <div className="space-y-3 pt-4">
        {/* Play again button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            addLog(`Returning back to apparel catalog search...`);
            onDone();
          }}
          className="w-full bg-emerald-500 text-black hover:bg-emerald-400 py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          Kembali ke Katalog <ArrowRight className="w-4 h-4" />
        </motion.button>
        <p className="text-[9px] text-gray-650 text-center font-mono uppercase tracking-widest leading-loose">
          Unclothes Group • Decrypted Ledger Index Code #8849
        </p>
      </div>

    </div>
  );
};
