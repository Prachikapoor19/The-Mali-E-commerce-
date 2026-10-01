// Soft petals drifting down over the hero banner. Pure CSS, no clicks blocked.
// Fixed values (not random) so the server and browser render the same thing.

const PETALS = [
  { left: 6, size: 14, delay: 0, duration: 11, drift: 40, color: '#F4B6C2' },
  { left: 14, size: 10, delay: 3.5, duration: 9, drift: -30, color: '#FBE3E8' },
  { left: 23, size: 16, delay: 7, duration: 13, drift: 55, color: '#E8A3B3' },
  { left: 34, size: 11, delay: 1.5, duration: 10, drift: -45, color: '#F7C9D3' },
  { left: 45, size: 13, delay: 5, duration: 12, drift: 35, color: '#F4B6C2' },
  { left: 56, size: 9, delay: 8.5, duration: 9.5, drift: -25, color: '#FFFFFF' },
  { left: 64, size: 15, delay: 2.5, duration: 12.5, drift: 50, color: '#E8A3B3' },
  { left: 73, size: 12, delay: 6, duration: 10.5, drift: -40, color: '#FBE3E8' },
  { left: 82, size: 10, delay: 0.8, duration: 11.5, drift: 30, color: '#F7C9D3' },
  { left: 91, size: 14, delay: 4.2, duration: 13.5, drift: -50, color: '#F4B6C2' },
  { left: 50, size: 8, delay: 9.5, duration: 10, drift: 20, color: '#E9C98F' },
  { left: 28, size: 9, delay: 10.5, duration: 11, drift: -20, color: '#E9C98F' },
];

export default function HeroPetals() {
  return (
    <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.8}px`,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
