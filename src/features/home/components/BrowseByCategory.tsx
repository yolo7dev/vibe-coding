import { iconCategories } from '../data';
import { CarouselControls } from '../../../components/CarouselControls';
import { CategoryCard } from './CategoryCard';
import { SectionHeading } from '../../../components/SectionHeading';

export function BrowseByCategory() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32 pb-16 border-b border-line">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Categories" title="Browse By Category" />
        <CarouselControls />
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {iconCategories.map((c, i) => (
          <CategoryCard key={c.label} category={c} active={i === 3} />
        ))}
      </div>
    </section>
  );
}
