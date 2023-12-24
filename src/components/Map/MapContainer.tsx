'use client'
import { Map } from '@/components'
import { DEFAULT_ZOOM } from '@/constants/enum'
import 'leaflet/dist/leaflet.css'
import { MapContainer as LeafletProvider } from 'react-leaflet/MapContainer'

function MapContainer() {
  return (
    <div className="h-full flex flex-1 justify-center items-center">
      <LeafletProvider center={[10.837694, 106.8318812]} zoom={DEFAULT_ZOOM} style={{ width: '100%', height: '100%' }}>
        <Map />
      </LeafletProvider>
    </div>
  )
}

export default MapContainer
