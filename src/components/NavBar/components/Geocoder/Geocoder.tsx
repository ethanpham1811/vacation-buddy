'use client'
import { AutoComplete } from '@/components'
import { TAutoCompleteData } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useState } from 'react'
import SelectOption from './components/SelectOption'

/**
 * Google places Autocomplete with MapBox api
 * - on typing => fetch places data on user typing
 * - on select (choose an option) => trigger TRAVEL_TO_CITY
 */
function Geocoder() {
  const [cityList, setCityList] = useState<TAutoCompleteData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /* hit /api/cities route to get city list */
  async function onSubmit(query: string, signal?: AbortSignal) {
    setIsLoading(true)

    const res = await fetch(`/api/cities/${query}`, { method: 'GET', signal })

    // on error: return & show error msg
    if (!res.ok) return setError('Failed to fetch cities list')

    // update city list
    const { data } = await res.json()
    setCityList(data)
    setIsLoading(false)
  }

  function onSelect(place: TAutoCompleteData) {
    // trigger TRAVEL_TO_CITY
    eventEmitter.dispatch(Events.TRAVEL_TO_CITY, { lat: place.lat, lng: place.lng })
  }

  return (
    <AutoComplete<TAutoCompleteData> name="city" onSubmit={onSubmit} onSelect={onSelect} setIsLoading={setIsLoading} isLoading={isLoading}>
      {cityList?.length === 0 || error ? (
        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">{error ?? 'Nothing found.'}</div>
      ) : (
        cityList.map((place: TAutoCompleteData) => <SelectOption key={place.name} place={place} />)
      )}
    </AutoComplete>
  )
}

export default Geocoder
