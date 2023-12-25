'use client'
import { Skeleton } from '@/components'
import { TPlace } from '@/constants/types'
import { MdError } from 'react-icons/md'
import PlaceItem from './PlaceItem'

type TPlaceListProps = {
  data: TPlace[] | undefined
  isLoading: boolean
  error: string | null
}

function PlaceList({ data, isLoading, error }: TPlaceListProps) {
  if (isLoading)
    return (
      <ul className="flex flex-col gap-4 flex-1 h-full overflow-y-scroll pr-2">
        {[0, 1, 2].map((_, i) => (
          <Skeleton key={`skeleton_${i}`} />
        ))}
      </ul>
    )

  if (error)
    return (
      <div className="h-full flex-1 items-center justify-center flex">
        <p className="text-red-600 text-center text-sm py-2 px-4 rounded-full w-max bg-white font-semibold flex items-center gap-2">
          <MdError /> {'failed to load data'}
        </p>
      </div>
    )

  return (
    <ul className="flex flex-col gap-4 flex-1 h-full overflow-y-scroll pr-2">
      {data &&
        data?.map((place: TPlace) => {
          return <PlaceItem key={place.id} place={place} />
        })}
    </ul>
  )
}

export default PlaceList
