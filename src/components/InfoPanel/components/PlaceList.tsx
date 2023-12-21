'use client'
import { Skeleton } from '@/components'
import { TPlace, TPlaceListEventResponse } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useEffect, useState } from 'react'
import PlaceItem from './PlaceItem'

/**
 * Subscribe to LOAD_NEW_PLACES events
 */
function PlaceList() {
  const [placeList, setPlaceList] = useState<TPlace[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    eventEmitter.subscribe(Events.LOAD_NEW_PLACES, (payload: unknown) => {
      setIsLoading(false)
      const { data, error } = payload as TPlaceListEventResponse

      error && setError(error)
      data && setPlaceList(data)
    })
  }, [])

  if (isLoading)
    return (
      <ul className="flex flex-col gap-4 flex-1">
        {[0, 1].map((el, i) => (
          <Skeleton key={`skeleton_${i}`} />
        ))}
      </ul>
    )

  if (error) return <p className="text-red-600 text-center text-sm py-2">{error}</p>

  return (
    <ul className="flex flex-col gap-4 flex-1">
      {placeList &&
        placeList.map((place) => {
          return <PlaceItem key={place.location_id} place={place} />
        })}
    </ul>
  )
}

export default PlaceList
