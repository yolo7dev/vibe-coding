import { flashSaleProducts } from '../data';
import { Button } from '../../../components/Button';
import { CarouselControls } from '../../../components/CarouselControls';
import { ProductCard } from '../../../components/ProductCard';
import { SectionHeading } from '../../../components/SectionHeading';
import { FlashSalesTimer } from './FlashSalesTimer';

type FlashSalesProps = {
  target: Date;
};

export function FlashSales({ target }: FlashSalesProps) {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32">
      <div className="flex flex-wrap items-end justify-between gap-10 border-b border-line pb-16">
        <div className="flex flex-wrap items-end gap-20">
          <SectionHeading eyebrow="Today's" title="Flash Sales" />
          <FlashSalesTimer target={target} />
        </div>
        <CarouselControls />
      </div>

      <div className="grid grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {flashSaleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="flex justify-center pt-16">
        <Button>View All Products</Button>
      </div>
    </section>
  );
}
