'use client';
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoListOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShieldOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import clsx from 'clsx';
import { logout } from '@/actions';
import { useSession } from 'next-auth/react';
import { useUIStore } from '@/store/ui/ui-store';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);

  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;

  if (status === 'loading') {
    return (
      <button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );
  }

  return (
    <div onClick={() => closeMenu()}>
      {isSideMenuOpen && (
        <>
          <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-30" />
          <div className="fade-in fixed left-0 top-0 z-40 h-screen w-screen backdrop-blur-sm backdrop-filter" />
        </>
      )}

      <nav
        onClick={e => e.stopPropagation()}
        className={clsx(
          'fixed right-0 top-0 z-40 h-screen w-[200px] transform bg-white p-5 shadow-2xl transition-all duration-300 sm:w-[400px] md:w-[500px]',
          {
            'translate-x-full': !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline size={50} className="absolute right-5 top-5 cursor-pointer" onClick={() => closeMenu()} />

        {isAuthenticated && (
          <>
            <Link
              href="/"
              onClick={() => closeMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoListOutline size={30} />
              <span className="ml-3 text-sm md:text-lg">Task List</span>
            </Link>
            <Link
              href="/uploads"
              onClick={() => closeMenu()}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoCloudUploadOutline size={30} />
              <span className="ml-3 text-sm md:text-lg">Uploads</span>
            </Link>
            <button
              className="mt-10 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100"
              onClick={() => logout()}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-sm md:text-lg">Salir</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => closeMenu()}
            className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-sm">Ingresar</span>
          </Link>
        )}
      </nav>
    </div>
  );
};
