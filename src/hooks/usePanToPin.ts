import { DEFAULT_ZOOM } from '@/constants/enum'
import { TActivePin } from '@/constants/types'
import { setActivePin } from '@/lib/features/activePin/activePinSlice'
import { useAppDispatch } from '@/lib/hooks'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * PAN_TO_PIN event listener:
 * - move viewport to location
 * - activate the location's pin
 */

function usePanToPin(map: Map) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    eventEmitter.subscribe(Events.PAN_TO_PIN, (pin: unknown) => {
      const { id, type, lat, lng, zoom, isTravel } = pin as TActivePin & { isTravel?: boolean }

      // move map viewport
      map.setView([lat, lng], isTravel ? DEFAULT_ZOOM : zoom)

      // activate pin
      dispatch(setActivePin({ id, lat, lng, zoom, type }))
    })

    /* cleanup */
    return () => {
      eventEmitter.unsubscribe(Events.PAN_TO_PIN)
    }
  }, [dispatch, map])
}

export default usePanToPin
