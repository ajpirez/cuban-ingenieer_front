'use client';
/* eslint-disable max-len */
import { useMounted } from '@/hooks/use-mounted';

export function TailwindIndicator() {
  const mounted = useMounted();
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="usm:hidden csm:hidden 3xl:hidden 4xl:hidden block sm:hidden">xs</div>
      <div className="usm:block csm:hidden 3xl:hidden 4xl:hidden hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        usm
      </div>
      <div className="usm:hidden csm:block 3xl:hidden 4xl:hidden hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        csm
      </div>
      <div className="3xl:hidden 4xl:hidden hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
      <div className="3xl:hidden 4xl:hidden hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="3xl:hidden 4xl:hidden hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="3xl:hidden 4xl:hidden hidden lg:hidden custom-xl:block xl:hidden 2xl:hidden">clg</div>
      <div className="3xl:hidden 4xl:hidden hidden xl:block 2xl:hidden">xl</div>
      <div className="3xl:hidden 4xl:hidden hidden 2xl:block">2xl</div>
      <div className="3xl:block 4xl:hidden hidden 2xl:hidden">3xl</div>
      <div className="3xl:hidden 4xl:block hidden 2xl:hidden">4xl</div>
    </div>
  );
}
