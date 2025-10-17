import 'flag-icons/css/flag-icons.min.css'

type FlagProps = {
  code: string // ISO 3166-1 alpha-2, lowercase (e.g., 'tr')
  title?: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
  shadow?: boolean
  square?: boolean // Use 1:1 ratio instead of 4:3
}

// Custom size styles inline since flag-icons doesn't have size variants
const sizeStyles = {
  xs: { width: '0.75em', height: '0.75em' },
  sm: { width: '1em', height: '1em' },
  md: { width: '1.33em', height: '1em' },
  lg: { width: '1.66em', height: '1.25em' },
  xl: { width: '2em', height: '1.5em' },
}

export default function Flag({ 
  code, 
  title, 
  className, 
  size = 'lg', 
  rounded = false,
  shadow = false,
  square = false
}: FlagProps) {
  const classes = [
    'fi', 
    `fi-${code.toLowerCase()}`,
    square && 'fis', // 1:1 ratio
    rounded && 'rounded',
    shadow && 'drop-shadow-sm',
    className
  ]
    .filter(Boolean)
    .join(' ')
    
  return (
    <span 
      className={classes} 
      style={sizeStyles[size]}
      title={title} 
      aria-label={title}
      role="img"
    />
  )
}


