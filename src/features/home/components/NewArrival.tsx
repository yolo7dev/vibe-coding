import type { ReactNode } from 'react';
import { SectionHeading } from '../../../components/SectionHeading';

type TileProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
  dark?: boolean;
};

function Tile({ title, description, image, className = '', dark = false }: TileProps) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded ${
        dark ? 'bg-ink' : 'bg-surface-2'
      } ${className}`}
    >
      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full ${
          dark ? 'object-contain' : 'object-cover'
        } ${dark ? 'object-bottom' : ''}`}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-8 text-white">
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <p className="max-w-xs text-sm text-white/80">{description}</p>
        <a
          href="#"
          className="mt-2 w-fit border-b border-white pb-1 text-sm font-medium"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

type GridProps = { children: ReactNode };
function Grid({ children }: GridProps) {
  return (
    <div className="mt-16 grid h-[600px] grid-cols-1 gap-8 lg:grid-cols-2">
      {children}
    </div>
  );
}

export function NewArrival() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32 pb-16">
      <SectionHeading eyebrow="Featured" title="New Arrival" />

      <Grid>
        <Tile
          dark
          title="PlayStation 5"
          description="Black and White version of the PS5 coming out on sale."
          image="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80"
          className="row-span-2 h-full"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Tile
            dark
            title="Women's Collections"
            description="Featured woman collections that give you another vibe."
            image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            className="col-span-full h-[284px]"
          />
          <Tile
            dark
            title="Speakers"
            description="Amazon wireless speakers"
            image="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
            className="h-[284px]"
          />
          <Tile
            dark
            title="Perfume"
            description="GUCCI INTENSE OUD EDP"
            image="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
            className="h-[284px]"
          />
        </div>
      </Grid>
    </section>
  );
}
