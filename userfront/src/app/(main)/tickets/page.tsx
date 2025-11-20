'use client';

import React from 'react';
import { Container } from '@/components/layout/LayoutHelpers';
import { TicketList } from '@/features/tickets/components/TicketList';
import { motion } from 'framer-motion';

export default function MyTicketsPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-[#04060B]">
       <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <TicketList />
          </motion.div>
       </Container>
    </main>
  );
}
