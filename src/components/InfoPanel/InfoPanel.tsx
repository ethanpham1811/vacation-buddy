'use client'
import { useAppSelector } from '@/lib/hooks'
import PlaceListWrapper from './components/PlaceList/PlaceListWrapper'
import TopController from './components/TopController/TopController'

function InfoPanel() {
  const placeList = useAppSelector((state) => state.placeList.points)
  const isLoading = useAppSelector((state) => state.placeList.clusterizing)
  const error = useAppSelector((state) => state.placeList.error)
  return (
    <section className="flex flex-row lg:flex-col h-auto lg:h-full p-2 w-auto lg:w-96 gap-2 bg-gray-700 items-center lg:items-stretch">
      {/* search type switcher */}
      <header>
        <TopController />
      </header>

      {/* place list */}
      <PlaceListWrapper data={placeList} isLoading={isLoading} error={error} />
    </section>
  )
}

export default InfoPanel
