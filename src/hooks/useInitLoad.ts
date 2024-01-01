import { API_TYPES, DEFAULT_ZOOM } from '@/constants/enum'
import { TParams, TRequestDataFn, TUpdateParams } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * on initial load, search params provided:
 * - move map viewport to current user's location
 *
 * if search params not provided, trigger TRAVEL_TO_USER_LOCATION event:
 *
 *  1. locate user location
 *  2. update lat and lng with (user's location), default type & zoom
 *  3. request for data at that location
 *
 */

function useInitLoad(map: Map, requestData: TRequestDataFn, params: TParams, updateParams: TUpdateParams) {
  const { lat, lng, zoom, type } = params

  /* event listener */
  useEffect(() => {
    eventEmitter.subscribe(Events.TRAVEL_TO_USER_LOCATION, () => {
      // move map viewport
      map.locate({ setView: true, maxZoom: DEFAULT_ZOOM }).on('locationfound', (e) => {
        // request params
        requestData(getBounds(map), type)

        // update params
        updateParams({ lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: DEFAULT_ZOOM })
      })
    })

    /* cleanup */
    return () => {
      eventEmitter.unsubscribe(Events.TRAVEL_TO_USER_LOCATION)
    }
  }, [map, requestData, type, updateParams])

  /* initial load check */
  useEffect(() => {
    if (lat && lng && map) {
      map.setView([lat, lng], zoom ?? DEFAULT_ZOOM)
    } else {
      eventEmitter.dispatch(Events.TRAVEL_TO_USER_LOCATION)
    }

    // set param "type if none was provided"
    !type && updateParams({ type: API_TYPES.attractions })
  }, [map])
}

export default useInitLoad
