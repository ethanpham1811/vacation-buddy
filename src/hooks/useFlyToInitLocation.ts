import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * Transform list items to marker (TMarker) for cluster
 * @param  {NextPageContext} ctx
 */

function useFlyToInitLocation(map: Map) {
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
  }, [])

  /**
   * On receiving new lat & lng from SEARCH PARAMS:
   * update viewState with search params lat & long
   */
  useEffect(() => {
    lat && lng && map.setView([parseFloat(lat), parseFloat(lng)], map.getZoom())
  }, [lat])
}

export default useFlyToInitLocation
