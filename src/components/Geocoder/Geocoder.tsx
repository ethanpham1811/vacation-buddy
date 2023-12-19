'use client'
import { DropdownMenu } from '@/components'
import { ArrowRightIcon } from '@/constants/icons'
import { TPlace } from '@/constants/types'
import { Combobox } from '@headlessui/react'
import { useQueryState } from 'next-usequerystate'
import { useState } from 'react'

/**
 * Google places Autocomplete with MapBox api
 * - fetch places data on user typing
 * - update query params "latitude" & "longitude" on selection
 */
function Geocoder() {
  const [_paramLat, setParamLat] = useQueryState('latitude')
  const [_paramLng, setParamLng] = useQueryState('longitude')
  const [placeList, setPlaceList] = useState([])

  /* fetch places data */
  async function searchPlaces(search: string) {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    if (!res.ok) {
      throw new Error('Failed to fetch places')
    }
    const result = await res.json()

    /* data mapping */
    const placeList = result?.features?.map(
      ({ id, place_name, geometry }: { id: string; place_name: string; geometry: { coordinates: [number, number] } }): TPlace => ({
        id,
        name: place_name,
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0]
      })
    )

    setPlaceList(placeList)
  }

  /* update search params "latitude" & "longitude" */
  function onSelect(place: TPlace) {
    setParamLat(place.latitude.toString())
    setParamLng(place.longitude.toString())
  }

  return (
    <DropdownMenu<TPlace> onSubmit={searchPlaces} onSelect={onSelect} width="30dvw">
      {placeList.length === 0 ? (
        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>
      ) : (
        placeList.map((place: TPlace) => (
          <Combobox.Option
            key={place.id}
            className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
            value={place}
          >
            {({ selected, active }) => (
              <>
                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{place.name}</span>
                {selected ? (
                  <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'}`}>
                    <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </DropdownMenu>
  )
}

export default Geocoder
