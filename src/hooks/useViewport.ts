'use client'
import { DEFAULT_ZOOM } from '@/constants/enum'
import { TCoords, TViewport } from '@/constants/types'
import { locateMe } from '@/services/utilities'
import { useQueryState } from 'next-usequerystate'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import { MapRef } from 'react-map-gl'

type TUseViewportResponse = {
  viewport: TViewport
  setViewport: Dispatch<SetStateAction<TViewport>>
}

/**
 * Transform list items to marker (TMarker) for cluster
 * @param  {NextPageContext} ctx
 */
function useViewport(mapRef: MutableRefObject<MapRef | null>): TUseViewportResponse {
  const [latitude] = useQueryState('latitude')
  const [longitude] = useQueryState('longitude')
  const [viewport, setViewport] = useState<TViewport>({ zoom: DEFAULT_ZOOM })

  /**
   * On receiving new latitude & longitude from SEARCH PARAMS:
   * - Search params is not null:   update viewport with search params lat & long
   * - Search params is null:       update viewport with current user location
   */
  useEffect(() => {
    if (!mapRef?.current) return

    if (latitude && longitude) {
      setViewport((prev): TViewport => ({ ...prev, latitude: parseFloat(latitude), longitude: parseFloat(longitude) }))
    } else {
      locateMe((coords: TCoords) => setViewport((prev): TViewport => ({ ...prev, ...coords })))
    }
  }, [latitude, longitude, mapRef])

  return { viewport, setViewport }
}

export default useViewport
