'use client'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { TCoords } from '@/constants/types'
import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'
import { Marker } from 'react-map-gl'

type TPinProps = TCoords & {
  name: string
  thumbnail: string
}

/**
 * Show detail of a marker:
 * - thumbnail
 * - name
 */
const Pin = ({ longitude, latitude, name, thumbnail }: TPinProps) => {
  function onClick() {
    // show detail
  }

  return (
    <Marker longitude={longitude} latitude={latitude} onClick={onClick}>
      <div className="group flex flex-col p-2 shadow-card bg-white gap-2 w-24 cursor-pointer hover:bg-cyan-400">
        <div className="relative h-20">
          <Image
            layout="fill"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={BLURRED_DATA_URL}
            alt={`thumbnail of ${name}`}
            src={thumbnail}
          />
        </div>
        <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" className="text-xs" />
      </div>
    </Marker>
  )
}

export default Pin
