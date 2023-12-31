import { API_TYPES, DEFAULT_ZOOM, MIN_ZOOM } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * on receiving searchParams, move map & fetch new data
 *
 * important note: the data around the location need to be fetched entirely (up to min zoom)
 * This will prevent the bug where user navigate to the location from favorite panel without
 * full data of the area (this cause cluster to not working properly). So we break it into 3 steps:
 *
 * 1. set the map view by lat lng params with the MIN ZOOM
 *
 * this way we receive possible biggest bounds of the location (restricted by min zoom)
 *
 * 2. request data by this bounds => to get all places within this area
 * 3. zoom in by the zoom param
 */

function useReceivingParams(map: Map, requestData: (bounds: TBounds, type: string) => void) {
  const [lat] = useQueryState('lat')
  const [lng] = useQueryState('lng')
  const [zoom] = useQueryState('zoom')
  const [type] = useQueryState('type')

  /* on receiving lat lng search params */
  useEffect(() => {
    if (!lat || !lng || !map) return

    //set the view with MIN ZOOM
    map.setView({ lat: parseFloat(lat), lng: parseFloat(lng) }, MIN_ZOOM)

    // request data by this bounds => to get all places within this area
    requestData(getBounds(map), type || API_TYPES.attractions)

    // set the view by the zoom params
    map.setZoom(zoom ? parseInt(zoom) : DEFAULT_ZOOM)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat])
}

export default useReceivingParams
