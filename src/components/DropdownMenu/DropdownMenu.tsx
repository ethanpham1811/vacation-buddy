'use client'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactNode } from 'react'

type TDropdownMenuProps<T> = {
  onSubmit: (val: string) => void
  onSelect: (val: T) => void
  children: ReactNode
  width?: string
}

/**
 * @param  {Function} onSubmit // fire on user typing
 * @param  {Function} onSelect // fire on selection
 */
function DropdownMenu<T extends { name: string }>({ onSubmit, onSelect, children, width = '100%' }: TDropdownMenuProps<T>) {
  return (
    <Combobox onChange={(val: T) => onSelect(val)}>
      <div className="relative z-10" style={{ width }}>
        {/* input */}
        <div className="relative w-full cursor-default overflow-hidden rounded-full bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-5 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            displayValue={(place: T) => place.name}
            onChange={(event) => onSubmit(event.target.value)}
            placeholder="Search location"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>

        {/* dropdown list */}
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {children}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default DropdownMenu
