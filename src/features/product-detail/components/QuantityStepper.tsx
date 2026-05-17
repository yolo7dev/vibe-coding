type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex h-11 overflow-hidden rounded border border-ink/40">
      <button
        type="button"
        onClick={dec}
        aria-label="Decrease quantity"
        className="flex w-10 items-center justify-center text-xl transition hover:bg-brand hover:text-white disabled:opacity-50"
        disabled={value <= min}
      >
        −
      </button>
      <span className="flex w-20 items-center justify-center border-x border-ink/40 text-lg font-medium tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        aria-label="Increase quantity"
        className="flex w-10 items-center justify-center text-xl transition hover:bg-brand hover:text-white disabled:opacity-50"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
