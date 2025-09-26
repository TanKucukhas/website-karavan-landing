import 'flag-icons/css/flag-icons.min.css'

type FlagProps = {
  code: string // ISO 3166-1 alpha-2, lowercase (e.g., 'tr')
  title?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeToClass = {
  sm: 'fi-xs',
  md: 'fi-sm',
  lg: 'fi',
}

export default function Flag({ code, title, className, size = 'lg' }: FlagProps) {
  const classes = ['fi', `fi-${code.toLowerCase()}`, sizeToClass[size], className]
    .filter(Boolean)
    .join(' ')
  return <span className={classes} title={title} aria-label={title} />
}


