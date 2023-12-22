import { DEFAULT_ZOOM } from '@/constants/enum'
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
function useMarkerList(data: TPlace[], bounds: any, zoom: number | undefined): TUseMarkerListResponse {
  // convert TPlace to TMarker
  const points: TMarker[] = data.map(
    ({ name, thumbnail, longitude, latitude }): TMarker => ({
      type: 'Feature',
      properties: { cluster: false, name, thumbnail },
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

  return { points, clusters, supercluster }
}

export default useMarkerList
