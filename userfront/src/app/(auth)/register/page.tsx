'use client';

import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Establish_Identity_Node"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
