import { API_TYPES, DEFAULT_ZOOM } from '@/constants/enum'
import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * on initial load, if no search params provided:
 * - move map to current user's location
 * - update lat and lng (user's location), type (attraction by default)
 */
function useInitLoad(map: Map) {
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')
  const [type, setType] = useQueryState('type')

  useEffect(() => {
    !lat && !lng && map && map.locate({ setView: true, maxZoom: DEFAULT_ZOOM })
    !type && setType(API_TYPES.attractions)
  }, [map, lat, lng])
}

export default useInitLoad
