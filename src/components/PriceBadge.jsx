const SYMBOLS = { 1: '£', 2: '££', 3: '£££' };
const LABELS = { 1: 'budget-friendly', 2: 'mid-range', 3: 'treat yourself' };

export default function PriceBadge({ tier }) {
  return (
    <span className={`price-badge price-badge-${tier}`} title={LABELS[tier]}>
      {SYMBOLS[tier]}
    </span>
  );
}
