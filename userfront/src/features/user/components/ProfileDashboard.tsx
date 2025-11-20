'use client';

import React, { useEffect, useState } from 'react';
import { UserProfile, userService } from '../services/user.service';
import { IDCard } from './IDCard';
import { MetroWallet } from './MetroWallet';
import { motion } from 'framer-motion';
import { Loader2, Settings, ShieldCheck, Activity } from 'lucide-react';

export const ProfileDashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
         <Loader2 size={40} className="text-primary animate-spin" />
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Synchronizing Identity Data...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
         <div className="space-y-2">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase whitespace-pre">Identity Control Center_</h2>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span className="flex items-center gap-1.5 text-emerald-500">
                  <ShieldCheck size={12} />
                  System_Status: Secure
               </span>
               <span className="flex items-center gap-1.5">
                  <Activity size={12} />
                  Node: HCM_LINE_01
               </span>
            </div>
         </div>

         <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-3">
            <Settings size={14} />
            System Preferences
         </button>
      </div>

      {/* 2. Main Grid: Identity & Finance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
         <div className="lg:col-span-1 space-y-8 sticky top-32">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Digital_ID_Protocol</h4>
            <IDCard user={profile} />
            
            <div className="p-6 glass-panel rounded-3xl border-white/5 space-y-4">
               <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Permissions</h5>
               <div className="flex flex-wrap gap-2">
                  {['PASSENGER_V3', 'EXEMPTION_NONE', 'PRIORITY_02'].map(p => (
                    <span key={p} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-bold text-slate-400 border border-white/5">{p}</span>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Financial_Telemetry</h4>
            <MetroWallet balance={profile.walletBalance} />
            
            {/* Recent Transit History (Simplified) */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Recent_Transit_Logs</h4>
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-5 glass-panel rounded-3xl border-white/5 hover:border-white/10 transition-all group">
                     <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                           <Activity size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-white italic tracking-tighter uppercase whitespace-pre">Ga Bến Thành → Ga Ba Son</p>
                           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Logged 04.04.2026 // QR_TRIP_8x2</p>
                        </div>
                     </div>
                     <span className="text-xs font-black text-slate-400">-12,000đ</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};
