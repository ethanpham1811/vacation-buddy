/* --------------------------------------------Model Types-------------------------------------------- */

import { IconType } from 'react-icons'
import { FlyToInterpolator, ViewState } from 'react-map-gl'
import { API_TYPES } from './enum'

export type TCoords = {
  latitude: number
  longitude: number
}
export type TPlaceInfo = {
  location_id: string
  name: string
  thumbnail?: string
  photo?: string
  description?: string
  website?: string
  web_url?: string
  address?: string
  phone?: string
  rating?: string
  num_reviews?: string
  open_now_text?: string
  price?: string
}
export type TPlace = TCoords & TPlaceInfo
export type TViewport = ViewState & {
  width?: string
  height?: string
  zoom?: number
  transitionInterpolator?: FlyToInterpolator
  transitionDuration?: number | 'auto' | undefined
}
export type TMarker = {
  type: 'Feature'
  properties: Pick<TPlaceInfo, 'name' | 'thumbnail'> & {
    cluster: false
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}
export type TCluster = TMarker & {
  id: number
  properties: Pick<TPlaceInfo, 'name' | 'thumbnail'> & {
    cluster: true
    point_count: number
  }
}
export type TSuperCluster = { getClusterExpansionZoom: (id: number) => number }

/* ---------------------------------------------Props Types--------------------------------------------- */
/* ----------------------------------------------Form Types---------------------------------------------- */
/* --------------------------------------------- Data Types---------------------------------------------- */
export type TTopControllerData = {
  name: API_TYPES
  icon: IconType
}
/* --------------------------------------------- Query Types---------------------------------------------- */
export type TCityAPIResponse = {
  detailsV2: { geocode: { latitude: number; longitude: number }; names: { name: string; longOnlyHierarchyTypeaheadV2: string } }
}
export type TPlacesAPIResponse = {
  latitude: string
  longitude: string
  name: string
  location_id: string
  description?: string
  rating?: string
  num_reviews?: string
  photo?: {
    images: {
      thumbnail: {
        url: string
      }
      medium: {
        url: string
      }
    }
  }
  website?: string
  web_url?: string
  address?: string
  phone?: string
  open_now_text?: string
  price?: string
}
export type TPlaceListEventResponse = {
  data?: TPlace[]
  error?: string
}
/* ------------------------------------------- Next auth Types-------------------------------------------- */
