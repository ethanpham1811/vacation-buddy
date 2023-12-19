'use client'
import { GiPositionMarker } from 'react-icons/gi'
import { Marker } from 'react-map-gl'

type TRdMarkerProps = {
  longitude: number
  latitude: number
}

const RdMarker = ({ longitude, latitude }: TRdMarkerProps) => {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <GiPositionMarker size="40" className="text-blue-600 animate-bounce" />
    </Marker>
  )
}

export default RdMarker
