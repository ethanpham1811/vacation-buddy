import { TActivePoint } from '@/constants/types'
import { useAppSelector } from '@/lib/hooks'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * move viewport to active point on clicking pin's card
 */

function usePanToActivePoint(map: Map) {
  const activePoint: TActivePoint | null = useAppSelector((state) => state.activePoint.data)

  useEffect(() => {
    map && activePoint && map.setView([activePoint.lat, activePoint.lng], activePoint.zoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePoint])
}

export default usePanToActivePoint
