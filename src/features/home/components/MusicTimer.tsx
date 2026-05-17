import { useCountdown } from '../hooks/useCountdown';

type MusicTimerProps = {
  target: Date;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function MusicTimer({ target }: MusicTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const items: Array<[string, number]> = [
    ['Days', days],
    ['Hours', hours],
    ['Minutes', minutes],
    ['Seconds', seconds],
  ];

  return (
    <ul className="flex gap-6">
      {items.map(([label, value]) => (
        <li
          key={label}
          className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-ink"
        >
          <span className="text-base font-semibold tabular-nums leading-none">
            {pad(value)}
          </span>
          <span className="mt-1 text-[11px] leading-none">{label}</span>
        </li>
      ))}
    </ul>
  );
}
