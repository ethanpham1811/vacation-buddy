import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * Fly to:
 * - current user's location on initial load
 * - lat & ln (search params)
 */

function useFlyToLocation(map: Map) {
  /* update viewState with current user location */
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      map.setView(e.latlng, map.getZoom())
    })
    return () => {
      map.stopLocate()
    }
  }, [map])
}

export default useFlyToLocation
