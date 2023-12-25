'use client'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { TCoords } from '@/constants/types'
import { DivIcon } from 'leaflet'
import Image from 'next/image'
import { Marker } from 'react-leaflet/Marker'
import LinesEllipsis from 'react-lines-ellipsis'

import ReactDom from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development'

type TPinProps = TCoords & {
  name: string
  isActive: boolean
  thumbnail: string | undefined
}

/**
 * Show detail of a marker:
 * - thumbnail
 * - name
 */
const Pin = ({ lng, lat, name, thumbnail, isActive }: TPinProps) => {
  function onClick() {
    // show detail
  }

  const MarkerCard = () => (
    <div
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
    <Marker
      position={[lat, lng]}
      icon={customMarker}
      eventHandlers={{
        click: onClick
      }}
    />
  )
}

export default Pin
