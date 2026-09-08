'use client';

import React from 'react';
import Image from 'next/image';

export interface GifBadgeProps {
  /** Path or URL to the GIF file */
  src?: string;
  /** Alias for src */
  gif?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Size in pixels (width & height) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Tooltip title */
  title?: string;
  /** Optional link if badge is clickable */
  href?: string;
  /** Enable radial circular shine behind badge (default: true) */
  radialGlow?: boolean;
}

export function GifBadge({
  src,
  gif,
  alt = 'Badge',
  size = 32,
  className = '',
  title,
  href,
  radialGlow = true,
}: GifBadgeProps) {
  const imageSrc = gif || src;

  if (!imageSrc) return null;

  const content = (
    <span
      className={`group/badge relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 select-none ${className}`}
      style={{ width: size, height: size }}
      title={title}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Radial circular ambient shine/glow */}
      {radialGlow && (
        <span
          className="pointer-events-none absolute -inset-1 rounded-full opacity-65 group-hover/badge:opacity-100 transition-opacity duration-300 blur-sm -z-10"
          style={{
            background:
              'radial-gradient(circle at center, rgba(245, 158, 11, 0.45) 0%, rgba(16, 185, 129, 0.22) 45%, transparent 72%)',
          }}
        />
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={size}
        height={size}
        unoptimized
        className="h-full w-full object-contain pointer-events-none"
      />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center justify-center shrink-0 cursor-pointer"
        title={title}
      >
        {content}
      </a>
    );
  }

  return content;
}
