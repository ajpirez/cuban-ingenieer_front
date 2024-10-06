'use client';

import React from 'react';

type Button = {
    id: string;
    label: string;
    icon?: string;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
};

type ButtonProps = {
    button: Button;
};

export const Button: React.FC<ButtonProps> = ({button}) => {
    return (
        <button
            onClick={button.onClick}
            disabled={button.disabled}
            className={
                `px-4 py-2 flex items-center gap-2 text-sm font-bold  border rounded-md ${button.disabled ? 'text-textDisabled' : 'text-textEnabled'} ${button.className}`}
        >
            {button.icon && (
                <img src={button.icon}
                     alt={`${button.label} icon`}
                     className="h-[1.5rem]"/>
            )}
            <span className='text-xs font-bold'>{button.label}</span>
        </button>
    );
};
