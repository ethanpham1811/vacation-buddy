'use client'
import { TBounds, TCluster } from '@/constants/types'
import { useMarkerList } from '@/hooks'
import { useAppSelector } from '@/lib/hooks'
import { Map } from 'leaflet'
import Cluster from '../Marker/Cluster'
import Pin from '../Pin/Pin'

type TMarkerGridProps = {
  bounds: TBounds | undefined
  myMap: Map
}

function MarkerGrid({ bounds, myMap }: TMarkerGridProps) {
  const places = useAppSelector((state) => state.placeList.data)
  const isLoading = useAppSelector((state) => state.placeList.loading)
  const activePoint = useAppSelector((state) => state.activePoint.data)

  /* build cluster with data list & bounds */
  const { clusters, supercluster } = useMarkerList(places, bounds, myMap?.getZoom(), isLoading)

  return (
    <>
      {clusters.map((cluster: TCluster) => {
        const [lng, lat] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count, data } = cluster.properties
        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)
        if (isCluster) {
          return (
            <Cluster
              setMapViewState={(coords: [number, number], zoom: number) => myMap.setView(coords, zoom)}
              key={`cluster-${cluster.id}`}
              lat={lat}
              lng={lng}
              pointCount={point_count}
              dataLength={places.length || 0}
              zoom={expansionZoom}
            >
              {point_count}
            </Cluster>
          )
        }
        return <Pin key={`place_${data?.id}`} isActive={data?.id === activePoint?.id} lat={lat} lng={lng} data={data} />
      })}
    </>
  )
}

export default MarkerGrid
