'use client'
import { TBounds } from '@/constants/types'
import { useInitLoad, usePanToActivePoint, usePlaceList, useReceivingLatLng, useSwitchType } from '@/hooks'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import { getBounds } from '@/services/utilities'
import { useQueryState } from 'next-usequerystate'
import { useState } from 'react'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import MarkerGrid from '../MarkerGrid/MarkerGrid'

/**
 * Leaflet Map component https://react-leaflet.js.org/docs
 * Since rapid API free bandwidth is very limited, I request data only when:
 * - map dragging
 * - selecting places from "city list"
 *
 * Other operations (zoom, place's card clicking) will not trigger data fetching
 */
function Map() {
  const dispatch = useAppDispatch()
  const [_paramLat, setParamLat] = useQueryState('lat')
  const [_paramLng, setParamLng] = useQueryState('lng')
  const [bounds, setBounds] = useState<TBounds>()
  const { requestData } = usePlaceList()

  /**
   * Important: Since leaflet does not help discerning "drag & zoom" inside "moveend"
   * So we split requestData trigger from "moveend" into "dragend" and "useReceivingLatLng"
   */
  const myMap = useMapEvents({
    // triggered by every map movements => update bounds for clusterizing
    moveend: () => {
      setBounds(getBounds(myMap))
    },

    // fetch data on drag to exclude zoom
    dragend: () => {
      requestData(getBounds(myMap))
    },

    // update lat lng params triggered by map.locate()
    locationfound: () => {
      setParamLat(myMap.getCenter().lat.toString())
      setParamLng(myMap.getCenter().lng.toString())
    },

    // clear active state of point on clicking map
    click: () => {
      dispatch(setActivePoint(null))
    }
  })

  /* on receiving searchParams "lat" & "lng" =>  move map & fetch new data */
  useInitLoad(myMap)

  /* on receiving searchParams "lat" & "lng" =>  move map & fetch new data */
  useReceivingLatLng(myMap, requestData)

  /* on receiving "type" search params => fetch new data  */
  useSwitchType(myMap, requestData)

  /* on clicking pin's card => move map to active point location */
  usePanToActivePoint(myMap)

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerGrid bounds={bounds} myMap={myMap} />
    </>
  )
}

export default Map
