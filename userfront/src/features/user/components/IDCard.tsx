'use client';

import React from 'react';
import { UserProfile } from '../services/user.service';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe2, Activity, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface IDCardProps {
  user: UserProfile;
}

export const IDCard: React.FC<IDCardProps> = ({ user }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative w-full max-w-sm aspect-[1.6/1] glass-panel rounded-[40px] overflow-hidden group shadow-3xl shadow-primary/5 border-white/5 transition-all hover:border-primary/40"
    >
      {/* 1. Background Pattern: Cyber-Grid */}
      <div className="absolute inset-0 opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />
      
      {/* 2. Top Bar: System ID */}
      <div className="absolute top-4 left-0 w-full px-6 flex justify-between items-center z-10">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-primary rounded-full" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">ID_VERIFIED_PASS_</span>
         </div>
         <ShieldCheck size={14} className="text-emerald-500" />
      </div>

      {/* 3. Main Body */}
      <div className="relative h-full flex flex-col justify-end p-6 z-10">
         
         <div className="flex items-start gap-5 mb-6">
            {/* Avatar with Ring */}
            <div className="relative">
               <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-all" />
               <div className="relative w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} className="text-white/20" />
                  )}
               </div>
            </div>

            <div className="space-y-1 mt-1">
               <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase whitespace-pre">{user.fullName}</h3>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.email}</p>
            </div>
         </div>

         {/* 4. Stats Ticker */}
         <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
            <div className="space-y-1">
               <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Trips_Logged</p>
               <p className="text-sm font-black text-white italic tracking-tighter">{user.totalTrips}</p>
            </div>
            <div className="space-y-1">
               <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Net_Distance</p>
               <p className="text-sm font-black text-white italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  {user.totalDistance.toFixed(1)}km
               </p>
            </div>
            <div className="space-y-1 text-right">
               <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Node_Status</p>
               <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active_01</p>
            </div>
         </div>

      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary/20 blur-md rounded-full" />
    </motion.div>
  );
};
