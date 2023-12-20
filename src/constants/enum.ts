import { TViewport } from './types'

export const DEBOUNCE_TIMER = 300
export const DEFAULT_POINT = {
  lat: 10.99835602,
  lng: 77.01502627
}
export const DEFAULT_ZOOM = 12
export const DEFAULT_VIEWPORT: TViewport = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: DEFAULT_ZOOM
}
export const DEFAULT_BOUNDS = {
  ne: 11,
  sw: 11
}
export enum API_TYPES {
  restaurants = 'restaurants',
  hotels = 'hotels',
  attractions = 'attractions'
}
