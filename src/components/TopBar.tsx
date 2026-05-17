import { ChevronDownIcon } from './icons';

export function TopBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex h-12 max-w-screen-2xl items-center justify-between gap-4 px-8 text-sm">
        <div className="flex-1 text-center">
          <span className="opacity-90">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </span>
          <a
            href="#shop"
            className="ml-2 font-semibold underline-offset-4 hover:underline"
          >
            ShopNow
          </a>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 opacity-90 hover:opacity-100"
        >
          English
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
