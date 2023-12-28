import { API_TYPES } from '@/constants/enum'
import { TBounds } from '@/constants/types'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'

/**
 * on receiving new input type search params:
 * - request new data base on the type
 */

function useSwitchType(map: Map, requestData: (bounds: TBounds, type: string) => void) {
  const [type] = useQueryState('type')

  useEffect(() => {
    type && map && requestData(getBounds(map), type || API_TYPES.attractions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])
}

export default useSwitchType
