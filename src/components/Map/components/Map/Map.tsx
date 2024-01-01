'use client'
import { TBounds } from '@/constants/types'
import { useInitLoad, usePanToPin, usePlaceList, useSwitchType, useTravelToCity, useTravelToPin } from '@/hooks'
import { setActivePin } from '@/lib/features/activePin/activePinSlice'
import { useAppDispatch } from '@/lib/hooks'
import { getBounds } from '@/services/utilities'
import { parseAsFloat, parseAsInteger, parseAsString, useQueryStates } from 'next-usequerystate'
import { useState } from 'react'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import MarkerGrid from '../MarkerGrid/MarkerGrid'

/**
 * Leaflet Map component https://react-leaflet.js.org/docs
 *
 * Note: Since rapid API free bandwidth is very limited:
 * => These operations: (zoom, pin's card clicking) will not trigger data request
 */
function Map() {
  const dispatch = useAppDispatch()
  const [params, updateParams] = useQueryStates({
    lat: parseAsFloat,
    lng: parseAsFloat,
    zoom: parseAsInteger,
    type: parseAsString
  })
  const [bounds, setBounds] = useState<TBounds>()
  const { requestData } = usePlaceList()

  /**
   * Important: Since leaflet does not help discerning "drag & zoom" inside "moveend"
   * So we have to split logic between "moveend", "dragend" & "zoom"
   */
  const myMap = useMapEvents({
    // triggered by every map movements => update bounds for clusterizing
    moveend: () => {
      setBounds(getBounds(myMap))
    },

    // fetch data on dragging
    dragend: () => {
      requestData(getBounds(myMap), params.type)
    },

    // update zoom search params
    zoom: () => {
      updateParams({ zoom: myMap.getZoom() })
    },

    // clear active state of point on clicking map
    click: () => {
      dispatch(setActivePin(null))
    }
  })
  /* on receiving searchParams "lat" & "lng" =>  move map & fetch new data */
  useTravelToCity(myMap, requestData, params, updateParams)

  /* on receiving searchParams "lat" & "lng" =>  move map & fetch new data */
  useInitLoad(myMap, requestData, params, updateParams)

  /* on receiving searchParams "lat" & "lng" =>  move map & fetch new data */
  useTravelToPin(myMap, requestData, updateParams)

  /* on clicking pin's card => move map to active point location */
  usePanToPin(myMap)

  /* on receiving "type" search params => fetch new data  */
  useSwitchType(myMap, requestData, updateParams)

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
