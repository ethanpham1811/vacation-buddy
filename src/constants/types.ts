/* --------------------------------------------Model Types-------------------------------------------- */

import { IconType } from 'react-icons'
import { API_TYPES } from './enum'

export type TCoords = {
  lat: number
  lng: number
}
export type TBounds = [number, number, number, number] // swLng swLat neLng neLat
export type TPlaceInfo = {
  id: string
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

export type TMarker = {
  type: 'Feature'
  properties: Pick<TPlaceInfo, 'id' | 'name' | 'thumbnail'> & {
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
    cluster: boolean
    point_count: number
  }
}
export type TSuperCluster = { getClusterExpansionZoom: (id: number) => number }
export type TAutoCompleteData = TCoords & {
  name: string
}

/* ---------------------------------------------Props Types--------------------------------------------- */
/* ----------------------------------------------Form Types---------------------------------------------- */
/* --------------------------------------------- Data Types---------------------------------------------- */
export type TTopControllerData = {
  name: API_TYPES
  icon: IconType
}
/* --------------------------------------------- Query Types---------------------------------------------- */
export type TCityAPIResponse = {
  detailsV2: {
    geocode: { latitude: number; longitude: number }
    names: {
      name: string
      longOnlyHierarchyTypeaheadV2: string
    }
  }
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
