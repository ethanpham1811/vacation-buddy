import { Map, NavBar } from '@/components'

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { latitude, longitude } = searchParams

  return (
    <main className="flex h-[100dvh] flex-col">
      {/* Top Navigation */}
      <NavBar />

      {/* Map */}
      <div className="flex-1">
        <Map />
      </div>
    </main>
  )
}
