'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const onTimeUpdate = () => {
      if (!v.duration) return;
      if (v.currentTime >= v.duration - 0.05 && v.playbackRate > 0) {
        v.playbackRate = -1;
        v.play().catch(() => {});
      } else if (v.currentTime <= 0.05 && v.playbackRate < 0) {
        v.playbackRate = 1;
        v.play().catch(() => {});
      }
    };

    v.addEventListener('timeupdate', onTimeUpdate);
    return () => v.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      playsInline
      preload="metadata"
      poster="/images/hero-bg.jpg"
      aria-hidden
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
