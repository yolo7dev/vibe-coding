import { ChevronLeftIcon, ChevronRightIcon } from './icons';

export function CarouselControls() {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label="Previous"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink transition hover:bg-ink hover:text-white"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink transition hover:bg-ink hover:text-white"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
