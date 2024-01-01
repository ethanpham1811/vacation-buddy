import NoImgUrl from '@/assets/images/no_img.png'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type TMyImageProps = ImageProps & {
  src: string
  fallbackSrc?: string
  alt: string
}

export default function MyImage({ src, fallbackSrc, alt, ...rest }: TMyImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return <Image key={imgSrc} src={imgSrc} onError={() => setImgSrc(fallbackSrc ?? NoImgUrl.src)} alt={alt} {...rest} />
}
