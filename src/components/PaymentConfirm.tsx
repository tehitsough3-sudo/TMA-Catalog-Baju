import React, { useState } from 'react';
import { ArrowLeft, Wallet, Check, Landmark, Shield, AlertTriangle } from 'lucide-react';
import { Product, User } from '../types';
import { motion } from 'motion/react';

interface PaymentConfirmProps {
  product: Product;
  user: User;
  onBack: () => void;
  onConfirm: () => void;
  usedAdDiscount: boolean;
  addLog: (log: string) => void;
}

export const PaymentConfirm: React.FC<PaymentConfirmProps> = ({
  product,
  user,
  onBack,
  onConfirm,
  usedAdDiscount,
  addLog,
}) => {
  const [signing, setSigning] = useState(false);
  const [slideCompleted, setSlideCompleted] = useState(false);

  const pricePaid = usedAdDiscount ? product.discountPriceTON : product.priceTON;
  const gasFee = 0.05;
  const totalCost = pricePaid + gasFee;

  const handleSign = () => {
    setSigning(true);
    addLog(`Broadcasting transaction details to wallet client...`);
    addLog(`Parameters: value=${pricePaid} TON, to=EQUnclothesStoreContractPubKey...`);
    addLog(`Awaiting signature conformation...`);
    
    setTimeout(() => {
      onConfirm();
    }, 1800);
  };

  return (
    <div className="flex-grow flex flex-col justify-between bg-[#0C0D14] p-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-gray-500 border-b border-gray-900 pb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-white mr-auto">
          &larr; BACK
        </button>
        <span className="flex items-center gap-1">
          <Landmark className="w-3.5 h-3.5 text-emerald-400" /> Proses Pembayaran TON
        </span>
      </div>

      {signing ? (
        <div className="my-auto space-y-7 text-center">
          <div className="relative w-18 h-18 mx-auto flex items-center justify-center">
            {/* Pulsating glowing signature visual */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-bold text-white tracking-tight">Signing Transaction...</h3>
            <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-relaxed">
              Encrypting transaction payload and appending wallet's private key signature.
            </p>
          </div>
          
          <div className="text-[10px] uppercase text-gray-500 font-mono tracking-wide">
            [ SECURE SIGNATURE SEQUENCE ENFORCED ]
          </div>
        </div>
      ) : (
        <div className="my-auto space-y-5">
          <div className="text-center pb-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#069669] bg-emerald-500/10 border border-emerald-500/15 py-1 px-3 rounded-full mb-3 inline-block">
              Wallet Connected
            </span>
            <p className="text-xs text-gray-400">Total payable from connected wallet</p>
            <h3 className="text-3xl font-extrabold text-white font-mono mt-0.5">{pricePaid.toFixed(2)} <span className="text-sm font-bold text-blue-400">TON</span></h3>
            <span className="text-[10px] block font-mono text-gray-500 pt-0.5 truncate bg-gray-950 px-2 py-1 rounded inline-block max-w-xs border border-gray-850">
              Address: {user.walletAddress}
            </span>
          </div>

          {/* Checkout Item Summary Card */}
          <div className="bg-[#12141C] border border-gray-850 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-950 shrink-0 border border-gray-850">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white max-w-[150px] truncate">{product.title}</h4>
                <div className="flex gap-2 text-[10px] text-gray-500 font-medium">
                  {usedAdDiscount && (
                    <span className="text-emerald-400 font-bold font-mono">Adsgram Discount</span>
                  )}
                  <span>•</span>
                  <span>Qty: 1</span>
                </div>
              </div>
            </div>
            
            <div className="text-right font-mono font-bold text-xs text-white">
              {pricePaid.toFixed(2)} TON
            </div>
          </div>

          {/* Bill breakdown */}
          <div className="bg-[#12141C]/50 rounded-2xl p-4 border border-gray-850/60 text-xs text-gray-400 space-y-2.5 font-medium">
            <div className="flex justify-between">
              <span>Item Subtotal:</span>
              <span className="text-white font-mono">{pricePaid.toFixed(2)} TON</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">Blockchain Gas Fee:</span>
              <span className="text-white font-mono">~{gasFee.toFixed(2)} TON</span>
            </div>
            <hr className="border-gray-850/50" />
            <div className="flex justify-between font-bold text-sm text-white">
              <span>Total cost including Gas:</span>
              <span className="text-emerald-400 font-mono">{totalCost.toFixed(2)} TON</span>
            </div>
          </div>

          {/* Action confirm button - "Proses Pembayaran" */}
          {user.walletBalanceTON < totalCost ? (
            <div className="text-center py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl text-[11px] p-3 leading-relaxed">
              Saldo simulator tidak mencukupi (Butuh {totalCost.toFixed(2)} TON, Anda memiliki {user.walletBalanceTON.toFixed(2)} TON). Silakan tambahkan saldo TON di simulator kontrol sidebar!
            </div>
          ) : (
            <div className="space-y-1.5 pt-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSign}
                className="w-full bg-emerald-500 text-black hover:bg-emerald-400 py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
              >
                PROSES PEMBAYARAN TON
              </motion.button>
            </div>
          )}

        </div>
      )}

      {/* FOOTER */}
      <div className="text-[9px] text-gray-650 text-center font-mono uppercase tracking-widest leading-loose">
        SECURE TRANSACTION GATEWAY • BLOCKCHAIN COOPERATIVE
      </div>
    </div>
  );
};
