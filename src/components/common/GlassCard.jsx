import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const GlassCard = ({ children, className, hover = false }) => {
  return (
    <div className={cn(
      "bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
      hover && "hover:bg-card/60 hover:border-white/20 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
};
