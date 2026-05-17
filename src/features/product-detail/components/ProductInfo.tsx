import { useState } from 'react';
import { Button } from '../../../components/Button';
import { HeartIcon } from '../../../components/icons';
import { Rating } from '../../../components/Rating';
import type { ProductDetail, SizeOption } from '../types';
import { ColorSelector } from './ColorSelector';
import { DeliveryInfo } from './DeliveryInfo';
import { QuantityStepper } from './QuantityStepper';
import { SizeSelector } from './SizeSelector';

type ProductInfoProps = {
  product: ProductDetail;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const [color, setColor] = useState(product.colors[1]?.id ?? product.colors[0]?.id);
  const [size, setSize] = useState<SizeOption>('M');
  const [quantity, setQuantity] = useState(2);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-wide">
        {product.name}
      </h1>

      <div className="flex items-center gap-5 text-sm">
        <Rating value={product.rating} count={product.reviewCount} />
        <span className="h-4 w-px bg-ink/50" aria-hidden />
        <span className={product.inStock ? 'text-success' : 'text-brand'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <p className="font-display text-2xl">${product.price.toFixed(2)}</p>

      <p className="max-w-md text-sm leading-relaxed">{product.description}</p>

      <hr className="border-ink/30" />

      <ColorSelector
        colors={product.colors}
        selectedId={color ?? ''}
        onSelect={setColor}
      />

      <SizeSelector
        sizes={product.sizes}
        selected={size}
        onSelect={setSize}
      />

      <div className="flex items-center gap-4">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button className="!h-11 !px-12">Buy Now</Button>
        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex h-10 w-10 items-center justify-center rounded border border-ink/40 transition hover:border-brand hover:text-brand"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      <DeliveryInfo />
    </div>
  );
}
