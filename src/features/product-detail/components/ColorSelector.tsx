import type { SwatchColor } from '../types';

type ColorSelectorProps = {
  colors: SwatchColor[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ColorSelector({ colors, selectedId, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xl">Colours:</span>
      <ul className="flex items-center gap-2">
        {colors.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              aria-label={`Select ${c.id}`}
              aria-pressed={selectedId === c.id}
              onClick={() => onSelect(c.id)}
              className={`h-5 w-5 rounded-full transition ${
                selectedId === c.id ? 'ring-2 ring-ink ring-offset-2' : ''
              }`}
              style={{ backgroundColor: c.hex }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
