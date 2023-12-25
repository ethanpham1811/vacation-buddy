import { useAppSelector } from '@/lib/hooks'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * Fly to active point
 */

function useFlyToActivePoint(map: Map) {
  const activePoint = useAppSelector((state) => state.activePoint.data)

  useEffect(() => {
    activePoint && map.setView([activePoint.lat, activePoint.lng], map.getZoom())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePoint])
}

export default useFlyToActivePoint
