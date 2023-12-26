'use client'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { TCoords, TPlaceInfo } from '@/constants/types'
import { DivIcon } from 'leaflet'
import Image from 'next/image'
import { Marker } from 'react-leaflet/Marker'
import LinesEllipsis from 'react-lines-ellipsis'

import { Modal } from '@/components'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import ReactDom from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development'
import { useState } from 'react'
import PlaceDetail from '../PlaceDetail/PlaceDetail'

type TPinProps = TCoords & {
  isActive: boolean
  data: TPlaceInfo
}

/**
 * Show detail of a marker:
 * - thumbnail
 * - name
 */
const Pin = ({ data, lng, lat, isActive }: TPinProps) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { id, name, thumbnail } = data

  /* highlight clicked pin in right panel */
  function onClick() {
    dispatch(setActivePoint({ id, lat, lng }))
    setIsModalOpen(true)
  }

  const MarkerCard = () => (
    <div
      onClick={onClick}
      className={`${
        isActive ? 'bg-blue-500 text-white' : 'bg-white'
      } relative top-[-100%] left-[-50%] group flex flex-col p-2 shadow-card gap-2 w-20 cursor-pointer hover:bg-blue-500 hover:text-white`}
    >
      <div className="relative h-16">
        <Image
          fill
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL={BLURRED_DATA_URL}
          alt={`thumbnail of ${name}`}
          src={thumbnail || '/'}
        />
      </div>
      <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" className="text-xs" />
    </div>
  )

  // Convert the React component to a string
  const customMarker = new DivIcon({
    html: ReactDom.renderToString(<MarkerCard />),
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
        <Modal open={isModalOpen} hasPadding={false}>
          <PlaceDetail place={data} />
        </Modal>
      )}
    </>
  )
}

export default Pin
