import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'

type TModalProps = {
  open: boolean
  children: ReactNode
  hasPadding?: boolean
}

export default function Modal({ open, children, hasPadding }: TModalProps) {
  let [isOpen, setIsOpen] = useState(open)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog data-testid="place-detail-modal" as="div" className="relative z-[1000]" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${
                  hasPadding ? 'p-6' : ''
                } w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}
              >
                {children}
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
                  </p>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
