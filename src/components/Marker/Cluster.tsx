'use client'
import { TCluster, TSuperCluster, TViewport } from '@/constants/types'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { FlyToInterpolator, Marker } from 'react-map-gl'

type TRdMarkerProps = {
  children: ReactNode
  longitude: number
  latitude: number
  pointCount: number
  pointLength: number
  viewport: TViewport
  cluster: TCluster
  supercluster: TSuperCluster
  setViewport: Dispatch<SetStateAction<TViewport>>
}

/**
 * Cluster Marker
 * - only show number of children marker inside
 * - zoom in to show children marker on cluster clicking
 */
const Cluster = ({ longitude, latitude, pointCount, pointLength, setViewport, viewport, supercluster, cluster, children }: TRdMarkerProps) => {
  const width = `${30 + (pointCount / pointLength) * 20}px`
  const height = `${30 + (pointCount / pointLength) * 20}px`

  function onClick() {
    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: expansionZoom,
      transitionInterpolator: new FlyToInterpolator({
        speed: 2
      }),
      transitionDuration: 'auto'
    })
  }
  return (
    <Marker longitude={longitude} latitude={latitude} onClick={onClick}>
      <div className="text-white bg-gray-600 rounded-full p-5 flex justify-center items-center" style={{ width, height }}>
        {children}
      </div>
    </Marker>
  )
}

export default Cluster
