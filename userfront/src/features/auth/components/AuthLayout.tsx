'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#04060B] flex flex-col items-center justify-center py-20 px-6 relative overflow-x-hidden">
      
      {/* 1. Simple Radial Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,122,255,0.03)_0%,transparent_50%)]" />
      </div>

      {/* 2. Top Branding */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-10 text-center space-y-4"
      >  
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{title}</h2>
        </div>
      </motion.div>

      {/* 3. Main Form Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[480px] glass-panel rounded-[32px] p-8 md:p-12 shadow-3xl border-white/5"
      >
        {children}
      </motion.div>
    </div>
  );
};
