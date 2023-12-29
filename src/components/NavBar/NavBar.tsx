'use client'
import { Disclosure } from '@headlessui/react'
import Geocoder from './components/Geocoder/Geocoder'
import HistoryToggler from './components/HistoryToggler/HistoryToggler'
import Logo from './components/Logo'

/**
 * Includes:
 * - Logo
 * - Geocoder (location autocomplete)
 * - History button (open search history)
 *
 * Discloser: client side component from headlessui
 */
function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800 py-2 px-2 lg:px-4 z-[1000]">
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
        <div className="flex items-center ">
          <HistoryToggler />
        </div>
      </div>
    </Disclosure>
  )
}

export default NavBar
