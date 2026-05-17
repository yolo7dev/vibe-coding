import { useCountdown } from '../hooks/useCountdown';

type FlashSalesTimerProps = {
  target: Date;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function FlashSalesTimer({ target }: FlashSalesTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(target);

  const units: Array<[string, number]> = [
    ['Days', days],
    ['Hours', hours],
    ['Minutes', minutes],
    ['Seconds', seconds],
  ];

  return (
    <div className="flex items-end gap-4">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-end gap-4">
          <div>
            <div className="text-xs font-medium">{label}</div>
            <div className="font-display text-3xl font-bold tracking-wide tabular-nums">
              {pad(value)}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="pb-1 text-3xl font-bold text-brand">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
