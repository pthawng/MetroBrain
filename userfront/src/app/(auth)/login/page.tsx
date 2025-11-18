'use client';

import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout 
      title="User Login" 
      subtitle="Operational_Access_Point"
    >
      <LoginForm />
    </AuthLayout>
  );
}
