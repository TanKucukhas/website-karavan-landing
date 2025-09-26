import Link from 'next/link';
import React from 'react';

type CTAButtonVariant = 'primary' | 'secondary' | 'outline';

interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: CTAButtonVariant;
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({ label, href, onClick, variant = 'primary', className, disabled }: CTAButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300';
  const sizes = 'px-6 py-3 text-base';
  const variants: Record<CTAButtonVariant, string> = {
    primary: 'bg-accent hover:bg-accent/90 text-white',
    secondary: 'bg-primary hover:bg-primary/90 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  const cls = `${base} ${sizes} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className ?? ''}`;

  if (href) {
    return (
      <Link href={href} className={cls} aria-disabled={disabled}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {label}
    </button>
  );
}


