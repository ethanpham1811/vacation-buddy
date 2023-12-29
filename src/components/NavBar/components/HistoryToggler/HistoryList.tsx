import { XMarkIcon } from '@/constants/icons'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { removeFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useQueryState } from 'next-usequerystate'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

type THistoryListProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

function HistoryList({ setOpen }: THistoryListProps) {
  const [_paramLat, setParamLat] = useQueryState('lat')
  const [_paramLng, setParamLng] = useQueryState('lng')
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.favoriteList.data)

  function handleLocatePlace({ id, lat, lng }: { id: string; lat: number; lng: number }) {
    // set lat lng search params => trigger map move & data fetching
    setParamLat(lat.toString())
    setParamLng(lng.toString())

    // set active point
    dispatch(setActivePoint({ id, lat, lng }))

    // close drawer
    setOpen(false)
  }
  function handleRemoveFavorite(id: string) {
    dispatch(removeFavorite(id))
  }

  return (
    <div className="grid gap-5 grid-cols-2">
      {favoriteList.map(({ id, name, photo, lat, lng }) => (
        <div
          key={`favorite_${id}`}
          className="text-xs p-1 shadow-card flex items-center overflow-hidden cursor-pointer bg-white rounded-md min-h-[50px] hover:bg-gray-800 hover:text-white"
          onClick={() => handleLocatePlace({ id, lat, lng })}
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
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFavorite(id)
            }}
            className="remove-btn cursor-pointer transition-all self-stretch rounded-md bg-gray-600 hover:bg-red-500 text-white flex items-center px-1"
          >
            <XMarkIcon className="h-4 w-4 font-semibold" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryList
