import { TCluster, TMarker, TPlace, TSuperCluster } from '@/constants/types'
import useSupercluster from 'use-supercluster'

type TUseMarkerListResponse = {
  points: TMarker[]
  clusters: TCluster[]
  supercluster: TSuperCluster
}

/**
 * Transform list items to marker (TMarker) for cluster
 * @param  {NextPageContext} ctx
 */
function useMarkerList(data: TPlace[], bounds: any, zoom: number): TUseMarkerListResponse {
  // convert TPlace to TMarker
  const points: TMarker[] = data.map(({ name, longitude, latitude }) => ({
    type: 'Feature',
    properties: { cluster: false, name },
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  }))

  // transform data list to clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 35, maxZoom: 20 }
  })

  return { points, clusters, supercluster }
}

export default useMarkerList
