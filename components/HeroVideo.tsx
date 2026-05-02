'use client';

import { useState } from 'react';

export default function HeroVideo() {
  const [ended, setEnded] = useState(false);

  return (
    <>
      {/* Audi image — fades in when video ends */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
          ended ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Video — fades out when finished */}
      <video
        onEnded={() => setEnded(true)}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-bg.jpg"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
          ended ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
