import { StarHalfIcon, StarIcon } from './icons';

type RatingProps = {
  value: number;
  count: number;
};

export function Rating({ value, count }: RatingProps) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-warning">
        {Array.from({ length: full }).map((_, i) => (
          <StarIcon key={`f-${i}`} className="h-5 w-5" />
        ))}
        {hasHalf && <StarHalfIcon className="h-5 w-5" />}
        {Array.from({ length: empty }).map((_, i) => (
          <StarIcon key={`e-${i}`} className="h-5 w-5 text-ink/20" />
        ))}
      </div>
      <span className="text-sm font-semibold text-ink-soft">({count})</span>
    </div>
  );
}
