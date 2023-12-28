import { TBounds } from '@/constants/types'
import { Map } from 'leaflet'

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
