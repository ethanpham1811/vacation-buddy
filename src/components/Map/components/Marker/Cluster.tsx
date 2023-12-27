'use client'
import { DivIcon } from 'leaflet'
import { renderToString } from 'react-dom/server'
import { Marker } from 'react-leaflet'
import Circle from './components/Circle'

type TRdMarkerProps = {
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
const Cluster = ({ lng, lat, pointCount, dataLength, zoom, setMapViewState }: TRdMarkerProps) => {
  // calculate the width of the circle base on digits
  const width = `${30 + (pointCount / dataLength) * 20}px`
  const height = `${30 + (pointCount / dataLength) * 20}px`

  // build marker icon
  const customMarker = new DivIcon({
    html: renderToString(<Circle content={pointCount} width={width} height={height} />),
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
