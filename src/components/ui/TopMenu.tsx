'use client'
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {useMounted} from "@/hooks/use-mounted";

const TopMenu = () => {
    const m = useMounted();
    const { data: session, status } = useSession();
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
        <nav className='bg-navbarColor p-2'>
            <ul className='list-none m-0 p-0 flex justify-end'>
                {isAuthenticated && (
                    <li className='ml-2'>
                        <button className='text-white p-2 cursor-pointer bg-transparent hover:bg-gray-700' onClick={() => logoutUser()}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default TopMenu;
