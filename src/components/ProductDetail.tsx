import React, { useState } from 'react';
import { ArrowLeft, Star, MonitorPlay, ShoppingCart, Sparkles, AlertCircle } from 'lucide-react';
import { Product, User } from '../types';

interface ProductDetailProps {
  product: Product;
  user: User;
  onBack: () => void;
  onSelectFlow: (watchAd: boolean) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  user,
  onBack,
  onSelectFlow,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="flex-grow flex flex-col justify-between bg-[#0C0D14] pb-8 select-none">
      
      {/* Scrollable detail contents */}
      <div className="overflow-y-auto flex-1">
        
        {/* Navigation Bar */}
        <div className="px-6 pt-4 pb-2 flex justify-between items-center bg-[#0C0D14] sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-850 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <span className="text-xs uppercase font-mono tracking-widest text-gray-500 font-bold">Detail Produk</span>
          <div className="w-9 h-9" /> {/* Spacer */}
        </div>

        {/* Big Product Visual */}
        <div className="px-6 mb-5">
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-gray-950 overflow-hidden border border-gray-850">
            <img 
              src={product.image} 
              alt={product.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Tag or highlight badge */}
            <div className="absolute top-4 left-4 bg-emerald-500 text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Minimal Tech
            </div>
          </div>
        </div>

        {/* Title, rating, pricing info */}
        <div className="px-6 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{product.category}</span>
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">{product.title}</h2>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-gray-900 border border-gray-850 px-2.5 py-1.5 rounded-xl text-yellow-400 text-xs font-bold shrink-0 font-mono">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              {product.rating}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            {product.description}
          </p>

          <hr className="border-gray-850/60 my-2" />

          {/* COLOR SELECTOR */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">Available Colors</span>
            <div className="flex gap-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-7 h-7 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                    selectedColor.name === color.name 
                      ? 'border-emerald-400 scale-110 shadow-[0_0_8px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/20' 
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: color.hex === '#0A0A0A' || color.hex === '#060606' ? '#FFFFFF' : '#000000' }} 
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium block">Selected: {selectedColor.name}</span>
          </div>

          {/* SIZE SELECTOR */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">Select Sizing</span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 rounded-xl border text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'bg-gray-900 border-gray-850 text-gray-400 hover:text-white hover:border-gray-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER ACTION CARD: Decision flow for "Tonton Iklan?" */}
      <div className="px-6 pt-4 border-t border-gray-900/60 mt-4 bg-gradient-to-t from-[#0C0D14] via-[#0C0D14] to-[#0C0D14]/90 sticky bottom-0">
        <div className="bg-[#12141C] border border-gray-850 rounded-2xl p-4.5 space-y-4 shadow-xl">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" /> ADSGRAM REWARD DECISION
          </div>
          
          <div className="grid grid-cols-2 gap-4 pb-1">
            <div className="space-y-0.5">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Regular Price</span>
              <div className="text-md font-bold text-gray-400 font-mono leading-tight">{product.priceTON} TON</div>
            </div>
            <div className="space-y-0.5 border-l border-gray-850 pl-4">
              <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold">Watch Ad Price</span>
              <div className="text-md font-extrabold text-emerald-400 font-mono leading-tight flex items-center gap-1">
                {product.discountPriceTON} TON <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded">-50%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Option A: Tonton Iklan Yes -> Adsgram SDK simulation -> Reward Success */}
            <button
              onClick={() => onSelectFlow(true)}
              className="w-full bg-emerald-500 text-black hover:bg-emerald-400 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-500/10 transition-transform cursor-pointer"
            >
              <MonitorPlay className="w-4 h-4 fill-black" />
              Tonton Iklan & Beli (Diskon 50%)
            </button>

            {/* Option B: Tonton Iklan No -> direct bypass to Wallet connect check */}
            <button
              onClick={() => onSelectFlow(false)}
              className="w-full bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 hover:text-white py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Beli langsung tanpa iklan
            </button>
          </div>

          <div className="flex items-start gap-1.5 text-[9px] text-gray-500 leading-normal">
            <AlertCircle className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
            <span>
              Tonton iklan selama 4 detik menggunakan simulasi Adsgram SDK untuk mendapatkan potongan harga blockchain instan.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
