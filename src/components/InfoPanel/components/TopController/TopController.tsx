'use client'
import { API_TYPES } from '@/constants/enum'
import clsx from 'clsx'
import { useQueryState } from 'next-usequerystate'
import { createElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { controllers } from '../../data/controllerData'

/**
 * active state base on search param "type"
 * - Attractions (default)
 * - Restaurants
 * - Hotels (api currently not working)
 */
function TopController() {
  const [paramType, setParamType] = useQueryState('type')

  return (
    <section>
      <ul className="flex flex-col justify-end gap-2 rounded-md bg-gray-800 p-2 lg:flex-row">
        {controllers.map(({ name, icon, disabled }) => {
          const isActive = name === API_TYPES.attractions ? !paramType || paramType === name : paramType === name

          return (
            <li
              key={`ctrl_${name}`}
              className={clsx(
                'group flex items-center overflow-hidden rounded-full p-0 p-1 shadow-button lg:p-0 lg:py-1',
                disabled ? 'pointer-events-none' : '',
                isActive ? 'mx-0 gap-0 bg-blue-600 p-0 text-white lg:mx-1 lg:gap-2 lg:px-3' : 'cursor-pointer p-0 lg:px-2',
              )}
              onClick={() => !isActive && setParamType(name)}
            >
              {/* label */}
              <div
                className={clsx(
                  'hidden rounded-sm text-sm transition-all duration-700 lg:block',
                  isActive ? 'max-w-[100px] text-white' : 'max-w-0 text-transparent',
                )}
              >
                {name.toLocaleUpperCase()}
              </div>

              {/* icon */}
              {createElement(icon, {
                className: twMerge(
                  clsx(!isActive ? 'text-white group-hover:text-blue-600' : '', disabled ? 'text-gray-600 pointer-events-none' : ''),
                ),
                size: '25',
              })}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TopController
