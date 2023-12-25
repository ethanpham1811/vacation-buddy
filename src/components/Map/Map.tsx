'use client'
import { TBounds, TCluster } from '@/constants/types'
import { useFlyToInitLocation, useMarkerList, usePlaceList } from '@/hooks'
import { useAppSelector } from '@/lib/hooks'
import { useState } from 'react'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import { Cluster, LocateMe, Pin } from '..'

/**
 * Leaflet Map component https://react-leaflet.js.org/docs
 * - uncontrolled viewState
 * - move map center on init with searchParams "lat" & "lng" (ref.current.flyTo)
 */
function Map() {
  const [bounds, setBounds] = useState<TBounds>()
  const places = useAppSelector((state) => state.placeList.data)
  const isLoading = useAppSelector((state) => state.placeList.loading)

  const myMap = useMapEvents({
    moveend: () => {
      const ne = myMap.getBounds().getNorthEast()
      const sw = myMap.getBounds().getSouthWest()
      setBounds([sw.lng, sw.lat, ne.lng, ne.lat])
    }
  })

  /* fly to init location with searchParams "lat" & "lng"  */
  useFlyToInitLocation(myMap)

  /* fetch place list with updated bounds */
  usePlaceList(bounds)

  /* build cluster with data list & bounds */
  const { clusters, supercluster } = useMarkerList(places, bounds, myMap?.getZoom(), isLoading)

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clusters.map((cluster: TCluster) => {
        const [lng, lat] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count, id, name, thumbnail } = cluster.properties
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
        return <Pin key={`place_${id}`} lat={lat} lng={lng} name={name} thumbnail={thumbnail} />
      })}
      <LocateMe />
    </>
  )
}

export default Map
