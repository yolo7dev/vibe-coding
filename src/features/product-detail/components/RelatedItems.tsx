import { ProductCard } from '../../../components/ProductCard';
import type { Product } from '../../../types/product.types';

type RelatedItemsProps = {
  items: Product[];
};

export function RelatedItems({ items }: RelatedItemsProps) {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32 pb-24">
      <div className="flex items-center gap-4">
        <span className="block h-10 w-5 rounded bg-brand" />
        <span className="text-base font-semibold text-brand">Related Item</span>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
