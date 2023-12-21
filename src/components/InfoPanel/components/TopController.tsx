import { IoBed, MdAttractions, MdOutlineRestaurant } from '@/constants/icons'

function TopController() {
  function onClick() {
    // fetch data
  }
  return (
    <section>
      <ul className="flex gap-4 justify-end">
        <li className="cursor-pointer rounded-full p-1 group shadow-button" onClick={onClick}>
          <MdOutlineRestaurant className="group-hover:text-blue-600 text-gray-600" size="25" />
        </li>
        <li className="cursor-pointer rounded-full p-1 group shadow-button" onClick={onClick}>
          <IoBed className="group-hover:text-blue-600 text-gray-600" size="25" />
        </li>
        <li className="cursor-pointer rounded-full p-1 group shadow-button" onClick={onClick}>
          <MdAttractions className="group-hover:text-blue-600 text-gray-600" size="25" />
        </li>
      </ul>
    </section>
  )
}

export default TopController
