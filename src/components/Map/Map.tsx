'use client'
import { Marker } from '@/components'
import { DEFAULT_ZOOM } from '@/constants/enum'
import { TCoors, TPlace } from '@/constants/types'
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
  const [latitude, setLatitude] = useQueryState('latitude')
  const [longitude, setLongitude] = useQueryState('longitude')
  const [places, setPlaces] = useState<TPlace[]>([])
  const [viewport, setViewport] = useState<TCoors | null>(null)

  /**
   * if searchParams "latitude" & "longitude" are set => move map with flyTo
   * if no searchParams => use user's current location
   */
  useEffect(() => {
    if (latitude && longitude) {
      mapRef.current?.flyTo({
        center: [parseFloat(longitude), parseFloat(latitude)],
        zoom: DEFAULT_ZOOM,
        speed: 2
      })
    } else {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setViewport({ latitude, longitude })
      })
    }
  }, [latitude, longitude])

  return (
    <div className="h-[100dvh] w-full flex justify-center items-center">
      {!viewport ? (
        <div>loading...</div>
      ) : (
        <MapGL
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
          initialViewState={{ ...viewport, zoom: DEFAULT_ZOOM }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker latitude={viewport.latitude} longitude={viewport.longitude} />
        </MapGL>
      )}
    </div>
  )
}

export default RdMap
