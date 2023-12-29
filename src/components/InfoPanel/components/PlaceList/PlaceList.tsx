'use client'
import { Skeleton } from '@/components'
import { TPlace } from '@/constants/types'
import { MdError } from 'react-icons/md'
import PlaceItem from '../PlaceItem/PlaceItem'
import Message from '../TopController/Message'

type TPlaceListProps = {
  data: TPlace[] | undefined
  isLoading: boolean
  error: string | null
}

function PlaceList({ data, isLoading, error }: TPlaceListProps) {
  if (isLoading)
    return (
      <ul className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch">
        {[0, 1, 2].map((_, i) => (
          <Skeleton key={`skeleton_${i}`} />
        ))}
      </ul>
    )

  if ((!data || data?.length === 0) && error) return <Message icon={MdError} message="failed to load data" color="red" />

  return (
    <ul className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch">
      {!data || data.length === 0 ? (
        <Message message="No places found" color="gray" />
      ) : (
        data?.map((place: TPlace) => {
          return <PlaceItem key={place.id} place={place} />
        })
      )}
    </ul>
  )
}

export default PlaceList
