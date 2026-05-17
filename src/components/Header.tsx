import { useEffect, useState } from 'react';
import { CartIcon, HeartIcon, SearchIcon } from './icons';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#contact', label: 'Contact' },
  { href: '#about', label: 'About' },
  { href: '#signup', label: 'Sign Up' },
];

export function Header() {
  const [hash, setHash] = useState(() => window.location.hash || '#home');

  useEffect(() => {
    function update() {
      setHash(window.location.hash || '#home');
    }
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-10 px-8">
        <a href="#home" className="font-display text-2xl font-bold tracking-wide">
          Exclusive
        </a>

        <nav>
          <ul className="flex items-center gap-12 text-base">
            {navItems.map((item) => {
              const active = hash === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative pb-1 ${
                      active ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink/40' : ''
                    } hover:text-brand`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <label className="flex h-10 w-64 items-center gap-3 rounded bg-surface px-4">
            <input
              type="search"
              placeholder="What are you looking for?"
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-ink/60"
            />
            <SearchIcon className="h-5 w-5 text-ink/70" />
          </label>

          <button type="button" aria-label="Wishlist" className="hover:text-brand">
            <HeartIcon className="h-7 w-7" />
          </button>
          <button type="button" aria-label="Cart" className="hover:text-brand">
            <CartIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>
  );
}
