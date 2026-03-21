import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }) => {
  return (
    <div className={cn("bg-surface border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-500 hover:shadow-lg hover:shadow-primary/5", className)}>
      {children}
    </div>
  );
};
