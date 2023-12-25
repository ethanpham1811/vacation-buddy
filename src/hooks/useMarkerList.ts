import { DEFAULT_ZOOM } from '@/constants/enum'
import { TBounds, TCluster, TMarker, TPlace, TSuperCluster } from '@/constants/types'
import { placeListSignal } from '@/signals/placeListSignal'
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
  // convert TPlace to TMarker
  const points: TMarker[] = useMemo(
    () =>
      data.map(
        ({ name, thumbnail, lng, lat, id }): TMarker => ({
          type: 'Feature',
          properties: { id, cluster: false, name, thumbnail },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
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

  // filter TPlace[] by point ids (not cluster)
  const pointIdList: string[] = clusters.filter((point) => !point?.properties?.cluster).map((point) => point.properties.id)
  const filteredData: TPlace[] = data.filter((place) => pointIdList.includes(place.id))

  // update placeListSignal
  useEffect(() => {
    placeListSignal.value = filteredData
  }, [filteredData])

  return { clusters, supercluster }
}

export default useMarkerList
