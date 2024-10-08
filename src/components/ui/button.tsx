'use client';

import React from 'react';
import Image from 'next/image';

type Button = {
  id: string;
  label: string | React.ReactNode;
  icon?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

type ButtonProps = {
  button: Button;
};

// eslint-disable-next-line no-redeclare
export const Button: React.FC<ButtonProps> = ({ button }) => {
  return (
    <button
      onClick={button.onClick}
      disabled={button.disabled}
      className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold ${button.disabled ? 'text-textDisabled' : 'text-textEnabled'} ${button.className}`}
    >
      {button.icon && (
        <Image width={20} height={20} src={button.icon} alt={`${button.label} icon`} className="h-[1.5rem]" />
      )}
      <span className="text-xs font-bold">{button.label}</span>
    </button>
  );
};
