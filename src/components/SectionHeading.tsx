import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  trailing?: ReactNode;
};

export function SectionHeading({ eyebrow, title, trailing }: SectionHeadingProps) {
  return (
    <header className="flex items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-4">
          <span className="block h-10 w-5 rounded bg-brand" />
          <span className="text-base font-semibold text-brand">{eyebrow}</span>
        </div>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-[0.03em] text-ink">
          {title}
        </h2>
      </div>
      {trailing}
    </header>
  );
}
