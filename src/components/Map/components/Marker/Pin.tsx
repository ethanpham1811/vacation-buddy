'use client'
import { TCoords, TPlace } from '@/constants/types'
import { DivIcon } from 'leaflet'
import { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { Marker } from 'react-leaflet'

import { Modal } from '@/components'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import PlaceDetail from '../PlaceDetail/PlaceDetail'
import MarkerCard from './components/MarkerCard'

type TPinProps = TCoords & {
  isActive: boolean
  data: TPlace
  isFavorite: boolean
}

/**
 * Show detail of a marker:
 * - thumbnail
 * - name
 */
const Pin = ({ isFavorite, data, lng, lat, isActive }: TPinProps) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id, name, thumbnail } = data

  /* highlight clicked pin in right panel */
  function onClick() {
    dispatch(setActivePoint({ id, lat, lng }))
    setIsModalOpen(true)
  }

  // build marker icon
  const customMarker = new DivIcon({
    html: renderToString(<MarkerCard isFavorite={isFavorite} onClick={onClick} isActive={isActive} name={name} thumbnail={thumbnail} />),
    iconSize: [40, 40],
    iconAnchor: [18, 30]
  })

  return (
    <>
      <Marker
        position={[lat, lng]}
        icon={customMarker}
        eventHandlers={{
          click: onClick
        }}
      />

      {/* place's detail modal */}
      {isActive && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} hasPadding={false}>
          <PlaceDetail place={data} />
        </Modal>
      )}
    </>
  )
}

export default Pin
