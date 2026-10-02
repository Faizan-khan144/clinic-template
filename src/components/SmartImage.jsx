const WIDTHS = [480, 768, 1200]

export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  style,
  ...rest
}) {
  const base = src.replace(/\.jpg$/, '')
  const srcSet = [...WIDTHS.map((w) => `${base}-${w}.jpg ${w}w`), `${src} 1600w`].join(', ')

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`${className} ${imgClassName}`.trim()}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}

export function responsiveSrc(src) {
  const base = src.replace(/\.jpg$/, '')
  return [...WIDTHS.map((w) => `${base}-${w}.jpg ${w}w`), `${src} 1600w`].join(', ')
}
