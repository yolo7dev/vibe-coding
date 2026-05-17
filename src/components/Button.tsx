import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand/40',
  secondary:
    'bg-ink text-white hover:bg-ink-mute focus-visible:ring-ink/40',
  ghost:
    'bg-transparent text-ink hover:bg-surface-2 focus-visible:ring-ink/20',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex h-14 items-center justify-center rounded px-12 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
