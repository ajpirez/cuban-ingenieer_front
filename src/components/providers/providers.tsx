'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { TailwindIndicator } from '@/components/ui/tailwind-indicator';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <TailwindIndicator />
      <Toaster richColors position="top-right" />
      {children}
    </SessionProvider>
  );
};
