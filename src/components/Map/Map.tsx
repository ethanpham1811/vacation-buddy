'use client'
import { TBounds } from '@/constants/types'
import { useFlyToLocation, usePlaceList } from '@/hooks'
import useFlyToActivePoint from '@/hooks/useFlyToActivePoint'
import { useAppDispatch } from '@/lib/hooks'
import { useState } from 'react'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import { LocateMe } from '..'
import MarkerGrid from './MarkerGrid'

/**
 * Leaflet Map component https://react-leaflet.js.org/docs
 * - uncontrolled viewState
 * - move map center on init with searchParams "lat" & "lng" (ref.current.flyTo)
 */
function Map() {
  const [bounds, setBounds] = useState<TBounds>()
  const dispatch = useAppDispatch()

  const myMap = useMapEvents({
    moveend: () => {
      const ne = myMap.getBounds().getNorthEast()
      const sw = myMap.getBounds().getSouthWest()
      setBounds([sw.lng, sw.lat, ne.lng, ne.lat])
    }
  })

  /* fly to init location with searchParams "lat" & "lng"  */
  useFlyToLocation(myMap)

  /* fly to active point on hovering place (right panel)  */
  useFlyToActivePoint(myMap)

  /* fetch place list with updated bounds */
  usePlaceList(bounds)

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerGrid bounds={bounds} myMap={myMap} />
      <LocateMe />
    </>
  )
}

export default Map
