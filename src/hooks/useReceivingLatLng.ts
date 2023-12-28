import { API_TYPES, DEFAULT_ZOOM } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * on receiving searchParams "lat" & "lng"
 * =>  move map & fetch new data
 */

function useReceivingLatLng(map: Map, requestData: (bounds: TBounds, type: string) => void) {
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')
  const [type] = useQueryState('type')

  /* on receiving lat lng search params */
  useEffect(() => {
    if (!lat || !lng || !map) return
    map.setView({ lat: parseFloat(lat), lng: parseFloat(lng) }, DEFAULT_ZOOM)

    requestData(getBounds(map), type || API_TYPES.attractions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat])
}

export default useReceivingLatLng
