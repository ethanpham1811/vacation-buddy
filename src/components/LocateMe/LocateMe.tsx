'use client'
import { MapPinIcon } from '@/constants/icons'
import { useQueryState } from 'next-usequerystate'

/**
 * on click:
 * - clear search params
 * - move map to user's current location
 */
function LocateMe() {
  const [_paramLat, setParamLat] = useQueryState('lat')
  const [_paramLng, setParamLng] = useQueryState('lng')

  function onClick() {
    setParamLat(null)
    setParamLng(null)
  }
  return (
    <div className="z-10 group absolute bottom-10 right-10 bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-blue-600" onClick={onClick}>
      <MapPinIcon className="h-5 w-5 text-white group-hover:text-black" />
    </div>
  )
}

export default LocateMe
