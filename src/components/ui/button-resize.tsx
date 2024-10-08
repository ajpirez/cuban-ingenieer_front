'use client';

import React from 'react';
import Image from 'next/image';

type ButtonResizeProps = {
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const ButtonResize: React.FC<ButtonResizeProps> = ({ icon, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`-mr-1 flex min-h-[10px] items-center justify-center rounded-md p-2 ${disabled ? 'cursor-not-allowed' : 'hover:bg-blue-100'} ${className}`}
    >
      <Image width={20} height={20} src={icon} alt="Button icon" className="h-4 w-4" />
    </button>
  );
};
