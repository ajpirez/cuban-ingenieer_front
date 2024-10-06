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
            className={`p-2 flex items-center justify-center border rounded-md ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-100'} ${className}`}
        >
            <img src={icon} alt="Button icon" className="w-4 h-4" />
        </button>
    );
};
