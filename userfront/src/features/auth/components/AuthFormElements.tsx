'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<InputProps> = ({ label, error, icon, type, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <div className="relative">
        {icon && (
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
              {icon}
           </div>
        )}
        <input
          type={inputType}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-2xl py-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-white placeholder:text-slate-600",
            icon ? "pl-12 pr-4" : "px-4",
            isPassword && "pr-12",
            error && "border-red-500/50 bg-red-500/5 focus:ring-red-500/10 focus:border-red-500",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</p>
      )}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'social';
}

export const AuthButton: React.FC<ButtonProps> = ({ children, loading, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 active:bg-white/80 transition-colors",
    outline: "bg-transparent border border-white/10 text-white hover:bg-white/5",
    social: "bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center gap-3",
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={cn(
        "w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </div>
    </button>
  );
};
