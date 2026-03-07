interface ImageWithLogoProps {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  logoSize?: 'sm' | 'md' | 'lg'
  logo?: 'baterino' | 'lithtech'
}

const LOGO_SIZES = {
  sm: 'h-5 w-auto sm:h-6',
  md: 'h-6 w-auto sm:h-8',
  lg: 'h-8 w-auto sm:h-10',
} as const

const LOGO_SRC = {
  baterino: '/images/baterino-logo-white.png',
  lithtech: '/images/lithtech-logo-white 3.png',
} as const

export function ImageWithLogo({
  src,
  alt = '',
  className = '',
  imgClassName = 'object-cover',
  logoSize = 'md',
  logo = 'baterino',
}: ImageWithLogoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className={`h-full w-full ${imgClassName}`} />
      <img
        src={LOGO_SRC[logo]}
        alt={logo === 'lithtech' ? 'LithTech' : 'Baterino'}
        className={`absolute bottom-4 right-4 z-10 object-contain drop-shadow-sm ${LOGO_SIZES[logoSize]}`}
        aria-hidden
      />
    </div>
  )
}
