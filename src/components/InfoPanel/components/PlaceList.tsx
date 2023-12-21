'use client'
import { Skeleton } from '@/components'
import { TPlace, TPlaceListEventResponse } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useEffect, useState } from 'react'
import Address from './Address'
import Description from './Description'
import ExternalLinks from './ExternalLinks'
import Phone from './Phone'
import Photo from './Photo'
import Rating from './Rating'

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
    <ul className="flex flex-col gap-2 flex-1">
      {placeList &&
        placeList.map(({ location_id, photo, name, address, description, website, web_url, phone, rating, num_reviews }) => (
          <div key={location_id} className="group flex flex-col bg-white">
            {/* photo */}
            <Photo photo={photo} />

            <div className="rounded-b-md bg-gray-100 p-2 flex flex-col gap-1">
              {/* title */}
              <h1 className="font-semibold text-lg">{name}</h1>

              {/* external links */}
              {(web_url || website) && <ExternalLinks web_url={web_url} website={website} />}

              {/* address */}
              {address && <Address address={address} />}

              {/* description */}
              {description && <Description description={description} />}

              {/* phone */}
              {phone && <Phone phone={phone} />}

              {/* rating count */}
              {(rating || num_reviews) && <Rating rating={rating} num_reviews={num_reviews} />}
            </div>
          </div>
        ))}
    </ul>
  )
}

export default PlaceList
