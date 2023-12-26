import { DEFAULT_ZOOM } from '@/constants/enum'
import { TBounds, TCluster, TMarker, TPlace, TSuperCluster } from '@/constants/types'
import { filterBycluster } from '@/lib/features/placeList/placeListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useEffect, useMemo } from 'react'
import useSupercluster from 'use-supercluster'

type TUseMarkerListResponse = {
  clusters: TCluster[]
  supercluster: TSuperCluster
}

/**
 * Transform list items to marker (TMarker) for cluster
 * - "cluster" -> the circle with number represent group of points
 * - "point" -> the individual place in the map (not cluster)
 */

function useMarkerList(data: TPlace[], bounds: TBounds | undefined, zoom: number | undefined, isFetching: boolean): TUseMarkerListResponse {
  const dispatch = useAppDispatch()
  const isFetchingData = useAppSelector((state) => state.placeList.loading)

  // convert TPlace to TMarker
  const points: TMarker[] = useMemo(
    () =>
      data.map(
        (item): TMarker => ({
          type: 'Feature',
          properties: { cluster: false, data: item },
          geometry: {
            type: 'Point',
            coordinates: [item?.lng, item?.lat]
          }
        })
      ),
    [data]
  )

  // transform data list to clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: zoom || DEFAULT_ZOOM,
    options: { radius: 100, disableRefresh: isFetching }
  })

  // fire filterByCluster Action
  useEffect(() => {
    isFetchingData === false && dispatch(filterBycluster({ clusters }))
  }, [isFetchingData, dispatch, clusters])

  return { clusters, supercluster }
}

export default useMarkerList
