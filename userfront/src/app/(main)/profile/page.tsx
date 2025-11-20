'use client';

import React from 'react';
import { Container } from '@/components/layout/LayoutHelpers';
import { ProfileDashboard } from '@/features/user/components/ProfileDashboard';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-[#04060B]">
       <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <ProfileDashboard />
          </motion.div>
       </Container>
    </main>
  );
}
