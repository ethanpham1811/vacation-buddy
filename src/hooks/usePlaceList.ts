import { API_TYPES, DEBOUNCE_TIMER_MOVE_VIEWPORT } from '@/constants/enum'
import { TBounds, TPlace } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useEffect, useState } from 'react'

type TUsePlaceListResponse = {
  places: TPlace[]
  isLoading: boolean
  error: string | null
}

/**
 * Fetch places data from on receiving new bounds
 * - debounce on changing map viewport
 * - abort concurrent request before dispatching new request
 * @param  {TBounds} bounds  //  [swLng, swLat, neLng, neLat]
 */

function usePlaceList(bounds: TBounds | undefined): TUsePlaceListResponse {
  const [paramType] = useQueryState('type')
  const [places, setPlaces] = useState<TPlace[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [swLng, swLat, neLng, neLat] = bounds || []

  const fetchPlaces = useCallback(
    async (signal: AbortSignal) => {
      if (!swLng) return

      setIsLoading(true)
      const res = await fetch(`/api/places/${paramType || API_TYPES.attractions}`, {
        method: 'POST',
        body: JSON.stringify({
          tr_lng: neLng,
          tr_lat: neLat,
          bl_lng: swLng,
          bl_lat: swLat,
          isParis: neLng?.toString().startsWith('2.4')
        }),
        signal
      })

      // on error: return & show error msg
      if (!res.ok) {
        eventEmitter.dispatch(Events.LOAD_NEW_PLACES, { error: 'Failed to fetch places list' })
        setError('Failed to fetch places list')
        return
      }

      // update places list
      const { data } = await res.json()
      setPlaces(data)

      setIsLoading(false)
    },
    [swLng, paramType]
  )

  /**
   * on receiving new input
   * - clear debounce timer
   * - abort prev request
   * - request data "fetchPlaces"
   */
  useEffect(() => {
    const abortCtrl = new AbortController()

    const timeout = setTimeout(() => {
      fetchPlaces(abortCtrl.signal)
    }, DEBOUNCE_TIMER_MOVE_VIEWPORT)

    return () => {
      timeout && clearTimeout(timeout)
      abortCtrl && abortCtrl.abort()
    }
  }, [swLng, paramType]) // only need 1 of 4 coords to trigger

  return { places, isLoading, error }
}

export default usePlaceList
