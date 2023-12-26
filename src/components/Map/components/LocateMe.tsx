'use client'
import { MapPinIcon } from '@/constants/icons'
import { LocationEvent } from 'leaflet'
import { useMap } from 'react-leaflet'

/**
 * on click:
 * - move map to user's current location
 */

export default function LocateMe() {
  const map = useMap()

  function onClick() {
    map.locate().on('locationfound', function (e: LocationEvent) {
      map.setView(e.latlng, map.getZoom())
    })
  }

  return (
    <div className="leaflet-bottom leaflet-right" onClick={onClick}>
      <div className="leaflet-control leaflet-bar">
        <div className="z-10 group absolute bottom-10 right-10 bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-blue-600" onClick={onClick}>
          <MapPinIcon className="h-5 w-5 text-white group-hover:text-black" />
        </div>
      </div>
    </div>
  )
}
