import { ChevronUpIcon } from './icons';

export function ScrollToTop() {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className="fixed bottom-10 right-10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink shadow-md transition hover:bg-ink hover:text-white"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  );
}
