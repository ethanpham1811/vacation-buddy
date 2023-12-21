'use client'
import { DEBOUNCE_TIMER_MOVE_VIEWPORT } from '@/constants/enum'
import { TPlace } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
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
 * @param  {number[]} bounds  //  [trlng, trlat, bllng, bllat]
 */

function usePlaceList(bounds: number[]): TUsePlaceListResponse {
  const [places, setPlaces] = useState<TPlace[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trlng, trlat, bllng, bllat] = bounds || [null, null, null, null]

  const fetchPlaces = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true)
      const res = await fetch(`/api/places/${'attractions'}`, {
        method: 'POST',
        body: JSON.stringify({
          trlng,
          trlat,
          bllng,
          bllat
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

      // fire event LOAD_NEW_PLACES to update data in right panel
      eventEmitter.dispatch(Events.LOAD_NEW_PLACES, { data })

      setIsLoading(false)
    },
    [trlng]
  )

  useEffect(() => {
    const abortCtrl = new AbortController()

    const timeout = setTimeout(() => {
      fetchPlaces(abortCtrl.signal)
    }, DEBOUNCE_TIMER_MOVE_VIEWPORT)

    /**
     * on receiving new input
     * - clear debounce timer
     * - abort prev request
     */
    return () => {
      timeout && clearTimeout(timeout)
      abortCtrl && abortCtrl.abort()
    }
  }, [trlng]) // only need 1 of 4 coords to trigger

  return { places, isLoading, error }
}

export default usePlaceList
