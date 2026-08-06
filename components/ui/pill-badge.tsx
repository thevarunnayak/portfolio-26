'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PillBadgeProps {
  label: string;
  variant?: 'award' | 'role' | 'default' | 'accent';
  icon?: React.ReactNode;
  className?: string;
}

export function PillBadge({
  label,
  variant = 'default',
  icon,
  className = '',
}: PillBadgeProps) {
  if (variant === 'award') {
    return (
      <span className={`award-pill flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-[11px] font-extrabold shadow-md ${className}`}>
        {icon || <Sparkles className="h-3.5 w-3.5" />}
        <span>{label}</span>
      </span>
    );
  }

  if (variant === 'role') {
    return (
      <span className={`role-pill rounded-full px-3.5 py-1 font-mono text-[11px] font-extrabold shadow-sm ${className}`}>
        {label}
      </span>
    );
  }

  if (variant === 'accent') {
    return (
      <span className={`rounded-full bg-blue-600 keep-white px-3.5 py-1 font-mono text-[11px] font-bold text-white shadow-md ${className}`}>
        {label}
      </span>
    );
  }

  return (
    <span className={`rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-neutral-300 border border-white/10 ${className}`}>
      {label}
    </span>
  );
}
