import { API_TYPES } from '@/constants/enum'
import { IoBed, MdAttractions, MdOutlineRestaurant } from '@/constants/icons'
import { useQueryState } from 'next-usequerystate'

/**
 * active state base on search param "type"
 */
function TopController() {
  const [paramType, setParamType] = useQueryState('type')
  const isRestaurant = paramType === API_TYPES.restaurants
  const isHotel = paramType === API_TYPES.hotels
  const isAttraction = paramType === API_TYPES.attractions

  function onClick(type: string) {
    setParamType(type)
  }
  return (
    <section>
      <ul className="flex gap-4 justify-end">
        <li
          className={`rounded-full p-1 group shadow-button ${isRestaurant ? 'bg-blue-600 text-white' : 'cursor-pointer '}`}
          onClick={() => !isRestaurant && onClick(API_TYPES.restaurants)}
        >
          <MdOutlineRestaurant className={!isRestaurant ? 'group-hover:text-blue-600' : ''} size="25" />
        </li>
        <li
          className={`rounded-full p-1 group shadow-button ${isHotel ? 'bg-blue-600 text-white' : 'cursor-pointer '}`}
          onClick={() => !isHotel && onClick(API_TYPES.hotels)}
        >
          <IoBed className={!isHotel ? 'group-hover:text-blue-600' : ''} size="25" />
        </li>
        <li
          className={`rounded-full p-1 group shadow-button ${isAttraction ? 'bg-blue-600 text-white' : 'cursor-pointer '}`}
          onClick={() => !isAttraction && onClick(API_TYPES.attractions)}
        >
          <MdAttractions className={!isAttraction ? 'group-hover:text-blue-600' : ''} size="25" />
        </li>
      </ul>
    </section>
  )
}

export default TopController
