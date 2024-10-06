'use client';

import React from 'react';

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
      className={`flex items-center justify-center rounded-md border p-2 ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'hover:bg-blue-100'} ${className}`}
    >
      <img src={icon} alt="Button icon" className="h-4 w-4" />
    </button>
  );
};
