'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightLeft, 
  MapPin, 
  Clock, 
  Navigation, 
  Train,
  CreditCard,
  Banknote,
  ChevronDown
} from 'lucide-react';
import { stationService, Station } from '@/services/station.service';
import { cn } from '@/lib/utils/cn';

export const FareCalculator = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [fromId, setFromId] = useState<string>('ST-01');
  const [toId, setToId] = useState<string>('ST-14');
  const [routeInfo, setRouteInfo] = useState<any>(null);

  useEffect(() => {
    stationService.getStations().then(setStations);
  }, []);

  useEffect(() => {
    const info = stationService.getRoute(fromId, toId);
    setRouteInfo(info);
  }, [fromId, toId]);

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Ga khởi hành</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
              <MapPin size={20} />
            </div>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full h-16 pl-12 pr-4 glass-panel rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer text-lg font-medium"
            >
              {stations.map(s => (
                <option key={s.id} value={s.id} className="bg-[#06080f] text-white">{s.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSwap}
          className="mt-6 p-3 glass-panel rounded-full hover:bg-white/10 transition-colors text-cyan-400 hover:scale-110 active:scale-95"
        >
          <ArrowRightLeft size={24} className="rotate-90 md:rotate-0 transition-transform" />
        </button>

        <div className="space-y-2">
          <label className="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Ga điểm đến</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-300 transition-colors">
              <Navigation size={20} />
            </div>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full h-16 pl-12 pr-4 glass-panel rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer text-lg font-medium"
            >
              {stations.map(s => (
                <option key={s.id} value={s.id} className="bg-[#06080f] text-white">{s.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <AnimatePresence mode="wait">
        {routeInfo && (
          <motion.div 
            key={`${fromId}-${toId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Price Main Card */}
            <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-cyan-500/20" />
              
              <div className="relative z-10">
                <h3 className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <CreditCard size={16} /> Giá vé dự kiến
                </h3>
                
                <div className="flex items-baseline gap-4 mb-8">
                  <motion.span 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent"
                  >
                    {routeInfo.price / 1000}
                  </motion.span>
                  <span className="text-3xl font-bold text-cyan-500">.000 VND</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg"><Navigation size={18} className="text-cyan-400" /></div>
                    <div>
                      <div className="text-xs text-white/30 uppercase">Khoảng cách</div>
                      <div className="font-bold">{routeInfo.distance} km</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg"><Clock size={18} className="text-emerald-400" /></div>
                    <div>
                      <div className="text-xs text-white/30 uppercase">Thời gian đi</div>
                      <div className="font-bold">~{routeInfo.estimatedMinutes} phút</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fare Policy Column */}
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-cyan-500">
                <div className="flex items-center gap-3 mb-2">
                  <Banknote size={20} className="text-cyan-400" />
                  <span className="font-bold">Tiền mặt</span>
                </div>
                <div className="text-2xl font-bold">{formatPrice(routeInfo.price)}</div>
                <div className="text-xs text-white/30 mt-1">Mua tại máy bán vé tự động</div>
              </div>

              <div className="glass-panel rounded-2xl p-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help relative group">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard size={20} className="text-purple-400" />
                  <span className="font-bold">Thẻ / QR Payment</span>
                </div>
                <div className="text-2xl font-bold italic">Sắp ra mắt</div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-xs font-bold uppercase tracking-widest">Giai đoạn 2</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Info */}
      <div className="flex flex-wrap gap-4 text-xs text-white/30 justify-center">
        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
          <Train size={12} /> Cập nhật: 12/2024
        </span>
        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
          Quyết định 5327/QĐ-UBND
        </span>
        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
          Phụ lục 01
        </span>
      </div>
    </div>
  );
};
