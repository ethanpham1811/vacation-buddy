'use client'
import { TBounds } from '@/constants/types'
import { useFlyToLocation, usePlaceList } from '@/hooks'
import useFlyToActivePoint from '@/hooks/useFlyToActivePoint'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import { Map as LeafLetMap } from 'leaflet'
import { useState } from 'react'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import LocateMe from '../LocateMe'
import MarkerGrid from '../MarkerGrid/MarkerGrid'

/**
 * Leaflet Map component https://react-leaflet.js.org/docs
 * - uncontrolled viewState
 * - move map center on init with searchParams "lat" & "lng" (ref.current.flyTo)
 */
function Map() {
  const dispatch = useAppDispatch()
  const [bounds, setBounds] = useState<TBounds>()
  const { requestData } = usePlaceList()

  const myMap = useMapEvents({
    // retrieve new bounds on move to build clusters
    moveend: () => {
      setBounds(getBounds(myMap))
    },

    // only fetch data on init load & drag (exclude zoom)
    // => reduce request counts which consumes free account quotas
    dragend: () => {
      requestData(getBounds(myMap))
    },
    locationfound: () => {
      requestData(getBounds(myMap))
    },

    // clear active state of point on clicking map
    click: () => {
      dispatch(setActivePoint(null))
    }
  })

  /* fly to init location with searchParams "lat" & "lng"  */
  useFlyToLocation(myMap)

  /* fly to active point on hovering place (right panel)  */
  useFlyToActivePoint(myMap)

  function getBounds(myMap: LeafLetMap): TBounds {
    const ne = myMap.getBounds().getNorthEast()
    const sw = myMap.getBounds().getSouthWest()
    return [sw.lng, sw.lat, ne.lng, ne.lat]
  }

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
