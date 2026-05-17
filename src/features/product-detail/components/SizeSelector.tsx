import type { SizeOption } from '../types';

type SizeSelectorProps = {
  sizes: SizeOption[];
  selected: SizeOption;
  onSelect: (size: SizeOption) => void;
};

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-xl">Size:</span>
      <ul className="flex items-center gap-4">
        {sizes.map((s) => {
          const active = selected === s;
          return (
            <li key={s}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(s)}
                className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-medium transition ${
                  active
                    ? 'border-brand bg-brand text-white'
                    : 'border-ink/40 bg-white text-ink hover:border-brand hover:text-brand'
                }`}
              >
                {s}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
