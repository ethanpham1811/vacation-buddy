'use client'
import { Disclosure } from '@headlessui/react'
import { Geocoder } from '..'
import HistoryToggler from './components/HistoryToggler'
import Logo from './components/Logo'

/**
 * Includes:
 * - Logo
 * - Geocoder (location autocomplete)
 * - History button (open search history)
 */
function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800 py-2 px-2 lg:px-4">
      <div className="mx-auto relative flex items-center justify-between">
        {/* logo */}
        <div className="flex items-stretch justify-start">
          <Logo />
        </div>

        {/* geocoder */}
        <div className="flex flex-1 items-stretch justify-center">
          <Geocoder />
        </div>

        {/* History btn */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
          <HistoryToggler />
        </div>
      </div>
    </Disclosure>
  )
}

export default NavBar
