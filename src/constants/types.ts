/* --------------------------------------------Model Types-------------------------------------------- */

export type TCoors = {
  latitude: number
  longitude: number
}
export type TZoom = number
export type TPlace = TCoors & {
  name: string
}
export type TViewport = TCoors & { zoom: TZoom }
export type TBound = {
  ne: number
  sw: number
}
export type TPlacesAPIResponse = {
  detailsV2: { geocode: { latitude: number; longitude: number }; names: { name: string; longOnlyHierarchyTypeaheadV2: string } }
}

/* ---------------------------------------------Props Types--------------------------------------------- */
/* ----------------------------------------------Form Types---------------------------------------------- */
/* --------------------------------------------- Data Types---------------------------------------------- */
/* --------------------------------------------- Query Types---------------------------------------------- */
/* ------------------------------------------- Next auth Types-------------------------------------------- */
