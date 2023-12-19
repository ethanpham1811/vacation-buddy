'use client'
import { TCoors, TPlace } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { useQueryState } from 'next-usequerystate'
import Autocomplete from 'react-google-autocomplete'

function Geocoder() {
  const [paramLat, setParamLat] = useQueryState('lat')
  const [paramLng, setParamLng] = useQueryState('lng')

  function onPlaceSelected(place: unknown) {
    const lat = (place as TPlace)?.geometry?.location?.lat()!
    const lng = (place as TPlace)?.geometry?.location?.lng()!
    const location: TCoors = {
      latitude: lat,
      longitude: lng
    }

    // dispatch SELECT_LOCATION action
    if (location && location.latitude && location.longitude) {
      eventEmitter.dispatch(Events.SELECT_LOCATION, location)
    }

    // update URL search params
    setParamLat(lat)
    setParamLng(lng)
  }

  return <Autocomplete apiKey={process.env.NEXT_PUBLIC_GG_MAP_API_KEY} onPlaceSelected={onPlaceSelected} />
}

export default Geocoder
