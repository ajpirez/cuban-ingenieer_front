'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui/ui-store';
import { useMounted } from '@/hooks/use-mounted';
import { useSession } from 'next-auth/react';

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu);

  const m = useMounted();
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!session);
  }, [isAuthenticated, session]);

  if (!isAuthenticated || !m) {
    return null;
  }

  return (
    <nav className="flex w-full items-center justify-between bg-stone-100 px-5 shadow-lg">
      <div>
        <Link rel="stylesheet" href="" />
        <span className={'font-bold antialiased'}>Cuban Ingenieer</span>
        <span>| Application</span>
      </div>
      <div className="flex items-center">
        <button onClick={() => openSideMenu()} className="m-2 rounded-md p-2 transition-all hover:bg-gray-100">
          Menú
        </button>
      </div>
    </nav>
  );
};
