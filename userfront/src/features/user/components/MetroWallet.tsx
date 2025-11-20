'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Plus, ArrowUpRight, History, CreditCard, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MetroWalletProps {
  balance: number;
}

export const MetroWallet: React.FC<MetroWalletProps> = ({ balance }) => {
  const [isRefilling, setIsRefilling] = useState(false);
  const [showRefillForm, setShowRefillForm] = useState(false);
  const [refillAmount, setRefillAmount] = useState<number>(50000);
  const [refillSuccess, setRefillSuccess] = useState(false);

  const handleRefill = async () => {
    setIsRefilling(true);
    // Simulate payment gateway
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefilling(false);
    setRefillSuccess(true);
    setTimeout(() => {
      setRefillSuccess(false);
      setShowRefillForm(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
       {/* 1. Main Balance Display */}
       <div className="relative p-8 glass-panel rounded-[40px] border-white/5 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                   <Wallet size={14} className="text-primary" />
                   Nguồn vốn di chuyển // Metro_Credits
                </div>
                <h3 className="text-5xl font-black text-white italic tracking-tighter">
                   {balance.toLocaleString()}<span className="text-xl text-primary not-italic ml-2">VND</span>
                </h3>
             </div>

             <button 
                onClick={() => setShowRefillForm(true)}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
             >
                <Plus size={18} />
                Nạp tiền vào ví
             </button>
          </div>
       </div>

       {/* 2. Quick Stats & Activity Ticker */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 glass-panel rounded-3xl border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chi tiêu hôm nay</p>
                <p className="text-xl font-black text-white italic tracking-tighter">35,000đ</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <ArrowUpRight size={20} />
             </div>
          </div>

          <div className="p-6 glass-panel rounded-3xl border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tiết kiệm tháng này</p>
                <p className="text-xl font-black text-emerald-400 italic tracking-tighter">120,000đ</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <History size={20} />
             </div>
          </div>
       </div>

       {/* 3. Refill Modal (Minimalist) */}
       <AnimatePresence>
          {showRefillForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowRefillForm(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
               />
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative z-10 w-full max-w-md glass-panel rounded-[40px] border-white/10 p-10 space-y-8 shadow-3xl"
               >
                  <div className="text-center space-y-2">
                     <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Nạp Metro Credits</h4>
                     <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Secure Payment Gateway // Verifying...</p>
                  </div>

                  {refillSuccess ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center py-8 space-y-4"
                    >
                       <CheckCircle2 size={64} className="text-emerald-500" />
                       <p className="text-lg font-black text-white italic tracking-tighter uppercase whitespace-pre">Giao dịch thành công_</p>
                    </motion.div>
                  ) : (
                    <>
                    <div className="grid grid-cols-2 gap-4">
                       {[50000, 100000, 200000, 500000].map((amt) => (
                         <button 
                            key={amt}
                            onClick={() => setRefillAmount(amt)}
                            className={cn(
                              "py-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest",
                              refillAmount === amt 
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                                : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-white"
                            )}
                         >
                            {amt.toLocaleString()}đ
                         </button>
                       ))}
                    </div>

                    <button 
                       disabled={isRefilling}
                       onClick={handleRefill}
                       className="w-full py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl shadow-2xl hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                       {isRefilling ? <Loader2 size={24} className="animate-spin" /> : "Authorize Payment_"}
                    </button>
                    </>
                  )}
               </motion.div>
            </div>
          )}
       </AnimatePresence>

    </div>
  );
};
