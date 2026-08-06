'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProjectGalleryGridProps {
  images?: string[];
  columnGroups?: string[][];
  fullWidthImages?: string[];
  columns?: number;
  title?: string;
}

export function ProjectGalleryGrid({
  images = [],
  columnGroups,
  fullWidthImages = [],
  columns = 2,
  title = 'PRODUCT VISUALS & INTERFACE SCREENSHOTS',
}: ProjectGalleryGridProps) {
  let cols: string[][] = [];

  if (columnGroups && columnGroups.length > 0) {
    cols = columnGroups;
  } else if (images && images.length > 0) {
    const colCount = Math.max(1, Math.min(columns, 4));
    cols = Array.from({ length: colCount }, () => []);
    images.forEach((imgUrl, i) => {
      cols[i % colCount].push(imgUrl);
    });
  }

  const colCount = cols.length;
  const gridClass =
    colCount === 1
      ? 'grid-cols-1 w-full'
      : colCount === 3
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      : colCount === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2';

  if (cols.length === 0 && fullWidthImages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 w-full">
      {title && (
        <h3 className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>{title}</span>
        </h3>
      )}
      
      {/* Column-based screenshots */}
      {cols.length > 0 && (
        <div className={`grid ${gridClass} gap-4 items-start w-full`}>
          {cols.map((colImages, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 w-full">
              {colImages.map((imgUrl, imgIdx) => (
                <div
                  key={imgIdx}
                  className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-lg hover:border-blue-500/40 transition-all duration-300"
                >
                  <img
                    src={imgUrl}
                    alt={`Screenshot ${colIdx * colCount + imgIdx + 1}`}
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Full-width footer screenshots (e.g. Admin Dashboard spanning all columns below) */}
      {fullWidthImages && fullWidthImages.length > 0 && (
        <div className="flex flex-col gap-4 w-full pt-2">
          {fullWidthImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-lg hover:border-blue-500/40 transition-all duration-300"
            >
              <img
                src={imgUrl}
                alt={`Full Width Screenshot ${idx + 1}`}
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
