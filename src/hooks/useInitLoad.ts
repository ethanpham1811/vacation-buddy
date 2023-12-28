import { DEFAULT_ZOOM } from '@/constants/enum'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * on initial load: move map to current user's location
 */
function useInitLoad(map: Map) {
  useEffect(() => {
    map && map.locate({ setView: true, maxZoom: DEFAULT_ZOOM })
  }, [map])
}

export default useInitLoad
