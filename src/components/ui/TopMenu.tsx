'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMounted } from '@/hooks/use-mounted';

const TopMenu = () => {
  const m = useMounted();
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!session);
  }, [isAuthenticated, session]);

  const logoutUser = async () => {
    await signOut();
    setIsAuthenticated(false);
  };
  if (!isAuthenticated) return null;
  if (!m) {
    return null;
  }
  return (
    <nav className="sticky top-0 z-50 bg-navbarColor p-2">
      <ul className="m-0 flex list-none justify-end p-0">
        {isAuthenticated && (
          <li className="ml-2">
            <button
              className="cursor-pointer bg-transparent p-2 text-white hover:bg-gray-700"
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default TopMenu;
