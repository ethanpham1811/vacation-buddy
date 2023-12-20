/* locate user current coords */
export function locateMe(cb: (lat: number, lng: number) => void) {
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    cb(longitude, latitude)
  })
}

/* join conditional styling classes */
export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
