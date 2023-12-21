import { InfoPanel, Map, NavBar } from '@/components'

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { latitude, longitude } = searchParams

  return (
    <main className="flex h-[100dvh] flex-col">
      {/* Top Navigation */}
      <NavBar />

      <div className="flex flex-1 items-stretch overflow-y-scroll">
        {/* Right Panel */}
        <InfoPanel />

        {/* Map */}
        <Map />
      </div>
    </main>
  )
}
