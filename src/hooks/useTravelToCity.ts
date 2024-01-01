import { DEFAULT_ZOOM } from '@/constants/enum'
import { TCoords, TParams, TRequestDataFn, TUpdateParams } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * TRAVEL_TO_CITY event listener:
 * - move map viewport to city's location
 * - request data for that location
 * - update search params lat lng (by location) and zoom (by default)
 */

function useTravelToCity(map: Map, requestData: TRequestDataFn, params: TParams, updateParams: TUpdateParams) {
  const { type } = params

  useEffect(() => {
    eventEmitter.subscribe(Events.TRAVEL_TO_CITY, (location: unknown) => {
      const { lat, lng } = location as TCoords

      // move map viewport
      map.setView([lat, lng], DEFAULT_ZOOM)

      // update params
      updateParams({ lat, lng, zoom: DEFAULT_ZOOM })

      // request data
      requestData(getBounds(map), type)
    })

    /* cleanup */
    return () => {
      eventEmitter.unsubscribe(Events.TRAVEL_TO_CITY)
    }
  }, [map, params, requestData, type, updateParams])
}

export default useTravelToCity
