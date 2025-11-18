'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput, checkPasswordStrength } from '../schema/register.schema';
import { FormInput, AuthButton } from './AuthFormElements';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setSession, setLoading, isLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const passwordValue = useWatch({ control, name: 'password' }) || '';
  const strength = checkPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.signUp(data.fullName, data.email, data.password);
      setSession(response);
      setSuccess(true);
      
      setTimeout(() => {
        router.push(redirectTo);
      }, 1500);
      
    } catch (err: any) {
      if (err.message === 'AUTH_EMAIL_EXISTS') {
        setError('Email này đã được sử dụng trong hệ thống.');
      } else {
        setError('Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 animate-shake">
            <AlertCircle size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-500">
            <CheckCircle2 size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">Đăng ký thành công! Đang thiết lập phiên...</p>
          </div>
        )}

        <div className="space-y-4">
          <FormInput
            label="Full Name"
            placeholder="Nguyen Van A"
            icon={<User size={18} />}
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <FormInput
            label="Email Address"
            placeholder="architect@metrohcm.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="space-y-2">
            <FormInput
              label="Security Password"
              type="password"
              placeholder="Min 8 chars, 1 Upper, 1 Special"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              {...register('password')}
            />
            
            {/* Password Strength Bar */}
            <div className="flex gap-1 h-1 px-1">
               {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 rounded-full transition-all duration-500",
                      i <= strength 
                        ? (strength <= 1 ? "bg-red-500" : strength <= 3 ? "bg-amber-500" : "bg-emerald-500") 
                        : "bg-white/5"
                    )} 
                  />
               ))}
            </div>
            <div className="flex justify-between px-1">
               <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Password Strength</span>
               <span className={cn(
                 "text-[8px] font-black uppercase tracking-widest",
                 strength <= 1 ? "text-red-500" : strength <= 3 ? "text-amber-500" : "text-emerald-500"
               )}>
                  {strength === 0 ? 'Empty' : strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Secure'}
               </span>
            </div>
          </div>

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            icon={<ShieldCheck size={18} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer group px-1">
          <div className="relative mt-0.5">
             <input type="checkbox" className="sr-only" {...register('acceptTerms')} />
             <div className={cn(
               "w-5 h-5 border-2 rounded-md transition-colors",
               errors.acceptTerms ? "border-red-500/50 bg-red-500/5" : "border-white/10 group-hover:border-primary/50"
             )} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-tight">
             Tôi đồng ý với <a href="#" className="text-slate-300 hover:text-white underline">Điều khoản dịch vụ</a> và <a href="#" className="text-slate-300 hover:text-white underline">Chính sách bảo mật</a> của MetroHCM.
          </p>
        </label>

        <AuthButton type="submit" loading={isLoading}>
          Establish Secure Account
        </AuthButton>
      </form>

      <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
        Đã có tài khoản?{' '}
        <Link href={`/login${redirectTo !== '/' ? `?redirectTo=${redirectTo}` : ''}`} className="text-slate-300 hover:text-white transition-colors underline underline-offset-4">
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};
