'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface ProjectGalleryGridProps {
  images: string[];
  columns?: number;
  title?: string;
  fullWidthImages?: string[];
  columnGroups?: string[][];
}

export function ProjectGalleryGrid({
  images,
  columns = 3,
  title = 'PRODUCT SCREENSHOTS & UI SHOWCASE',
  fullWidthImages,
}: ProjectGalleryGridProps) {
  if (!images || images.length === 0) return null;

  // Split images evenly across the specified number of columns
  const colCount = Math.min(columns, images.length);
  const cols: string[][] = Array.from({ length: colCount }, () => []);

  images.forEach((img, idx) => {
    cols[idx % colCount].push(img);
  });

  const gridClass =
    colCount === 1
      ? 'grid-cols-1'
      : colCount === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

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
                  <Image
                    src={imgUrl}
                    alt={`Screenshot ${colIdx * colCount + imgIdx + 1}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Full-width footer screenshots */}
      {fullWidthImages && fullWidthImages.length > 0 && (
        <div className="flex flex-col gap-4 w-full pt-2">
          {fullWidthImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-lg hover:border-blue-500/40 transition-all duration-300"
            >
              <Image
                src={imgUrl}
                alt={`Full Width Screenshot ${idx + 1}`}
                width={1200}
                height={800}
                sizes="100vw"
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
