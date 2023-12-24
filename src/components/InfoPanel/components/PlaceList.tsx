'use client'
import { TPlace } from '@/constants/types'
import { placeListSignal } from '@/signals/placeListSignal'
import PlaceItem from './PlaceItem'

/**
 * Subscribe to LOAD_NEW_PLACES events
 */
function PlaceList() {
  // const [paramType] = useQueryState('type')
  // const [placeList, setPlaceList] = useState<TPlace[] | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // /* reset state */
  // useEffect(() => {
  //   setError(null)
  //   setPlaceList(null)
  //   setIsLoading(true)
  // }, [paramType])

  // /* subscribe to new places  */
  // useEffect(() => {
  //   eventEmitter.subscribe(Events.LOAD_NEW_PLACES, (payload: unknown) => {
  //     const { data, error } = payload as TPlaceListEventResponse

  //     setIsLoading(false)
  //     error && setError(error)
  //     data && setPlaceList(data)
  //   })
  //   return () => eventEmitter.unsubscribe(Events.LOAD_NEW_PLACES)
  // }, [])

  // if (isLoading)
  //   return (
  //     <ul className="flex flex-col gap-4 flex-1">
  //       {[0, 1].map((_, i) => (
  //         <Skeleton key={`skeleton_${i}`} />
  //       ))}
  //     </ul>
  //   )

  // if (error) return <p className="text-red-600 text-center text-sm py-2">{error}</p>

  return (
    <ul className="flex flex-col gap-4 flex-1">
      {placeListSignal &&
        placeListSignal.value.map((place: TPlace) => {
          return <PlaceItem key={place.id} place={place} />
        })}
    </ul>
  )
}

export default PlaceList
