'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const HandleSignOut = ({ status }: { status: number }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? `${process.env.NEXT_PUBLIC_DOMAIN}`;

  useEffect(() => {
    if (status === 401) {
      signOut({ callbackUrl }).then();
    }
  }, [status]);
  return null;
};

export default HandleSignOut;
