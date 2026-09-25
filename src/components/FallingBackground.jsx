import './FallingBackground.css';

// To swap a symbol for a real pixel-art image later, just set its
// `image` to a path (e.g. '/assets/heart.png') — the symbol is only
// used as a fallback while `image` is null.
const PIECE_TYPES = [
  { symbol: '♥', image: null, className: 'piece-heart' },
  { symbol: '✦', image: null, className: 'piece-star' },
];

const PIECE_COUNT = 26;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Built once on load (not on every render) so marking an item as
// purchased, etc. doesn't reshuffle the whole cascade.
const pieces = Array.from({ length: PIECE_COUNT }, (_, i) => {
  const type = PIECE_TYPES[i % PIECE_TYPES.length];
  return {
    id: i,
    ...type,
    left: randomBetween(0, 100), // vw
    size: randomBetween(50, 70), // px
    duration: randomBetween(10, 22), // seconds per fall cycle
    delay: randomBetween(-20, 0), // negative = starts mid-fall
    drift: randomBetween(-40, 40), // px of sideways sway
    spin: randomBetween(-25, 25), // deg of rotation
    opacity: randomBetween(0.25, 0.55),
  };
});

export default function FallingBackground() {
  return (
    <div className="falling-background" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`falling-piece ${piece.className}`}
          style={{
            left: `${piece.left}vw`,
            fontSize: `${piece.size}px`,
            opacity: piece.opacity,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            '--drift': `${piece.drift}px`,
            '--spin': `${piece.spin}deg`,
          }}
        >
          {piece.image ? (
            <img src={piece.image} alt="" className="falling-piece-image" />
          ) : (
            piece.symbol
          )}
        </span>
      ))}
    </div>
  );
}