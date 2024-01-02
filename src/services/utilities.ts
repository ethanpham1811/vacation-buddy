import { IMAGEKIT_ENDPOINT } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { Map } from 'leaflet'
import { ImageLoaderProps } from 'next/image'

/* retrive bounds from leaflet map */
export function getBounds(myMap: Map): TBounds {
  const ne = myMap.getBounds().getNorthEast()
  const sw = myMap.getBounds().getSouthWest()
  return [sw.lng, sw.lat, ne.lng, ne.lat]
}

/* join conditional styling classes */
export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

/* format numbers */
export function formatNumber(number: number): string {
  // million format => '5.9M'
  if (number >= 1000000) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 1 }).format(number / 1000000) + 'M'
  }
  // thousand format => '22.3k'
  else if (number >= 1000) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 1 }).format(number / 1000) + 'k'
  }
  // normal format => '16.2'
  else {
    return new Intl.NumberFormat('en-US').format(number)
  }
}

/* loader for Next Image (from ik.imagekit.io) */
export const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = new URL(src)
  const rawPath = url.pathname
  const path = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath
  const params = [`w-${width}`]

  if (quality) params.push(`q-${quality}`)

  const paramsString = params.join(',')
  let urlEndpoint = IMAGEKIT_ENDPOINT

  if (urlEndpoint[urlEndpoint.length - 1] === '/') {
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1)
  }

  return `${urlEndpoint}/${path}?tr=${paramsString}`
}
