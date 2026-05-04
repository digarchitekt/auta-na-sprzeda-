// Server component — pure CSS animation, no JS, no hydration delay.
// Renders at first paint, hides itself via CSS at ~1.4s.

const TICK_COUNT = 11;
const ARC_START_ANGLE = 135;
const ARC_SWEEP = 270;
const INNER_R = 52;
const OUTER_R = 60;

const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
  const angle = ARC_START_ANGLE + (ARC_SWEEP / (TICK_COUNT - 1)) * i;
  const rad = (angle * Math.PI) / 180;
  const isRedzone = i >= TICK_COUNT - 3;
  return {
    i,
    x1: 100 + INNER_R * Math.cos(rad),
    y1: 100 + INNER_R * Math.sin(rad),
    x2: 100 + OUTER_R * Math.cos(rad),
    y2: 100 + OUTER_R * Math.sin(rad),
    isRedzone,
  };
});

export default function Preloader() {
  return (
    <div id="preloader" aria-hidden="true">
      <div className="preloader-bg-flash" />
      <div className="preloader-tachometer">
        <svg viewBox="0 0 200 200">
          <circle className="preloader-arc-track" cx="100" cy="100" r="60" />
          <g>
            {ticks.map((t) => (
              <line
                key={t.i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.isRedzone ? '#e11d2e' : '#444'}
                strokeWidth={t.isRedzone ? 2.5 : 1.5}
                className={`preloader-tick${t.isRedzone ? ' redzone' : ''}`}
                style={{ animationDelay: `${0.15 + t.i * 0.025}s` }}
              />
            ))}
          </g>
          <circle className="preloader-arc-progress" cx="100" cy="100" r="60" />
          <path className="preloader-redline" d="M 145 55 A 60 60 0 0 1 160 80" />
          <line className="preloader-needle" x1="100" y1="100" x2="100" y2="46" />
          <circle className="preloader-center-dot" cx="100" cy="100" r="5" />
          <circle className="preloader-center-dot-inner" cx="100" cy="100" r="2" />
        </svg>
      </div>
      <div className="preloader-wordmark font-display">
        {Array.from('AUTA NA SPRZEDAŻ').map((ch, i) => (
          <span
            key={i}
            className="preloader-char"
            style={{ animationDelay: `${0.4 + i * 0.035}s` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </div>
    </div>
  );
}
