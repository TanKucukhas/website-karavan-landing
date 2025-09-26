import clsx from 'clsx'
import React, { forwardRef } from 'react'

type LinkProps = {
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'a'>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(
          'text-blue-600 hover:text-blue-500 transition-colors',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'