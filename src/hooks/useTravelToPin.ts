import { TActivePin, TRequestDataFn, TUpdateParams } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * TRAVEL_TO_SAVED_PIN event listener:
 *
 * !Important note: the data around the location need to be fetched entirely (up to min zoom)
 * This will prevent the bug where user navigate to the location from favorite panel without
 * full data of the area (this cause cluster to not working properly). So we break it into 3 steps:
 *
 * 1. move map view port to pin's location with the default zoom (min zoom) + set active pin
 *
 * this way we receive possible biggest bounds of the location (restricted by min zoom)
 *
 * 2. request data by this bounds => to get all places within this area
 * 3. zoom in by the zoom param
 */

function useTravelToPin(map: Map, requestData: TRequestDataFn, updateParams: TUpdateParams) {
  useEffect(() => {
    eventEmitter.subscribe(Events.TRAVEL_TO_SAVED_PIN, (pin: unknown) => {
      const { lat, lng, zoom, type } = pin as TActivePin

      // trigger PAN_TO_PIN with default zoom
      eventEmitter.dispatch(Events.PAN_TO_PIN, { ...(pin as TActivePin), isTravel: true })

      // request data
      requestData(getBounds(map), type)

      // now zoom into the pin's zoom
      map.setZoom(zoom)

      // update params
      updateParams({ lat, lng, zoom, type })
    })

    /* cleanup */
    return () => {
      eventEmitter.unsubscribe(Events.TRAVEL_TO_SAVED_PIN)
    }
  }, [map, requestData, updateParams])
}

export default useTravelToPin
