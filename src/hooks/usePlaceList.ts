import { API_TYPES } from '@/constants/enum'
import { TBounds, TRequestDataFn } from '@/constants/types'
import { fetchPlaceList } from '@/lib/features/placeList/placeListSlice'
import { useAppDispatch } from '@/lib/hooks'

/**
 * Fetch places data with bounds
 */

function usePlaceList(): { requestData: TRequestDataFn } {
  const dispatch = useAppDispatch()

  const requestData = (bounds: TBounds | undefined, type: string | null | undefined) => {
    if (!bounds) return

    dispatch(fetchPlaceList({ paramType: type || API_TYPES.attractions, bounds: bounds! }))
  }

  return { requestData }
}

export default usePlaceList
