'use client'
import { DEBOUNCE_TIMER_AUTOCOMPLETE } from '@/constants/enum'
import { BarsArrowDownIcon, GoDotFill } from '@/constants/icons'
import { Combobox, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'

type TAutoCompleteProps<T> = {
  onSubmit: (val: string, signal?: AbortSignal) => void
  onSelect: (val: T) => void
  children: ReactNode
  width?: string
  name: string
  isLoading: boolean
}

/**
 * Debounce on typing + abort concurrent request before dispatching new request
 * @param  {Function} onSubmit // callback fn (data request) fire on user typing
 * @param  {Function} onSelect // callback fn fire on selection
 */
function AutoComplete<T extends { name: string }>({ onSubmit, onSelect, name, children, width = '100%', isLoading }: TAutoCompleteProps<T>) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!inputValue || inputValue === '') return

    const abortCtrl = new AbortController()

    const timeout = setTimeout(() => {
      onSubmit(inputValue, abortCtrl.signal)
    }, DEBOUNCE_TIMER_AUTOCOMPLETE)

    /**
     * on receiving new input
     * - clear debounce timer
     * - abort prev request
     */
    return () => {
      timeout && clearTimeout(timeout)
      abortCtrl && abortCtrl.abort()
    }
  }, [inputValue, onSubmit])

  return (
    <Combobox onChange={(val: T) => onSelect(val)}>
      <div className="relative z-10" style={{ width }}>
        {/* text input */}
        <div className="relative w-full cursor-default overflow-hidden rounded-full bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-5 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            displayValue={(place: T) => place.name}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Search ${name}`}
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <GoDotFill size="15" className="text-blue-600 animate-ping" />
            ) : (
              <BarsArrowDownIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            )}
          </Combobox.Button>
        </div>

        {/* dropdown list */}
        {!isLoading && (
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {children}
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  )
}

export default AutoComplete
