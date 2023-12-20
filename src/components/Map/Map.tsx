'use client'
import { LocateMe } from '@/components'
import { DEFAULT_ZOOM } from '@/constants/enum'
import { TPlace } from '@/constants/types'
import { locateMe } from '@/services/utilities'
import { useQueryState } from 'next-usequerystate'
import { useEffect, useRef, useState } from 'react'
import MapGL, { MapRef } from 'react-map-gl'

/**
 * MapBox Map GL component https://docs.mapbox.com/mapbox-gl-js
 * - uncontrolled viewport
 * - move map center on init with searchParams "latitude" & "longitude" (ref.current.flyTo)
 */
function RdMap() {
  const mapRef = useRef<MapRef | null>(null)
  const [latitude] = useQueryState('latitude')
  const [longitude] = useQueryState('longitude')
  const [places, setPlaces] = useState<TPlace[]>([])
  const [mapLoad, setMapLoad] = useState(false)

  /**
   * if searchParams "latitude" & "longitude" are set => move map with flyTo
   * if no searchParams => use user's current location
   */
  useEffect(() => {
    if (!mapRef.current) return

    if (latitude && longitude) {
      flyTo(parseFloat(longitude), parseFloat(latitude))
    } else {
      locateMe(flyTo)
    }
  }, [latitude, longitude, mapLoad])

  /* move map's viewport to designated coords */
  function flyTo(lng: number, lat: number) {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: DEFAULT_ZOOM,
      speed: 2
    })
  }

  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <MapGL
        onLoad={() => setMapLoad(true)}
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {/* <Marker latitude={viewport.latitude} longitude={viewport.longitude} /> */}
      </MapGL>

      {/* floating locate current location button */}
      <LocateMe />
    </div>
  )
}

export default RdMap
