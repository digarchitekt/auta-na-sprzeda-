export default function HeroVideo() {
  return (
    <video
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
