'use client'
import { TCoords } from '@/constants/types'
import { GiPositionMarker } from 'react-icons/gi'
import { Marker as LeafletMarker } from 'react-leaflet/Marker'

/**
 * Atom element Marker
 */
const Marker = ({ lng, lat }: TCoords) => {
  return (
    <LeafletMarker position={[lat, lng]}>
      <GiPositionMarker size="40" className="text-blue-600" />
    </LeafletMarker>
  )
}

export default Marker
