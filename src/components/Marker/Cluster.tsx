'use client'
import { DivIcon } from 'leaflet'
import { ReactNode } from 'react'
import { Marker } from 'react-leaflet/Marker'

import ReactDom from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development'

type TRdMarkerProps = {
  children: ReactNode
  lng: number
  lat: number
  pointCount: number
  dataLength: number
  zoom: number
  setMapViewState: (coords: [number, number], zoom: number) => void
}

/**
 * Cluster Marker
 * - only show number of children marker inside
 * - zoom in to show children marker on cluster clicking
 */
const Cluster = ({ lng, lat, pointCount, dataLength, zoom, children, setMapViewState }: TRdMarkerProps) => {
  // calculate the width of the circle base on digits
  const width = `${30 + (pointCount / dataLength) * 20}px`
  const height = `${30 + (pointCount / dataLength) * 20}px`

  const Circle = () => (
    <div
      className="text-white bg-gray-600 rounded-full p-5 flex justify-center items-center cursor-pointer hover:bg-cyan-400"
      style={{ width, height }}
    >
      {children}
    </div>
  )

  // Convert the React component to a string
  const customMarker = new DivIcon({
    html: ReactDom.renderToString(<Circle />),
    iconSize: [40, 40]
  })

  return (
    <Marker
      position={[lat, lng]}
      icon={customMarker}
      eventHandlers={{
        click: () => setMapViewState([lat, lng], zoom)
      }}
    />
  )
}

export default Cluster
