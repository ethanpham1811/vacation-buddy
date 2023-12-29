'use client'
import { DEBOUNCE_TIMER_AUTOCOMPLETE } from '@/constants/enum'
import { BarsArrowDownIcon, GoDotFill } from '@/constants/icons'
import { Combobox, Transition } from '@headlessui/react'
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react'

type TAutoCompleteProps<T> = {
  onSubmit: (val: string, signal?: AbortSignal) => void
  onSelect: (val: T) => void
  children: ReactNode
  width?: string
  name: string
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

/**
 * Debounce on typing + abort concurrent request before dispatching new request
 * @param  {Function} onSubmit // callback fn (data request) fire on user typing
 * @param  {Function} onSelect // callback fn fire on selection
 */
function AutoComplete<T extends { name: string }>({
  onSubmit,
  onSelect,
  setIsLoading,
  isLoading,
  name,
  children,
  width = '100%'
}: TAutoCompleteProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [isFocusing, setIsFocusing] = useState(false)

  useEffect(() => {
    if (!inputValue || inputValue === '') return
    setIsLoading(true)

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
  }, [inputValue])

  return (
    <Combobox onChange={(val: T) => onSelect(val)}>
      <div className="relative z-10" style={{ width }}>
        {/* text input */}
        <div className="relative w-full cursor-default overflow-hidden rounded-full bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-5 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            displayValue={(place: T) => (isFocusing ? '' : place?.name)}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocusing(true)}
            onBlur={() => setIsFocusing(false)}
            placeholder={`Search ${name}`}
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <GoDotFill size="25" className="text-blue-500 animate-bounce relative -bottom-1" />
            ) : (
              <BarsArrowDownIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            )}
          </Combobox.Button>
        </div>

        {/* dropdown list */}
        {!isLoading && (
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Combobox.Options className="absolute mt-[13px] w-full overflow-hidden rounded-[20px] bg-white p-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <div className="max-h-60 w-full overflow-auto">{children}</div>
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  )
}

export default AutoComplete
