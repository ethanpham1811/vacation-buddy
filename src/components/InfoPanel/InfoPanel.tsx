'use client'
import PlaceList from './components/PlaceList'
import TopController from './components/TopController'

function InfoPanel() {
  return (
    <section className="flex flex-col h-full overflow-y-scroll p-2 w-96 bg-white gap-2">
      {/* search type switcher */}
      <header>
        <TopController />
      </header>

      {/* place list */}
      <PlaceList />
    </section>
  )
}

export default InfoPanel
