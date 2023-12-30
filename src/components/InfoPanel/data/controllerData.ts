import { API_TYPES } from '@/constants/enum'
import { IoBed, MdAttractions, MdOutlineRestaurant } from '@/constants/icons'
import { TTopControllerData } from '@/constants/types'

export const controllers: TTopControllerData[] = [
  {
    name: API_TYPES.attractions,
    icon: MdAttractions
  },
  {
    name: API_TYPES.restaurants,
    icon: MdOutlineRestaurant
  },
  {
    name: API_TYPES.hotels,
    icon: IoBed,
    disabled: true
  }
]
