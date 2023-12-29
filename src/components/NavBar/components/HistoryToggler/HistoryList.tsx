import { XMarkIcon } from '@/constants/icons'
import { TFavorite } from '@/constants/types'
import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'

type THistoryListProps = {
  data: TFavorite[]
  removeFavorite: (id: string) => void
  locatePlace: ({ id, lat, lng }: { id: string; lat: number; lng: number }) => void
}

function HistoryList({ data, removeFavorite, locatePlace }: THistoryListProps) {
  return (
    <div className="grid gap-5 grid-cols-2">
      {data.map(({ id, name, photo, lat, lng }) => (
        <div
          key={`favorite_${id}`}
          className="text-xs p-1 shadow-card flex items-center overflow-hidden cursor-pointer bg-white rounded-md min-h-[50px] hover:bg-gray-800 hover:text-white"
          onClick={() => locatePlace({ id, lat, lng })}
        >
          {/* photo */}
          <div className="px-2">
            <Image src={photo} width={30} height={30} alt={`favorite_photo_${id}`} />
          </div>

          {/* place name */}
          <div className="p-1 flex-1">
            <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" />
          </div>

          {/* close btn */}
          <div className="cursor-pointer transition-all self-stretch rounded-md bg-gray-600 hover:bg-gray-800 text-white flex items-center px-1">
            <XMarkIcon className="h-4 w-4 font-semibold" onClick={() => removeFavorite(id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryList
