'use client'

import { ArrowRightIcon } from '@/constants/icons'
import { TAutoCompleteData } from '@/constants/types'
import { Combobox } from '@headlessui/react'

function SelectOption({ place }: { place: TAutoCompleteData }) {
  return (
    <Combobox.Option
      className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`}
      value={place}
    >
      {({ selected, active }) => (
        <>
          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{place.name}</span>
          {selected ? (
            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-500'}`}>
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Combobox.Option>
  )
}

export default SelectOption
