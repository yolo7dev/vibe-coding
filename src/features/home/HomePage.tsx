import { BestSelling } from './components/BestSelling';
import { BrowseByCategory } from './components/BrowseByCategory';
import { ExploreProducts } from './components/ExploreProducts';
import { FlashSales } from './components/FlashSales';
import { Hero } from './components/Hero';
import { MusicBanner } from './components/MusicBanner';
import { NewArrival } from './components/NewArrival';
import { ServicesRow } from './components/ServicesRow';

const FLASH_SALE_TARGET = new Date(Date.now() + 3 * 86_400_000 + 23 * 3_600_000 + 19 * 60_000 + 56_000);
const MUSIC_TARGET = new Date(Date.now() + 5 * 86_400_000 + 23 * 3_600_000 + 59 * 60_000 + 35_000);

export function HomePage() {
  return (
    <>
      <Hero />
      <FlashSales target={FLASH_SALE_TARGET} />
      <BrowseByCategory />
      <BestSelling />
      <MusicBanner target={MUSIC_TARGET} />
      <ExploreProducts />
      <NewArrival />
      <ServicesRow />
    </>
  );
}
