'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../schema/login.schema';
import { FormInput, AuthButton } from './AuthFormElements';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Chrome, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setSession, setLoading, isLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.signIn(data.email, data.password);
      setSession(response);
      setSuccess(true);
      
      // Delay redirect to show success state
      setTimeout(() => {
        router.push(redirectTo);
      }, 1000);
      
    } catch (err: any) {
      if (err.message === 'AUTH_INVALID_CREDENTIALS') {
        setError('Email hoặc mật khẩu không chính xác.');
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
            <ShieldAlert size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-500">
            <CheckCircle2 size={20} />
            <p className="text-xs font-bold uppercase tracking-widest">Đăng nhập thành công! Đang chuyển hướng...</p>
          </div>
        )}

        <div className="space-y-4">
          <FormInput
            label="Email Address"
            placeholder="architect@metrohcm.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <FormInput
            label="Security Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="flex justify-between items-center px-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
               <input type="checkbox" className="sr-only" {...register('rememberMe')} />
               <div className="w-5 h-5 border-2 border-white/10 rounded-md transition-colors group-hover:border-primary/50 group-focus-within:border-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ghi nhớ phiên</span>
          </label>
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Quên mật khẩu?</a>
        </div>

        <AuthButton type="submit" loading={isLoading}>
          Authenticate Access
        </AuthButton>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 bg-transparent px-4">
          OR SOCIAL CONNECT
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AuthButton variant="social">
          <Chrome size={18} /> Continue with Google
        </AuthButton>
      </div>

      <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
        Chưa có tài khoản?{' '}
        <Link href={`/register${redirectTo !== '/' ? `?redirectTo=${redirectTo}` : ''}`} className="text-slate-300 hover:text-white transition-colors underline underline-offset-4">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};
