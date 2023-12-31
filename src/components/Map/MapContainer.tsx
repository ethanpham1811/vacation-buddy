'use client'
import { DEFAULT_ZOOM, MIN_ZOOM } from '@/constants/enum'
import 'leaflet/dist/leaflet.css'
import { MapContainer as LeafletProvider } from 'react-leaflet/MapContainer'
import Map from './components/Map/Map'

function MapContainer() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <LeafletProvider center={[12.91285, 100.87808]} minZoom={MIN_ZOOM} zoom={DEFAULT_ZOOM} style={{ width: '100%', height: '100%' }}>
        <Map />
      </LeafletProvider>
    </div>
  )
}

export default MapContainer
