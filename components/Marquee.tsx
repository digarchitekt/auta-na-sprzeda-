type Props = {
  items: string[];
  speed?: number; // seconds for one loop
};

export default function Marquee({ items, speed = 28 }: Props) {
  // Duplicate twice for seamless loop
  const stream = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-bg-border bg-bg py-4">
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {stream.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-4 font-display text-2xl uppercase tracking-[0.2em] text-text-muted md:text-3xl"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background:
            'linear-gradient(270deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)',
        }}
      />
    </div>
  );
}
