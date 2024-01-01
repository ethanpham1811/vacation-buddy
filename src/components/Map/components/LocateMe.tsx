'use client'
import { MapPinIcon } from '@/constants/icons'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { memo } from 'react'

/**
 * on click: move map to user's current location
 */

const LocateMe = () => {
  function onClick() {
    // trigger TRAVEL_TO_USER_LOCATION
    eventEmitter.dispatch(Events.TRAVEL_TO_USER_LOCATION)
  }

  return (
    <div onClick={onClick} className="abc group z-10 cursor-pointer rounded-full bg-gray-800 p-2 hover:bg-blue-600">
      <MapPinIcon className="h-5 w-5 text-white group-hover:text-black" />
    </div>
  )
}
export default memo(LocateMe)
