'use client'
import { Cluster, LocateMe, Marker } from '@/components'
import { MAPBOX_MAP_GL_STYLE } from '@/constants/enum'
import { TCluster } from '@/constants/types'
import { useMarkerList, usePlaceList, useViewport } from '@/hooks'
import { useRef } from 'react'
import MapGL, { MapRef, ViewState } from 'react-map-gl'

/**
 * MapBox Map GL component https://docs.mapbox.com/mapbox-gl-js
 * - uncontrolled viewport
 * - move map center on init with searchParams "latitude" & "longitude" (ref.current.flyTo)
 */
function Map() {
  /* get bounds data [xx,xx,xx,xx] (top left and bottom right coords) */
  const mapRef = useRef<MapRef>(null)
  const bounds: number[] = mapRef?.current ? mapRef?.current?.getMap().getBounds().toArray().flat() : null

  /* viewport (lat, lng, zoom) */
  const { viewport, setViewport } = useViewport(mapRef)

  /* fetch place list with updated bounds */
  const { places, isLoading, error } = usePlaceList(bounds)

  /* transform place list into cluster points */
  const { points, clusters, supercluster } = useMarkerList(places, bounds, viewport.zoom)

  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <MapGL
        {...viewport}
        maxZoom={20}
        ref={mapRef}
        mapStyle={MAPBOX_MAP_GL_STYLE}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
        onViewportChange={(viewport: ViewState) => setViewport({ ...viewport })}
      >
        {clusters.map((cluster: TCluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const { cluster: isCluster, point_count: pointCount, name } = cluster.properties

          /* cluster point (show only number of children nodes) */
          if (isCluster) {
            return (
              <Cluster
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
                supercluster={supercluster}
                cluster={cluster}
                setViewport={setViewport}
                viewport={viewport}
                pointCount={pointCount}
                pointLength={points.length}
              >
                {pointCount}
              </Cluster>
            )
          }

          /* child node (place) */
          return <Marker key={name} latitude={latitude} longitude={longitude} />
        })}
      </MapGL>

      {/* floating locate current location button */}
      <LocateMe />
    </div>
  )
}

export default Map
