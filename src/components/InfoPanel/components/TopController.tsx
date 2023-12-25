'use client'
import { API_TYPES } from '@/constants/enum'
import { useQueryState } from 'next-usequerystate'
import { createElement } from 'react'
import { controllers } from '../data/controllerData'

/**
 * active state base on search param "type"
 */
function TopController() {
  const [paramType, setParamType] = useQueryState('type')

  return (
    <section>
      <ul className="flex gap-2 justify-end bg-gray-800 p-2 rounded-md">
        {controllers.map(({ name, icon }) => {
          const isActive = name === API_TYPES.attractions ? !paramType || paramType === name : paramType === name

          return (
            <li
              key={`ctrl_${name}`}
              className={`flex overflow-hidden rounded-full py-1 items-center group shadow-button ${
                isActive ? 'bg-blue-600 text-white px-3 gap-2 mx-1' : 'cursor-pointer px-2'
              }`}
              onClick={() => !isActive && setParamType(name)}
            >
              <div className={`text-sm rounded-sm transition-all duration-700 ${isActive ? 'max-w-[100px] text-white' : 'max-w-0 text-transparent'}`}>
                {name.toLocaleUpperCase()}
              </div>
              {createElement(icon, { className: !isActive ? 'text-white group-hover:text-blue-600' : '', size: '25' })}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TopController
