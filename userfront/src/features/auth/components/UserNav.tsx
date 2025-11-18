'use client';

import React from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const UserNav = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isAuthenticated || !user) {
    return (
      <Link href="/login" className="group relative px-8 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(0,122,255,0.1)]">
        <div className="relative z-10 flex items-center gap-2">
          <span>Đăng nhập</span>
          <div className="flex gap-0.5">
            <div className="w-0.5 h-0.5 rounded-full bg-current opacity-40" />
            <div className="w-0.5 h-0.5 rounded-full bg-current opacity-40" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 overflow-hidden flex items-center justify-center text-primary font-black text-xs">
          {user.avatar ? (
            <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            user.fullName.charAt(0)
          )}
        </div>
        <div className="hidden lg:flex flex-col items-start leading-none">
          <span className="text-[10px] font-black text-white uppercase tracking-tight">{user.fullName}</span>
          <span className="text-[7px] font-bold text-primary uppercase tracking-widest mt-1">Verified_Identity</span>
        </div>
        <ChevronDown size={14} className={cn("text-slate-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl border-white/10 shadow-3xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 bg-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated Email</p>
                <p className="text-xs font-medium text-white truncate">{user.email}</p>
              </div>

              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                  <User size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Hồ sơ cá nhân</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                  <Settings size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Cài đặt hệ thống</span>
                </button>
              </div>

              <div className="p-2 border-t border-white/5 bg-red-500/5">
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                >
                  <LogOut size={16} />
                  LOGOUT_TERMINATE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal helper to avoid CN dependency issue in standalone file if not imported (though it's standard in project)
import { cn } from '@/lib/utils/cn';
