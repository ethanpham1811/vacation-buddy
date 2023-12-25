import { locateMe } from '@/services/utilities'
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

  /**
   * On receiving new lat & lng from SEARCH PARAMS:
   * - Search params is not null:   update viewState with search params lat & long
   * - Search params is null:       update viewState with current user location
   */
  useEffect(() => {
    if (lat && lng) {
      map.setView([parseFloat(lat), parseFloat(lng)], map.getZoom())
    } else {
      locateMe((lat: number, lng: number) => map.setView([lat, lng], map.getZoom()))
    }
  }, [lat])
}

export default useFlyToInitLocation
