import { API_TYPES, DEBOUNCE_TIMER_MOVE_VIEWPORT } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { fetchPlaceList } from '@/lib/features/placeList/placeListSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useQueryState } from 'next-usequerystate'

/**
 * Fetch places data from on receiving new bounds
 * - debounce on changing map viewport
 * - abort concurrent request before dispatching new request
 */

function usePlaceList(): { requestData: (bounds: TBounds | undefined) => void } {
  const dispatch = useAppDispatch()

  const [paramType] = useQueryState('type')

  /**
   * on receiving new input
   * - clear debounce timer
   * - abort prev request
   * - fire "fetchPlaceList" Action
   */

  const requestData = (bounds: TBounds | undefined) => {
    if (!bounds) return

    const abortCtrl = new AbortController()

    const timeout = setTimeout(() => {
      dispatch(fetchPlaceList({ signal: abortCtrl.signal, paramType: paramType || API_TYPES.attractions, bounds: bounds! }))
    }, DEBOUNCE_TIMER_MOVE_VIEWPORT)

    // clear timeout & abort request
    return () => {
      timeout && clearTimeout(timeout)
      abortCtrl && abortCtrl.abort()
    }
  }
  return { requestData }
}

export default usePlaceList
