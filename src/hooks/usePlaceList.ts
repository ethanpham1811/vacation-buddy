import { API_TYPES } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { fetchPlaceList } from '@/lib/features/placeList/placeListSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useQueryState } from 'next-usequerystate'

/**
 * Fetch places data with bounds
 */

function usePlaceList(): { requestData: (bounds: TBounds | undefined) => void } {
  const dispatch = useAppDispatch()
  const [type] = useQueryState('type')

  const requestData = (bounds: TBounds | undefined) => {
    if (!bounds) return

    dispatch(fetchPlaceList({ paramType: type || API_TYPES.attractions, bounds: bounds! }))
  }

  return { requestData }
}

export default usePlaceList
