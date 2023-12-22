'use client'
import { Cluster, LocateMe, Pin } from '@/components'
import { MAPBOX_MAP_GL_STYLE, MAX_ZOOM, MIN_ZOOM } from '@/constants/enum'
import { TCluster } from '@/constants/types'
import { useMarkerList, usePlaceList, useViewport } from '@/hooks'
import { useDeferredValue, useRef } from 'react'
import MapGL, { MapRef, ViewState } from 'react-map-gl'

/**
 * MapBox Map GL component https://docs.mapbox.com/mapbox-gl-js
 * - uncontrolled viewport
 * - move map center on init with searchParams "latitude" & "longitude" (ref.current.flyTo)
 */
function Map() {
  /* get bounds data [xx,xx,xx,xx] (top left and bottom right coords) */
  const mapRef = useRef<MapRef>(null)
  const rawBounds: number[] = mapRef?.current ? mapRef?.current?.getMap().getBounds().toArray().flat() : null
  const bounds = useDeferredValue(rawBounds)

  /* viewport (lat, lng, zoom) */
  const { viewport, setViewport } = useViewport(mapRef)

  /* fetch place list with updated bounds */
  const { places, isLoading, error } = usePlaceList(bounds)

  /* transform place list into cluster points */
  const { points, clusters, supercluster } = useMarkerList(places, bounds, viewport.zoom)

  return (
    <div className="h-full flex flex-1 justify-center items-center relative">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
        ref={mapRef}
        mapStyle={MAPBOX_MAP_GL_STYLE}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
        onViewportChange={(viewport: ViewState) => setViewport({ ...viewport })}
      >
        {clusters.map((cluster: TCluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const { cluster: isCluster, point_count: pointCount, name, thumbnail } = cluster.properties

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
          return <Pin key={name} latitude={latitude} longitude={longitude} name={name} thumbnail={thumbnail} />
        })}
      </MapGL>

      {/* floating locate current location button */}
      <LocateMe />
    </div>
  )
}

export default Map
