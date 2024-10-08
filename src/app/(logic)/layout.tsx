import React from 'react';
import { TopMenu } from '@/components/ui/topMenu';
import { Sidebar } from '@/components/ui/sidebar';
import { Footer } from '@/components/ui/footer';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
};

export default ShopLayout;
