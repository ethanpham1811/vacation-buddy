import { XMarkIcon } from '@/constants/icons'
import { TActivePin } from '@/constants/types'
import { removeFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Events, eventEmitter } from '@/services/eventEmitter'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

type TFavoriteListProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

function FavoriteList({ setOpen }: TFavoriteListProps) {
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.favoriteList.data)

  function handleLocatePlace(activePin: TActivePin) {
    // trigger TRAVEL_TO_SAVED_PIN => move viewport + set lat lng search params + data fetching
    eventEmitter.dispatch(Events.TRAVEL_TO_SAVED_PIN, activePin)

    // close drawer
    setOpen(false)
  }
  function handleRemoveFavorite(id: string) {
    dispatch(removeFavorite(id))
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      {favoriteList.map(({ id, type, name, photo, lat, lng, zoom }) => (
        <div
          key={`favorite_${id}`}
          className="flex min-h-[50px] cursor-pointer items-center overflow-hidden rounded-md bg-white p-1 text-xs shadow-card hover:bg-gray-800 hover:text-white"
          onClick={() => handleLocatePlace({ id, lat, lng, zoom, type })}
        >
          {zoom}
          {/* photo */}
          <div className="px-2">
            <Image src={photo} width={30} height={30} alt={`favorite_photo_${id}`} />
          </div>

          {/* place name */}
          <div className="flex-1 p-1">
            <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" />
          </div>

          {/* close btn */}
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFavorite(id)
            }}
            className="remove-btn flex cursor-pointer items-center self-stretch rounded-md bg-gray-600 px-1 text-white transition-all hover:bg-red-500"
          >
            <XMarkIcon className="h-4 w-4 font-semibold" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavoriteList
