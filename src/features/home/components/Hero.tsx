import { sidebarCategories } from '../data';
import { ArrowRightIcon, ChevronRightIcon } from '../../../components/icons';

export function Hero() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[217px_1fr]">
        <aside className="border-r border-line pr-8 lg:py-6">
          <ul className="space-y-4 text-base">
            {sidebarCategories.map((c) => (
              <li
                key={c.label}
                className="flex items-center justify-between text-ink hover:text-brand"
              >
                <a href="#">{c.label}</a>
                {c.hasMenu && <ChevronRightIcon className="h-5 w-5" />}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex h-[344px] items-center justify-between gap-10 bg-ink px-12 text-white">
          <div className="max-w-md space-y-5">
            <div className="flex items-center gap-6">
              <AppleLogo />
              <span className="text-sm">iPhone 14 Series</span>
            </div>
            <h1 className="font-display text-5xl font-semibold leading-tight tracking-wide">
              Up to 10%
              <br />
              off Voucher
            </h1>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 border-b border-white pb-1 text-base font-medium"
            >
              Shop Now
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=900&q=80"
            alt="iPhone 14"
            className="h-full max-h-[340px] w-auto object-contain"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 lg:ml-[217px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            aria-hidden
            className={`h-3 w-3 rounded-full ${
              i === 2 ? 'bg-brand ring-2 ring-white' : 'bg-ink/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 40 49"
      className="h-10 w-8"
      fill="currentColor"
      aria-hidden
    >
      <path d="M27.86 25.7c-.05-5.13 4.19-7.61 4.39-7.72-2.4-3.5-6.13-3.98-7.45-4.03-3.17-.32-6.2 1.87-7.8 1.87-1.62 0-4.1-1.83-6.74-1.78-3.47.05-6.66 2.02-8.45 5.12-3.6 6.24-.92 15.45 2.58 20.52 1.71 2.48 3.74 5.27 6.41 5.17 2.57-.1 3.55-1.65 6.66-1.65 3.08 0 3.99 1.65 6.71 1.59 2.77-.05 4.53-2.52 6.22-5.02 1.96-2.86 2.77-5.66 2.81-5.81-.06-.02-5.39-2.06-5.45-8.16zM23.06 8.41c1.41-1.7 2.36-4.07 2.1-6.41-2.04.08-4.5 1.36-5.96 3.06-1.3 1.5-2.45 3.91-2.14 6.21 2.27.18 4.59-1.16 6-2.86z" />
    </svg>
  );
}
