import { DEFAULT_ZOOM } from '@/constants/enum'
import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * on initial load: move map to current user's location if no lat & lng search params
 */
function useInitLoad(map: Map) {
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')

  useEffect(() => {
    !lat && !lng && map && map.locate({ setView: true, maxZoom: DEFAULT_ZOOM })
  }, [map, lat, lng])
}

export default useInitLoad
