import { Breadcrumb } from './components/Breadcrumb';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { RelatedItems } from './components/RelatedItems';
import { featuredProduct, relatedItems } from './data';

export function ProductDetailPage() {
  return (
    <>
      <Breadcrumb trail={featuredProduct.breadcrumb} />

      <section className="mx-auto max-w-screen-2xl px-8 pt-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[770px_1fr]">
          <ProductGallery
            images={featuredProduct.gallery}
            alt={featuredProduct.name}
          />
          <ProductInfo product={featuredProduct} />
        </div>
      </section>

      <RelatedItems items={relatedItems} />
    </>
  );
}
