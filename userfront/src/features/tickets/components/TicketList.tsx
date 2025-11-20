'use client';

import React, { useEffect, useState } from 'react';
import { Ticket, ticketService } from '../services/ticket.service';
import { TicketCard } from './TicketCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, History, TicketIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'HISTORY'>('ALL');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const data = await ticketService.getMyTickets();
      setTickets(data);
      setLoading(false);
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    if (filter === 'ACTIVE') return t.status === 'ACTIVE';
    if (filter === 'HISTORY') return t.status !== 'ACTIVE';
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
         <Loader2 size={40} className="text-primary animate-spin" />
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Retrieving Secure Ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filtering Header */}
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">My Ticket Vault</h2>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <History size={12} />
               Secure Trip History // Synchronized
            </div>
         </div>

         <div className="flex p-1 gap-1 bg-white/5 border border-white/10 rounded-2xl">
            {(['ALL', 'ACTIVE', 'HISTORY'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
         </div>
      </div>

      {/* Grid Display */}
      <AnimatePresence mode="popLayout">
         {filteredTickets.length > 0 ? (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
           >
             {filteredTickets.map((ticket, idx) => (
               <motion.div
                 key={ticket.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
               >
                 <TicketCard ticket={ticket} />
               </motion.div>
             ))}
           </motion.div>
         ) : (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="py-20 text-center glass-panel rounded-[40px] border-white/5 space-y-4"
           >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
                 <TicketIcon size={32} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No tickets found in this segment</p>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};
