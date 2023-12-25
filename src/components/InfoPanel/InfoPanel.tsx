'use client'
import { useAppSelector } from '@/lib/hooks'
import PlaceList from './components/PlaceList/PlaceList'
import TopController from './components/TopController/TopController'

function InfoPanel() {
  const placeList = useAppSelector((state) => state.placeList.points)
  const isLoading = useAppSelector((state) => state.placeList.clusterizing)
  const error = useAppSelector((state) => state.placeList.error)
  return (
    <section className="flex flex-col h-full  p-2 w-96  gap-2  bg-gray-700">
      {/* search type switcher */}
      <header>
        <TopController />
      </header>

      {/* place list */}
      <PlaceList data={placeList} isLoading={isLoading} error={error} />
    </section>
  )
}

export default InfoPanel
