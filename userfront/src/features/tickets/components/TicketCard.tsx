'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket } from '../services/ticket.service';
import { QrCode, MapPin, Clock, ArrowRight, ShieldCheck, TicketIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TicketCardProps {
  ticket: Ticket;
  onViewDetails?: (id: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onViewDetails }) => {
  const isOneWay = ticket.type === 'SINGLE';
  
  const statusStyles = {
    ACTIVE: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    USED: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    EXPIRED: "text-red-400 bg-red-500/10 border-red-500/20",
    CANCELLED: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const statusLabel = {
    ACTIVE: "Ready to Scan",
    USED: "Used",
    EXPIRED: "Expired",
    CANCELLED: "Cancelled",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative h-[220px] w-full flex overflow-hidden glass-panel rounded-3xl border-white/5 transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Left Decoration: Magnetic Stripe Effect */}
      <div className="w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between">
         
         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                  <TicketIcon size={12} />
                  {ticket.type.replace('_', ' ')}
               </div>
               <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{ticket.id}</h3>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border animate-pulse",
              statusStyles[ticket.status]
            )}>
               {statusLabel[ticket.status]}
            </div>
         </div>

         {isOneWay ? (
           <div className="flex items-center gap-4 py-2">
              <div className="flex-1 space-y-1">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Origin</p>
                 <p className="text-sm font-black text-white uppercase">{ticket.fromStationName}</p>
              </div>
              <ArrowRight size={16} className="text-primary mt-4" />
              <div className="flex-1 text-right space-y-1">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dest</p>
                 <p className="text-sm font-black text-white uppercase">{ticket.toStationName}</p>
              </div>
           </div>
         ) : (
           <div className="py-2 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Validity</p>
              <p className="text-sm font-black text-white uppercase">UNLIMITED TRAVEL ON LINE 1</p>
           </div>
         )}

         <div className="flex justify-between items-end border-t border-white/5 pt-4">
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                  <Clock size={12} className="text-primary" />
                  EXP: {new Date(ticket.expiresAt).toLocaleDateString()}
               </div>
               <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  VERIFIED
               </div>
            </div>
            <div className="text-right">
               <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Total Fare</p>
               <p className="text-lg font-black text-white italic tracking-tighter">
                  {ticket.price.toLocaleString()}đ
               </p>
            </div>
         </div>
      </div>

      {/* Right Side: QR Perforation Effect */}
      <div className="w-[120px] bg-white/[0.03] border-l border-dashed border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
         {/* Decorative Cutouts */}
         <div className="absolute -top-3 -right-3 w-6 h-6 bg-background rounded-full border border-white/10" />
         <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-background rounded-full border border-white/10" />
         
         <div className="relative z-10 w-full aspect-square bg-white shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-2xl p-3 mb-2">
            <div className="w-full h-full text-black flex items-center justify-center">
               <QrCode size={64} strokeWidth={1.5} />
            </div>
            {ticket.status !== 'ACTIVE' && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white rotate-[-30deg]">
                 Invalidated
              </div>
            )}
         </div>
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">GATE_READY_</p>
      </div>

    </motion.div>
  );
};
