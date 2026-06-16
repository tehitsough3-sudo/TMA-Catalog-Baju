import { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { DevPanel } from './components/DevPanel';
import { TelegramAuthGate } from './components/TelegramAuthGate';
import { Dashboard } from './components/Dashboard';
import { ProductDetail } from './components/ProductDetail';
import { AdPlayer } from './components/AdPlayer';
import { WalletConnectGate } from './components/WalletConnectGate';
import { PaymentConfirm } from './components/PaymentConfirm';
import { BlockchainProgress } from './components/BlockchainProgress';
import { SuccessView } from './components/SuccessView';
import { OrdersTab } from './components/OrdersTab';
import { WatchAdsTab } from './components/WatchAdsTab';
import { WalletTab } from './components/WalletTab';

import { Product, Transaction, User } from './types';
import { Home, ShoppingBag, Eye, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // 1. Simulation controls state
  const [authStatus, setAuthStatus] = useState<'valid' | 'invalid'>('valid');
  const [walletConnected, setWalletConnected] = useState<boolean>(true);
  const [walletBalance, setWalletBalance] = useState<number>(5.5);
  const [adsgramPoints, setAdsgramPoints] = useState<number>(1200);

  // 2. Client logs state
  const [logs, setLogs] = useState<string[]>([]);

  // 3. Mini App Core user profile state
  const [user, setUser] = useState<User>({
    username: 'alex_cyber',
    firstName: 'Alex Designer',
    telegramId: '74829104',
    isAuthenticated: false,
    walletAddress: 'EQCt6...f9A',
    walletBalanceTON: 5.5,
    adsgramPoints: 1200,
    watchAdCount: 1,
  });

  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'ads' | 'wallet'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // State-Machine Flow stages:
  // 'gate' -> 'dashboard' -> 'product_detail' -> 'ad_player' -> 'wallet_gate' -> 'payment_confirm' -> 'blockchain_progress' -> 'success_view'
  const [currentFlow, setCurrentFlow] = useState<
    'gate' | 'dashboard' | 'product_detail' | 'ad_player' | 'wallet_gate' | 'payment_confirm' | 'blockchain_progress' | 'success_view'
  >('gate');

  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [usedAdDiscount, setUsedAdDiscount] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Sync state helpers
  const addLog = (logMessage: string) => {
    setLogs((prev) => [logMessage, ...prev]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Synchronize state changes from dev control dashboard back to app user state
  useEffect(() => {
    setUser(prev => ({
      ...prev,
      walletAddress: walletConnected ? prev.walletAddress || 'EQDt7UnclothesX9Z...f9A' : null,
      walletBalanceTON: walletBalance,
      adsgramPoints: adsgramPoints
    }));
  }, [walletConnected, walletBalance, adsgramPoints]);

  const handleWalletConnectFromGate = (addressStr: string) => {
    setWalletConnected(true);
    setUser(prev => ({
      ...prev,
      walletAddress: addressStr
    }));
    setWalletBalance(5.5); // Default simulated bank balance
    setCurrentFlow('payment_confirm');
  };

  const resetAll = () => {
    setAuthStatus('valid');
    setWalletConnected(true);
    setWalletBalance(5.5);
    setAdsgramPoints(1200);
    setTransactions([]);
    setSelectedProduct(null);
    setLastTransaction(null);
    setUsedAdDiscount(false);
    setActiveTab('home');
    setCurrentFlow('gate');
    setUser({
      username: 'alex_cyber',
      firstName: 'Alex Designer',
      telegramId: '74829104',
      isAuthenticated: false,
      walletAddress: 'EQCt6...f9A',
      walletBalanceTON: 5.5,
      adsgramPoints: 1200,
      watchAdCount: 1,
    });
    setLogs(['Simulator state fully reset to pristine state.']);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#090A0F] text-white">
      
      {/* LEFT AREA: Simulated iOS screen */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <PhoneFrame>
          
          <AnimatePresence mode="wait">
            
            {/* 1. Telegram Auth Flow Gate */}
            {currentFlow === 'gate' && (
              <motion.div 
                key="auth_gate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <TelegramAuthGate 
                  authStatus={authStatus}
                  onSuccess={() => {
                    setUser(prev => ({ ...prev, isAuthenticated: true }));
                    setCurrentFlow('dashboard');
                  }}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 2. Main Dashboard & Category Browsing (if active tab is home) */}
            {currentFlow === 'dashboard' && activeTab === 'home' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <Dashboard 
                  user={user}
                  onSelectProduct={(product) => {
                    setSelectedProduct(product);
                    addLog(`Opened clothes detail: ${product.title}`);
                    setCurrentFlow('product_detail');
                  }}
                  transactions={transactions}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            )}

            {/* Sub-tab 2: Active delivery lists */}
            {currentFlow === 'dashboard' && activeTab === 'orders' && (
              <motion.div 
                key="orders_tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <OrdersTab 
                  transactions={transactions}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* Sub-tab 3: Earn ad points standalone */}
            {currentFlow === 'dashboard' && activeTab === 'ads' && (
              <motion.div 
                key="ads_tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <WatchAdsTab 
                  adsgramPoints={adsgramPoints}
                  setAdsgramPoints={setAdsgramPoints}
                  incrementWatchAdCount={() => {
                    setUser(prev => ({ ...prev, watchAdCount: Math.min(3, prev.watchAdCount + 1) }));
                  }}
                  addLog={addLog}
                  triggerAdPlayerOnComplete={() => {
                    setUsedAdDiscount(false); // Standalone view
                    setCurrentFlow('ad_player');
                  }}
                />
              </motion.div>
            )}

            {/* Sub-tab 4: Connect wallet dashboard */}
            {currentFlow === 'dashboard' && activeTab === 'wallet' && (
              <motion.div 
                key="wallet_tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <WalletTab 
                  user={user}
                  onConnectWallet={() => {
                    setCurrentFlow('wallet_gate');
                  }}
                  onDisconnectWallet={() => {
                    setWalletConnected(false);
                  }}
                  onAddFunds={(amount) => {
                    setWalletBalance(prev => prev + amount);
                  }}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 3. Product Detail Sheet with ads decisions */}
            {currentFlow === 'product_detail' && selectedProduct && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-grow flex flex-col"
              >
                <ProductDetail 
                  product={selectedProduct}
                  user={user}
                  onBack={() => {
                    setSelectedProduct(null);
                    setCurrentFlow('dashboard');
                  }}
                  onSelectFlow={(watchAd) => {
                    setUsedAdDiscount(watchAd);
                    if (watchAd) {
                      addLog(`Redirecting user to Adsgram SDK rewarded ad view...`);
                      setCurrentFlow('ad_player');
                    } else {
                      addLog(`Skipped Adsgram discount. Progressing directly to checkout.`);
                      if (!user.walletAddress) {
                        addLog(`Checking Wallet: Belum Connect. Triggering TON connection portal.`);
                        setCurrentFlow('wallet_gate');
                      } else {
                        addLog(`Checking Wallet: Sudah Connect. Triggering transaction payload signer.`);
                        setCurrentFlow('payment_confirm');
                      }
                    }
                  }}
                />
              </motion.div>
            )}

            {/* 4. Adsgram SDK simulated full screen ad */}
            {currentFlow === 'ad_player' && (
              <motion.div 
                key="ad_player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <AdPlayer 
                  onSuccess={() => {
                    setAdsgramPoints(prev => prev + 100);
                    setUser(prev => ({ 
                      ...prev, 
                      watchAdCount: Math.min(3, prev.watchAdCount + 1),
                      adsgramPoints: prev.adsgramPoints + 100
                    }));
                    
                    if (selectedProduct) {
                      if (!user.walletAddress) {
                        addLog(`Checking TON Wallet: Belum Connect. Forwarding to connect wallet.`);
                        setCurrentFlow('wallet_gate');
                      } else {
                        addLog(`Checking TON Wallet: Sudah Connect. Forwarding to payload signer.`);
                        setCurrentFlow('payment_confirm');
                      }
                    } else {
                      // Trigger fallback if they watched standalone ad
                      setCurrentFlow('dashboard');
                      setActiveTab('ads');
                    }
                  }}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 5. Connect TON Wallet security interface */}
            {currentFlow === 'wallet_gate' && (
              <motion.div 
                key="wallet_gate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <WalletConnectGate 
                  onBack={() => {
                    if (selectedProduct) {
                      setCurrentFlow('product_detail');
                    } else {
                      setCurrentFlow('dashboard');
                      setActiveTab('wallet');
                    }
                  }}
                  onConnect={handleWalletConnectFromGate}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 6. Payment confirm slide-to-sign modal */}
            {currentFlow === 'payment_confirm' && selectedProduct && (
              <motion.div 
                key="sign_payment"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="flex-grow flex flex-col"
              >
                <PaymentConfirm 
                  product={selectedProduct}
                  user={user}
                  onBack={() => {
                    addLog(`Payment cancelled by client.`);
                    setCurrentFlow('product_detail');
                  }}
                  onConfirm={() => {
                    setCurrentFlow('blockchain_progress');
                  }}
                  usedAdDiscount={usedAdDiscount}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 7. Blockchain writing progress ticker */}
            {currentFlow === 'blockchain_progress' && (
              <motion.div 
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <BlockchainProgress 
                  onSuccess={(generatedHash) => {
                    if (selectedProduct) {
                      const finalCost = usedAdDiscount ? selectedProduct.discountPriceTON : selectedProduct.priceTON;
                      
                      // Deduct simulated balance
                      const nextBal = Math.max(0, user.walletBalanceTON - finalCost);
                      setWalletBalance(nextBal);

                      const txId = 'UN-' + Math.floor(100000 + Math.random() * 900000);
                      const newTx: Transaction = {
                        id: txId,
                        productId: selectedProduct.id,
                        productTitle: selectedProduct.title,
                        productImage: selectedProduct.image,
                        pricePaidTON: finalCost,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
                        status: 'confirmed',
                        txHash: generatedHash,
                        usedAdDiscount: usedAdDiscount,
                      };

                      setTransactions(prev => [newTx, ...prev]);
                      setLastTransaction(newTx);
                      setCurrentFlow('success_view');
                    }
                  }}
                  addLog={addLog}
                />
              </motion.div>
            )}

            {/* 8. Success Order complete receipt screen */}
            {currentFlow === 'success_view' && selectedProduct && lastTransaction && (
              <motion.div 
                key="receipt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <SuccessView 
                  product={selectedProduct}
                  transaction={lastTransaction}
                  onDone={() => {
                    setSelectedProduct(null);
                    setLastTransaction(null);
                    setUsedAdDiscount(false);
                    setActiveTab('home');
                    setCurrentFlow('dashboard');
                  }}
                  addLog={addLog}
                />
              </motion.div>
            )}

          </AnimatePresence>

          {/* Standard iOS navigation tab switcher in running mini-app dashboard */}
          {currentFlow === 'dashboard' && (
            <div className="h-14 bg-[#12141C] border-t border-gray-850 flex justify-around items-center select-none text-gray-500 text-xs px-2 z-40 select-none">
              
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-0.5 font-bold cursor-pointer transition ${
                  activeTab === 'home' ? 'text-emerald-500 scale-102' : 'hover:text-white'
                }`}
              >
                <Home className="w-4.5 h-4.5" />
                <span className="text-[10px]">Home</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex flex-col items-center gap-0.5 font-bold cursor-pointer transition ${
                  activeTab === 'orders' ? 'text-emerald-500 scale-102' : 'hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span className="text-[10px]">Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`flex flex-col items-center gap-0.5 font-bold cursor-pointer transition ${
                  activeTab === 'ads' ? 'text-emerald-500 scale-102' : 'hover:text-white'
                }`}
              >
                <Eye className="w-4.5 h-4.5" />
                <span className="text-[10px]">Watch Ads</span>
              </button>

              <button
                onClick={() => setActiveTab('wallet')}
                className={`flex flex-col items-center gap-0.5 font-bold cursor-pointer transition ${
                  activeTab === 'wallet' ? 'text-blue-400 scale-102' : 'hover:text-white'
                }`}
              >
                <Wallet className="w-4.5 h-4.5" />
                <span className="text-[10px]">Wallet</span>
              </button>
            </div>
          )}

        </PhoneFrame>
      </div>

      {/* RIGHT SIDEBAR: Developer Control Console Grid */}
      <div className="w-full lg:w-auto shrink-0 flex">
        <DevPanel 
          authStatus={authStatus}
          setAuthStatus={(st) => {
            setAuthStatus(st);
            addLog(`Developer: Toggled simulated auth gate to [${st.toUpperCase()}]`);
            // Force re-shaking gate if toggled
            setCurrentFlow('gate');
          }}
          walletConnected={walletConnected}
          setWalletConnected={(conn) => {
            setWalletConnected(conn);
            addLog(`Developer: Forced wallet connected state to [${conn ? 'CONNECTED' : 'DISCONNECTED'}]`);
          }}
          walletBalance={walletBalance}
          setWalletBalance={(bal) => {
            setWalletBalance(bal);
            addLog(`Developer: Set simulated wallet balance to ${bal.toFixed(2)} TON`);
          }}
          adsgramPoints={adsgramPoints}
          setAdsgramPoints={setAdsgramPoints}
          logs={logs}
          clearLogs={clearLogs}
          resetAll={resetAll}
        />
      </div>

    </div>
  );
}
