'use client'
import { DEFAULT_ZOOM } from '@/constants/enum'
import { MapPinIcon } from '@/constants/icons'
import { useMap } from 'react-leaflet'

/**
 * on click: move map to user's current location
 */

export default function LocateMe() {
  const map = useMap()

  function onClick() {
    map.locate({ setView: true, maxZoom: map.getZoom() || DEFAULT_ZOOM })
  }

  return (
    <div onClick={onClick} className="z-10 group bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-blue-600">
      <MapPinIcon className="h-5 w-5 text-white group-hover:text-black" />
    </div>
  )
}
