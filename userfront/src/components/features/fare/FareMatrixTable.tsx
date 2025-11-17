'use client';

import React from 'react';
import { FARE_MATRIX } from '@/features/booking/constants/fare.constants';
import { ATOMIC_STATIONS } from '@/features/booking/constants/map.constants';

export const FareMatrixTable = () => {
  return (
    <div className="w-full glass-panel rounded-3xl overflow-hidden shadow-2xl border-white/5">
      <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-xl font-bold">Ma trận Giá vé chi tiết</h3>
          <p className="text-sm text-white/40">Đơn vị: 1.000 VND / lượt</p>
        </div>
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
      </div>
      
      <div className="overflow-x-auto p-4 custom-scrollbar">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left sticky left-0 z-20 bg-[#06080f]/80 backdrop-blur border-b border-r border-white/10">
                Nhà ga
              </th>
              {ATOMIC_STATIONS.map((s, idx) => (
                <th key={s.id} className="p-3 min-w-[60px] text-center border-b border-white/10 bg-white/5 font-bold text-cyan-400">
                  Ga {idx + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATOMIC_STATIONS.map((s, rowIdx) => (
              <tr key={s.id} className="group hover:bg-white/5 transition-colors">
                <td className="p-3 font-medium border-r border-white/10 sticky left-0 z-10 bg-[#06080f]/80 backdrop-blur whitespace-nowrap min-w-[120px]">
                  <span className="text-white/30 mr-2">{rowIdx + 1}.</span> {s.name}
                </td>
                {FARE_MATRIX[rowIdx].map((price, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`p-3 text-center border-b border-white/5 transition-colors
                      ${price === 0 ? 'text-white/10' : 'text-white/60'}
                      ${rowIdx === colIdx ? 'bg-white/5' : ''}
                      group-hover:text-white
                    `}
                  >
                    {price === 0 ? '-' : price}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-white/5 text-[10px] text-white/20 text-center uppercase tracking-[0.2em]">
        Ho Chi Minh City Urban Railway Line 1 - Official Documentation
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </div>
  );
};
