'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/features/booking/hooks/useBooking';
import { useBookingStore } from '@/store/useBookingStore';
import { Container } from '@/components/layout/LayoutHelpers';
import { CreditCard, Wallet, ShieldCheck, ArrowRight, ChevronLeft, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function ConfirmBookingPage() {
  const router = useRouter();
  const { route, stations, fromStationId, toStationId } = useBooking();
  const { ticketType, guestEmail } = useBookingStore();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fromStation = stations.find(s => s.id === fromStationId);
  const toStation = stations.find(s => s.id === toStationId);

  const basePrice = route ? route.price : 0;
  const totalPrice = ticketType === 'SINGLE' ? basePrice : 
                    ticketType === 'DAY' ? basePrice * 3 : 
                    ticketType === 'MONTH' ? basePrice * 22 : 0;

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/ticket/success');
  };

  const paymentMethods = [
    { id: 'momo', name: 'Ví MoMo', icon: Wallet, color: 'bg-white/5' },
    { id: 'vnpay', name: 'VNPay', icon: CreditCard, color: 'bg-white/5' },
    { id: 'wallet', name: 'Metro Wallet (Recommended)', icon: ShieldCheck, color: 'bg-primary/20' }
  ];

  return (
    <div className="min-h-screen bg-[#04060B] text-white">
      {/* Background Radiance Muted */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-0 pointer-events-none" />
      <Container className="py-12 max-w-4xl">
        
        {/* Header */}
        <div className="flex flex-col gap-6 mb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Thay đổi loại vé</span>
          </button>
          <h1 className="text-4xl font-black font-outfit tracking-tight">Thanh toán & Xác nhận</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Summary Column */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Thông tin hành trình
              </h2>

              <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-6 ml-2">
                <div className="relative">
                   <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Ga đi</p>
                   <p className="font-bold text-lg">{fromStation?.name}</p>
                </div>
                <div className="relative pt-4">
                   <div className="absolute -left-[31px] top-5 w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary/20" />
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Ga đến</p>
                   <p className="font-bold text-lg">{toStation?.name}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Loại vé</p>
                  <p className="font-bold text-primary italic">
                    {ticketType === 'SINGLE' ? 'Vé Lượt' : ticketType === 'DAY' ? 'Vé Ngày' : 'Vé Tháng'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Email nhận vé</p>
                  <p className="font-bold truncate">{guestEmail || 'auth@user.me'}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex items-center gap-4 bg-primary/5 border-primary/10">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold">Giao dịch an toàn 100%</h4>
                <p className="text-xs text-slate-500">Mọi thanh toán đều được mã hóa và bảo mật bởi tiêu chuẩn PCI DSS.</p>
              </div>
            </div>
          </div>

          {/* Payment Column */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl space-y-6 bg-white/[0.02]">
              <h2 className="text-xl font-bold">Hình thức thanh toán</h2>
              
              <div className="flex flex-col gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border-2 transition-all group",
                      paymentMethod === method.id 
                        ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(0,122,255,0.1)]" 
                        : "border-white/5 bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all", method.color, paymentMethod === method.id ? "text-primary" : "text-slate-500")}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <span className={cn("font-black uppercase text-[10px] tracking-widest", paymentMethod === method.id ? "text-white" : "text-slate-500 group-hover:text-slate-300")}>
                         {method.name}
                      </span>
                    </div>
                    {paymentMethod === method.id && (
                       <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                       </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-sm font-medium">Giá vé chuẩn</span>
                  <span className="font-bold">{totalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-sm font-medium">Phí dịch vụ</span>
                  <span className="font-bold">0 đ</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-black font-outfit uppercase tracking-wider">Tổng cộng</span>
                  <span className="text-2xl font-black font-outfit text-secondary">
                    {totalPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className={cn(
                  "w-full py-5 rounded-2xl font-black font-outfit uppercase tracking-[0.3em] text-xs transition-all relative overflow-hidden",
                  paymentMethod && !isProcessing
                    ? "bg-white text-black shadow-2xl hover:bg-slate-100 active:scale-[0.98]"
                    : "bg-white/5 text-slate-800 cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Authorize Payment_
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
