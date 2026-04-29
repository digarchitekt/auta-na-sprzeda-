'use client';

import { useState } from 'react';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden border border-bg-border bg-bg-elevated">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
        />
        <div className="absolute bottom-3 right-3 bg-bg/80 px-2 py-1 text-xs text-text-secondary backdrop-blur">
          {active + 1} / {images.length}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden border bg-bg-elevated transition-colors ${
              i === active ? 'border-accent' : 'border-bg-border hover:border-text-muted'
            }`}
            aria-label={`Zdjecie ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
