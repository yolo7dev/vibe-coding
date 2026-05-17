import { exploreProducts } from '../data';
import { Button } from '../../../components/Button';
import { CarouselControls } from '../../../components/CarouselControls';
import { ProductCard } from '../../../components/ProductCard';
import { SectionHeading } from '../../../components/SectionHeading';

export function ExploreProducts() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Our Products" title="Explore Our Products" />
        <CarouselControls />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {exploreProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="flex justify-center pt-16">
        <Button>View All Products</Button>
      </div>
    </section>
  );
}
