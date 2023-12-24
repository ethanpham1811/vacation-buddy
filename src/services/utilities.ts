/* locate user current coords */
export function locateMe(cb: (lat: number, lng: number) => void) {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { longitude: lng, latitude: lat } }) => {
      cb(lat, lng)
    },
    null,
    { enableHighAccuracy: true }
  )
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
