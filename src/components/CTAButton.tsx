import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary'|'secondary'|'outline'|'ghost';
  size?: 'sm'|'md'|'lg';
  className?: string;
};

const sizeMap = {
  sm:'px-3 py-2 text-sm',
  md:'px-5 py-3 text-base',
  lg:'px-7 py-4 text-lg'
};

export default function CTAButton({ children, href='#', onClick, variant='primary', size='md', className }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl font-semibold transition';
  const styles = {
    primary:  'bg-red-600 text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600',
    secondary:'bg-accent-600 text-white hover:bg-accent-500',
    outline:  'border border-white/60 text-white hover:bg-white/10',
    ghost:    'text-white/90 hover:text-white'
  }[variant];

  return (
    <a href={href} onClick={onClick} className={clsx(base, styles, sizeMap[size], className)}>
      {children}
    </a>
  );
}
