import React, { useState } from 'react';
import { Bell, ShoppingBag, Eye, CreditCard, ChevronRight, Search, Heart, Star } from 'lucide-react';
import { Product, Transaction, User } from '../types';
import { products } from '../data';
import { motion } from 'motion/react';

interface DashboardProps {
  user: User;
  onSelectProduct: (product: Product) => void;
  transactions: Transaction[];
  setActiveTab: (tab: 'home' | 'orders' | 'ads' | 'wallet') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onSelectProduct,
  transactions,
  setActiveTab,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Outerwear', 'Tops', 'Pants', 'Sweaters'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0C0D14] pb-12 select-none">
      
      {/* 1. Header (User Info + Profile + Bell Notification) */}
      <div className="px-6 pt-5 pb-4 flex justify-between items-center bg-[#0C0D14]">
        <div>
          <span className="text-[12px] text-gray-500 font-medium tracking-wide block">{getGreeting()}</span>
          <h2 className="text-xl font-bold text-white tracking-tight">{user.firstName}</h2>
        </div>
        <div className="flex gap-2.5">
          <div className="relative w-10 h-10 bg-gray-900 border border-gray-850 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full overflow-hidden border border-white/10 flex items-center justify-center font-bold text-[#0C0D14] text-sm shadow-inner cursor-pointer">
            {user.firstName ? user.firstName.substring(0, 2).toUpperCase() : 'AX'}
          </div>
        </div>
      </div>

      {/* Search Input Accessory */}
      <div className="px-6 mb-5">
        <div className="relative w-full bg-[#12141C] border border-gray-850/80 rounded-2xl flex items-center px-4 py-3 text-gray-500">
          <Search className="w-4.5 h-4.5 mr-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search minimal techwear clothing..." 
            className="bg-transparent text-xs w-full text-white outline-none placeholder:text-gray-600 font-medium"
            disabled
          />
        </div>
      </div>

      {/* 2. Today's Goal Banner (Teal gradient card with radial progress tracker - Matches Reference dashboard-screen.webp) */}
      <div className="px-6 mb-6">
        <div className="relative bg-gradient-to-br from-[#069669] to-[#047857] text-white p-5 rounded-3xl overflow-hidden shadow-2xl flex justify-between items-center group">
          {/* Abstract backdrop vectors */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div className="space-y-3.5 z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-100/80 block">Today's Ads Quest</span>
            <h3 className="text-lg font-extrabold leading-tight text-white tracking-tight">
              Unlock 50% Off!
            </h3>
            <div className="flex gap-4 text-xs font-medium text-emerald-100/90 whitespace-nowrap">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {user.watchAdCount} of 3 watched
              </span>
              <span>•</span>
              <span>Next reward: 50% discount</span>
            </div>
          </div>

          {/* Radial progress ring - EXACTLY like the 70% in reference */}
          <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="36"
                cy="36"
                r="28"
                className="stroke-emerald-800"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="36"
                cy="36"
                r="28"
                className="stroke-white transition-all duration-500"
                strokeWidth="5.5"
                fill="transparent"
                strokeDasharray="175.9"
                strokeDashoffset={175.9 - (175.9 * (user.watchAdCount / 3))}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white font-sans">
              {Math.round((user.watchAdCount / 3) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* 3. Secondary Stats Cards (Left: Adsgram reward points / Right: Connected TON Wallet - Matches Reference dashboard-screen.webp) */}
      <div className="px-6 mb-7 grid grid-cols-2 gap-4">
        
        {/* Ads points card with orange progress line */}
        <div 
          onClick={() => setActiveTab('ads')}
          className="bg-[#12141C] p-4.5 rounded-2xl border border-gray-850 hover:border-gray-800 transition shadow flex flex-col justify-between h-[120px] cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Eye className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-gray-500">60%</span>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono">{user.adsgramPoints}</div>
            <div className="text-[10px] text-gray-500 font-medium">Ads points earned</div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full w-[60%]" />
          </div>
        </div>

        {/* TON balance card with blue progress line */}
        <div 
          onClick={() => setActiveTab('wallet')}
          className="bg-[#12141C] p-4.5 rounded-2xl border border-gray-850 hover:border-gray-800 transition shadow flex flex-col justify-between h-[120px] cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <CreditCard className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-gray-500">
              {user.walletAddress ? '100%' : '0%'}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-bold text-white font-mono leading-none">
              {user.walletAddress ? `${user.walletBalanceTON.toFixed(1)} TON` : 'CONNECT'}
            </div>
            <div className="text-[10px] text-gray-500 font-medium truncate">
              {user.walletAddress ? 'Wallet Connected' : 'Wallet Not Connected'}
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${user.walletAddress ? 'bg-blue-500 w-full' : 'bg-gray-800 w-0'}`} 
            />
          </div>
        </div>

      </div>

      {/* Filter Categories Horizontal Flow */}
      <div className="px-6 mb-6 flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-emerald-500 text-black'
                : 'bg-gray-900 border border-gray-850/80 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Browse Katalog Baju - Matches "Recommended Workouts" section in reference */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-bold text-white tracking-tight">Katalog Unclothes</h3>
          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Carousel / Grid list of elegant clothes */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProduct(prod)}
              className="bg-[#12141C] border border-gray-850 rounded-2xl overflow-hidden hover:border-gray-800 transition flex flex-col group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-950 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-red-500 transition cursor-pointer">
                  <Heart className="w-4 h-4 fill-transparent hover:fill-red-500" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-emerald-400 flex items-center gap-0.5 border border-emerald-500/20">
                  <Star className="w-2.5 h-2.5 fill-emerald-400" /> {prod.rating}
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold">{prod.category}</span>
                  <h4 className="text-xs font-bold text-gray-200 mt-0.5 line-clamp-1 group-hover:text-emerald-400 transition">
                    {prod.title}
                  </h4>
                </div>

                <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-850/50">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-white font-mono">
                      {prod.priceTON} TON
                    </div>
                    <div className="text-[8px] text-emerald-400 font-bold font-mono">
                      Promo: {prod.discountPriceTON} TON
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500 hover:text-black hover:scale-105 transition flex items-center justify-center text-emerald-400 cursor-pointer">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Today's Activity / Recent Orders section */}
      <div className="px-6 mb-8">
        <h4 className="text-sm font-bold text-white tracking-tight mb-3">Today's Transactions</h4>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#12141C] border border-gray-850/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-950 overflow-hidden relative border border-gray-850">
                  <img 
                    src={tx.productImage} 
                    alt={tx.productTitle} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{tx.productTitle}</h5>
                  <span className="text-[9px] text-gray-500 block font-mono">{tx.timestamp}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-white font-mono block">{tx.pricePaidTON} TON</span>
                <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest block font-bold">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="py-6 text-center rounded-xl border border-dashed border-gray-850 text-gray-500 text-xs leading-relaxed">
              No clothes ordered today yet.<br />Explore the catalog above to place an order!
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
