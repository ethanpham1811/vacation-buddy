'use client'
import { Disclosure } from '@headlessui/react'
import Logo from './components/Logo'

function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              {/* logo */}
              <div className="flex flex-1 items-stretch justify-start">
                <Logo />
              </div>

              {/* History btn */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <HistoryToggler /> */}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
