import { InfoPanel, NavBar } from '@/components'
import dynamic from 'next/dynamic'

/* dynamically load Map since leaflet doesn't wait for the page to load before instantiating itself */
const MapContainer = dynamic(() => import('@/components/Map/MapContainer'), { ssr: false })

export default async function Home() {
  return (
    <main className="flex h-[100dvh] flex-col">
      {/* Top Navigation */}
      <NavBar />

      <div className="flex flex-1 items-stretch overflow-y-scroll">
        {/* Right Panel */}
        <InfoPanel />

        {/* Map */}
        <MapContainer />
      </div>
    </main>
  )
}
