import clsx from 'clsx'

export function NavLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100',
        props.className
      )}
      {...props}
    >
      {children}
    </a>
  )
}