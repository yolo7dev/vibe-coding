type BreadcrumbProps = {
  trail: string[];
};

export function Breadcrumb({ trail }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-screen-2xl px-8 pt-20">
      <ol className="flex flex-wrap items-center gap-3 text-sm">
        {trail.map((label, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={label} className="flex items-center gap-3">
              <span className={isLast ? 'text-ink' : 'text-ink/50'}>{label}</span>
              {!isLast && <span className="text-ink/50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
