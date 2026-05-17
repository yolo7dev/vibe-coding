import { Button } from '../../../components/Button';
import { MusicTimer } from './MusicTimer';

type MusicBannerProps = {
  target: Date;
};

export function MusicBanner({ target }: MusicBannerProps) {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32">
      <div className="relative isolate overflow-hidden rounded bg-ink text-white">
        <div
          className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[504px] w-[504px] -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
          }}
          aria-hidden
        />

        <div className="grid grid-cols-1 items-center gap-10 px-14 py-16 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="text-base font-semibold text-success">Categories</span>
            <h2 className="font-display text-5xl font-semibold leading-tight tracking-wide">
              Enhance Your
              <br />
              Music Experience
            </h2>
            <MusicTimer target={target} />
            <div>
              <Button
                variant="primary"
                className="!bg-success !text-white hover:!bg-success/80"
              >
                Buy Now!
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
              alt="JBL speaker"
              className="max-h-[330px] w-auto object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
