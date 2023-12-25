'use client'
import { TPlace } from '@/constants/types'
import { placeListSignal } from '@/signals/placeListSignal'
import { useSignalEffect } from '@preact/signals-react'
import { useState } from 'react'
import PlaceList from './components/PlaceList'
import TopController from './components/TopController'

function InfoPanel() {
  const [placeList, setPlaceList] = useState<TPlace[]>()

  /* FIXME: remove this workaround (unknown bug of signal not updating itself) */
  useSignalEffect(() => {
    setPlaceList(placeListSignal.value)
  })

  return (
    <section className="flex flex-col h-full  p-2 w-96  gap-2  bg-gray-700">
      {/* search type switcher */}
      <header>
        <TopController />
      </header>

      {/* place list */}
      <PlaceList data={placeList} />
    </section>
  )
}

export default InfoPanel
