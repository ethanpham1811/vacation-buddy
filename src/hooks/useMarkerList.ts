import { DEFAULT_ZOOM } from '@/constants/enum'
import { TCluster, TMarker, TPlace, TSuperCluster } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useEffect } from 'react'
import useSupercluster from 'use-supercluster'

type TUseMarkerListResponse = {
  points: TMarker[]
  clusters: TCluster[]
  supercluster: TSuperCluster
}

/**
 * Transform list items to marker (TMarker) for cluster
 * - "cluster" -> the circle with number represent group of points
 * - "point" -> the individual place in the map (not cluster)
 */
function useMarkerList(data: TPlace[], bounds: any, zoom: number | undefined): TUseMarkerListResponse {
  // convert TPlace to TMarker
  const points: TMarker[] = data.map(
    ({ id, name, thumbnail, longitude, latitude }): TMarker => ({
      type: 'Feature',
      properties: { id, cluster: false, name, thumbnail },
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    })
  )

  // transform data list to clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: zoom ?? DEFAULT_ZOOM,
    options: { radius: 105, maxZoom: 20 }
  })

  // filter TPlace[] by point ids (not cluster)
  const pointIdList = clusters.filter((point) => !point?.properties?.cluster).map((point) => point.properties.id)
  const filteredData = data.filter((place) => pointIdList.includes(place.id))

  // fire event LOAD_NEW_PLACES to update data in right panel
  useEffect(() => {
    eventEmitter.dispatch(Events.LOAD_NEW_PLACES, { data: filteredData })
  }, [filteredData])

  return { points, clusters, supercluster }
}

export default useMarkerList
