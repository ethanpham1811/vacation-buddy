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
  ranking?: string
  offer_group?: {
    offer_list?: {
      price?: string
      url?: string
      title?: string
      image_url?: string
    }[]
  }
}
export type TPlace = TCoords & TPlaceInfo
export type TPoint = TPlace & { zoom: number }

export type TMarker = {
  type: 'Feature'
  properties: {
    data: TPlace
    cluster: false
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}
export type TCluster = TMarker & {
  id: number
  properties: {
    data: TPoint
    cluster: boolean
    point_count: number
  }
}
export type TSuperCluster = { getClusterExpansionZoom: (id: number) => number }
export type TAutoCompleteData = TCoords & {
  name: string
}

export type TActivePoint = TCoords & { id: string; zoom: number }

export type TFavorite = TActivePoint & {
  photo: string
  name: string
}

/* ---------------------------------------------Props Types--------------------------------------------- */
/* ----------------------------------------------Form Types---------------------------------------------- */
/* --------------------------------------------- Data Types---------------------------------------------- */
export type TTopControllerData = {
  name: API_TYPES
  icon: IconType
  disabled?: boolean
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
  ranking?: string
  offer_group?: {
    offer_list?: {
      price?: string
      url?: string
      title?: string
      image_url?: string
    }[]
  }
}
export type TPlaceListEventResponse = {
  data?: TPlace[]
  error?: string
}
/* ------------------------------------------- Next auth Types-------------------------------------------- */
