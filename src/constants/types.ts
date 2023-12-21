/* --------------------------------------------Model Types-------------------------------------------- */

import { FlyToInterpolator, ViewState } from 'react-map-gl'

export type TCoords = {
  latitude: number
  longitude: number
}
export type TPlace = TCoords & {
  name: string
}
export type TViewport = ViewState & {
  width?: string
  height?: string
  zoom?: number
  transitionInterpolator?: FlyToInterpolator
  transitionDuration?: number | 'auto' | undefined
}
export type TBound = {
  ne: number
  sw: number
}
export type TCityAPIResponse = {
  detailsV2: { geocode: { latitude: number; longitude: number }; names: { name: string; longOnlyHierarchyTypeaheadV2: string } }
}
export type TPlacesAPIResponse = {
  name: string
  latitude: string
  longitude: string
  description: string
  web_url: string
  images: {
    thumbnail: {
      url: string
    }
  }
}
export type TMarker = {
  type: 'Feature'
  properties: { cluster: false; name: string }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}
export type TCluster = TMarker & {
  id: number
  properties: { cluster: true; point_count: number; name: string }
}
export type TSuperCluster = { getClusterExpansionZoom: (id: number) => number }

/* ---------------------------------------------Props Types--------------------------------------------- */
/* ----------------------------------------------Form Types---------------------------------------------- */
/* --------------------------------------------- Data Types---------------------------------------------- */
/* --------------------------------------------- Query Types---------------------------------------------- */
/* ------------------------------------------- Next auth Types-------------------------------------------- */
