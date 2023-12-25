import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * Fly to:
 * - current user's location on initial load
 * - lat & ln (search params)
 */

function useFlyToLocation(map: Map) {
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')

  /* update viewState with current user location */
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      map.setView(e.latlng, map.getZoom())
    })
    return () => {
      map.stopLocate()
    }
  }, [map])

  /**
   * On receiving new lat & lng from SEARCH PARAMS:
   * update viewState with search params lat & long
   * (only need one of the two lat or lng)
   */
  useEffect(() => {
    lat && lng && map.setView([parseFloat(lat), parseFloat(lng)], map.getZoom())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, map])
}

export default useFlyToLocation
