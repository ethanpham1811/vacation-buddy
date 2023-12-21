'use client'
import { TCoords } from '@/constants/types'
import { GiPositionMarker } from 'react-icons/gi'
import { Marker } from 'react-map-gl'

/**
 * Marker
 */
const RdMarker = ({ longitude, latitude }: TCoords) => {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <GiPositionMarker size="40" className="text-blue-600" />
    </Marker>
  )
}

export default RdMarker
