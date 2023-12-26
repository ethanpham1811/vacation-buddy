'use client'
import { TCoords } from '@/constants/types'
import { GiPositionMarker } from 'react-icons/gi'
import { Marker as LeafletMarker } from 'react-leaflet/Marker'

/**
 * Marker
 */
const Marker = ({ lng, lat }: TCoords) => {
  return (
    <LeafletMarker
      position={[lat, lng]}
      // eventHandlers={{
      //   click: () => {
      //     console.log('marker clicked')
      //   }
      // }}
    >
      <GiPositionMarker size="40" className="text-blue-600" />
    </LeafletMarker>
  )
}

export default Marker
