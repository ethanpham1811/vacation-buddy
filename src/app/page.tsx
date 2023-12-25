'use client'
import dynamic from 'next/dynamic'

/* dynamically load all the client side components */
const NavBar = dynamic(() => import('@/components/NavBar/NavBar'), { ssr: false })
const InfoPanel = dynamic(() => import('@/components/InfoPanel/InfoPanel'), { ssr: false })
const MapContainer = dynamic(() => import('@/components/Map/MapContainer'), { ssr: false })

export default function Home() {
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
