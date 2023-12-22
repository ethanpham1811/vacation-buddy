/* settings */
export const DEBOUNCE_TIMER_AUTOCOMPLETE = 300
export const DEBOUNCE_TIMER_MOVE_VIEWPORT = 500
export const MAPBOX_MAP_GL_STYLE = 'mapbox://styles/mapbox/streets-v9'
export const QUERY_LIMIT = 10
export const DEFAULT_ZOOM = 13
export const MAX_ZOOM = 15
export const MIN_ZOOM = 12

/* data */
export enum API_TYPES {
  restaurants = 'restaurants',
  hotels = 'hotels',
  attractions = 'attractions'
}
export enum OPEN_STATUS {
  open = 'Open',
  closes = 'Closes',
  closed = 'Closed'
}

/* others */
export const BLURRED_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk3PKkHgAEcQIa1fFT6QAAAABJRU5ErkJggg=='
