import { bestSellingProducts } from '../data';
import { Button } from '../../../components/Button';
import { ProductCard } from '../../../components/ProductCard';
import { SectionHeading } from '../../../components/SectionHeading';

export function BestSelling() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-16">
      <SectionHeading
        eyebrow="This Month"
        title="Best Selling Products"
        trailing={<Button className="!h-14 !px-12">View All</Button>}
      />

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellingProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
