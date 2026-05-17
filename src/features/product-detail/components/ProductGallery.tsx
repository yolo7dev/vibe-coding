import { useState } from 'react';

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const thumbnails = images.slice(0, 4);
  const main = images[active] ?? images[0];

  return (
    <div className="grid grid-cols-[170px_1fr] gap-7">
      <ul className="flex flex-col gap-4">
        {thumbnails.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`flex h-[138px] w-full items-center justify-center rounded bg-surface transition ${
                active === i ? 'ring-2 ring-brand' : 'hover:bg-surface-2'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                className="max-h-[100px] max-w-[120px] object-contain"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex h-[600px] items-center justify-center rounded bg-surface">
        <img
          src={main}
          alt={alt}
          className="max-h-[450px] max-w-[450px] object-contain"
        />
      </div>
    </div>
  );
}
