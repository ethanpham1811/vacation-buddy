import { TPoint } from '@/constants/types'
import PlaceItem from '../../PlaceItem/PlaceItem'

function List({ data }: { data: TPoint[] }) {
  return (
    <ul className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch">
      {data?.map((place: TPoint) => {
        return <PlaceItem key={place.id} place={place} />
      })}
    </ul>
  )
}

export default List
