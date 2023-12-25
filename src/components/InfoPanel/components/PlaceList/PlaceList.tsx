'use client'
import { Skeleton } from '@/components'
import { TActivePoint, TPlace } from '@/constants/types'
import { locatePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'
import PlaceItem from '../PlaceItem/PlaceItem'
import Message from '../TopController/Message'

type TPlaceListProps = {
  data: TPlace[] | undefined
  isLoading: boolean
  error: string | null
}

function PlaceList({ data, isLoading, error }: TPlaceListProps) {
  const [activePoint, setActivePoint] = useState<TActivePoint | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(locatePoint(activePoint))
  }, [activePoint?.id])

  if (isLoading)
    return (
      <ul className="flex flex-col gap-4 flex-1 h-full overflow-y-scroll pr-2">
        {[0, 1, 2].map((_, i) => (
          <Skeleton key={`skeleton_${i}`} />
        ))}
      </ul>
    )

  if (error) return <Message icon={MdError} message="failed to load data" color="red" />

  return (
    <ul className="flex flex-col gap-4 flex-1 h-full overflow-y-scroll pr-2">
      {!data || data.length === 0 ? (
        <Message message="No places found" color="gray" />
      ) : (
        data?.map((place: TPlace) => {
          return <PlaceItem key={place.id} place={place} setActivePoint={setActivePoint} />
        })
      )}
    </ul>
  )
}

export default PlaceList
