import { XMarkIcon } from '@/constants/icons'
import { TActivePoint } from '@/constants/types'
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
  const [_paramType, setParamType] = useQueryState('type')
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.favoriteList.data)

  function handleLocatePlace(activePoint: TActivePoint) {
    // set lat lng search params => trigger map move & data fetching
    setParamLat(activePoint.lat.toString())
    setParamLng(activePoint.lng.toString())
    setParamType(activePoint.type)

    // set active point
    dispatch(setActivePoint(activePoint))

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
            className="flex items-center self-stretch px-1 text-white transition-all bg-gray-600 rounded-md cursor-pointer remove-btn hover:bg-red-500"
          >
            <XMarkIcon className="w-4 h-4 font-semibold" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryList
