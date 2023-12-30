'use client'
import { Disclosure } from '@headlessui/react'
import FavoriteToggler from './components/FavoriteToggler/FavoriteToggler'
import Geocoder from './components/Geocoder/Geocoder'
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
      <div className="relative flex items-center justify-between mx-auto">
        {/* logo */}
        <div className="flex items-stretch justify-start">
          <Logo />
        </div>

        {/* geocoder */}
        <div className="flex items-stretch justify-center flex-1">
          <Geocoder />
        </div>

        {/* History btn */}
        <div className="flex items-center ">
          <FavoriteToggler />
        </div>
      </div>
    </Disclosure>
  )
}

export default NavBar
