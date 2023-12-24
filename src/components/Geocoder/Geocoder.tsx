'use client'
import { AutoComplete } from '@/components'
import { TAutoCompleteData, TPlace } from '@/constants/types'
import { useQueryState } from 'next-usequerystate'
import { useState } from 'react'
import SelectOption from './components/SelectOption'

/**
 * Google places Autocomplete with MapBox api
 * - fetch places data on user typing
 * - update query params "lat" & "lng" on selection
 */
function Geocoder() {
  const [_paramLat, setParamLat] = useQueryState('lat')
  const [_paramLng, setParamLng] = useQueryState('lng')
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

  /* update search params "latitude" & "longitude" */
  function onSelect(place: TPlace) {
    setParamLat(place.lat.toString())
    setParamLng(place.lng.toString())
  }

  return (
    <AutoComplete<TPlace> name="city" onSubmit={onSubmit} onSelect={onSelect} width="30dvw" isLoading={isLoading}>
      {cityList.length === 0 || error ? (
        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">{error ?? 'Nothing found.'}</div>
      ) : (
        cityList.map((place: TAutoCompleteData) => <SelectOption key={place.name} place={place} />)
      )}
    </AutoComplete>
  )
}

export default Geocoder
