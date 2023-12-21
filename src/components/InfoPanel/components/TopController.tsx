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
      <ul className="flex gap-4 justify-end">
        {controllers.map(({ name, icon }) => {
          const isActive = name === API_TYPES.attractions ? !paramType || paramType === name : paramType === name

          return (
            <li
              key={`ctrl_${name}`}
              className={`rounded-full p-1 group shadow-button ${isActive ? 'bg-blue-600 text-white' : 'cursor-pointer '}`}
              onClick={() => !isActive && setParamType(name)}
            >
              {createElement(icon, { className: !isActive ? 'group-hover:text-blue-600' : '', size: '25' })}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TopController
