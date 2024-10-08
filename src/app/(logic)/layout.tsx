import React from 'react';
import { TopMenu } from '@/components/ui/topMenu';
import { Sidebar } from '@/components/ui/sidebar';
import { Footer } from '@/components/ui/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <TopMenu />
      <Sidebar />
      <div className="flex-grow px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
