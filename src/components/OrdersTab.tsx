import React from 'react';
import { ShoppingCart, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { Transaction } from '../types';

interface OrdersTabProps {
  transactions: Transaction[];
  addLog: (log: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ transactions, addLog }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#0C0D14] pb-12 select-none">
      <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-900">
        <h3 className="text-md font-bold text-white tracking-tight">Active Deliveries</h3>
        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">On-chain receipts</span>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div 
            key={tx.id} 
            className="bg-[#12141C] border border-gray-850 rounded-2xl p-4 space-y-3 shadow-lg"
          >
            {/* Top info */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[10px] text-gray-400 font-medium font-mono">{tx.timestamp}</span>
              </div>
              <span className="text-[8.5px] uppercase tracking-widest bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/15 py-1 px-2.5 rounded-md flex items-center gap-1 leading-none font-mono">
                <CheckCircle className="w-3 h-3" /> Confirmed
              </span>
            </div>

            {/* Product description card inside */}
            <div className="flex items-center gap-3 bg-gray-950/60 p-2.5 rounded-xl border border-gray-850/40">
              <div className="w-10 h-10 bg-gray-900 overflow-hidden shrink-0 rounded-lg relative">
                <img 
                  src={tx.productImage} 
                  alt={tx.productTitle} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{tx.productTitle}</h4>
                <span className="text-[9px] text-gray-500 font-mono block">Order: {tx.id}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-white font-mono block">{tx.pricePaidTON} TON</span>
              </div>
            </div>

            {/* Expander link */}
            <div className="pt-2 border-t border-gray-900/60 flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span className="truncate max-w-[170px]">TxHash: {tx.txHash}</span>
              <a 
                href={`https://tonscan.org/tx/${tx.txHash}`} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  addLog(`Opening simulated explorer for ${tx.id}...`);
                }}
                className="text-blue-400 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
              >
                Scan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="py-12 text-center rounded-2xl border border-dashed border-gray-850 text-gray-500 text-xs px-4">
            <ShoppingCart className="w-9 h-9 mx-auto text-gray-600 mb-2.5 animate-float" />
            <p className="font-medium">Dompet Pembelian Kosong</p>
            <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed pt-1.5">
              Riwayat transaksi pembelian pakaian digital Anda akan terekam secara on-chain di sini setelah selesai check-out.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
