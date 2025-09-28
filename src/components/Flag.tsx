import 'flag-icons/css/flag-icons.min.css'

type FlagProps = {
  code: string // ISO 3166-1 alpha-2, lowercase (e.g., 'tr')
  title?: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
  shadow?: boolean
}

const sizeToClass = {
  xs: 'fi-xs',
  sm: 'fi-sm', 
  md: 'fi-md',
  lg: 'fi',
  xl: 'fi-lg',
}

export default function Flag({ 
  code, 
  title, 
  className, 
  size = 'lg', 
  rounded = false,
  shadow = false 
}: FlagProps) {
  const classes = [
    'fi', 
    `fi-${code.toLowerCase()}`, 
    sizeToClass[size],
    rounded && 'rounded',
    shadow && 'drop-shadow-sm',
    className
  ]
    .filter(Boolean)
    .join(' ')
    
  return (
    <span 
      className={classes} 
      title={title} 
      aria-label={title}
      role="img"
    />
  )
}


