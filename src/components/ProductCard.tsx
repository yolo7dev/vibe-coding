import type { MouseEvent } from 'react';
import type { Product } from '../types/product.types';
import { CartIcon, EyeIcon, HeartIcon } from './icons';
import { Rating } from './Rating';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    name,
    image,
    price,
    oldPrice,
    discountPercent,
    rating,
    ratingCount,
    badge,
    colorSwatches,
  } = product;

  const href = `#/product/${id}`;

  return (
    <article className="group flex flex-col gap-4">
      <a
        href={href}
        className="relative flex h-[250px] items-center justify-center overflow-hidden rounded bg-surface"
      >
        {discountPercent ? (
          <span className="absolute left-3 top-3 rounded bg-brand px-3 py-1 text-xs font-normal text-white">
            -{discountPercent}%
          </span>
        ) : null}
        {badge === 'new' && (
          <span className="absolute left-3 top-3 rounded bg-success px-3 py-1 text-xs font-normal text-white">
            NEW
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <IconButton ariaLabel="Add to wishlist">
            <HeartIcon className="h-4 w-4" />
          </IconButton>
          <IconButton ariaLabel="Quick view">
            <EyeIcon className="h-4 w-4" />
          </IconButton>
        </div>

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-[180px] w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={stop}
          className="absolute inset-x-0 bottom-0 flex h-10 translate-y-full items-center justify-center gap-2 bg-ink text-sm font-medium text-white transition-transform duration-200 group-hover:translate-y-0"
        >
          <CartIcon className="h-5 w-5" />
          Add To Cart
        </button>
      </a>

      <div className="space-y-2">
        <h3 className="text-base font-medium text-ink">
          <a href={href} className="hover:text-brand">
            {name}
          </a>
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-brand">${price}</span>
          {oldPrice ? (
            <span className="text-base font-medium text-ink/50 line-through">
              ${oldPrice}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <Rating value={rating} count={ratingCount} />
          {colorSwatches?.length ? (
            <div className="flex items-center gap-2">
              {colorSwatches.map((c) => (
                <span
                  key={c}
                  className="h-5 w-5 rounded-full ring-2 ring-white ring-offset-1 ring-offset-transparent"
                  style={{ backgroundColor: c }}
                  aria-hidden
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function stop(e: MouseEvent) {
  e.preventDefault();
}

function IconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={stop}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:text-brand"
    >
      {children}
    </button>
  );
}
