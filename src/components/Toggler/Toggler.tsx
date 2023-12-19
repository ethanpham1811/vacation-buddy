'use client'
import {} from '@headlessui/react'
import { ReactElement } from 'react'

type TTogglerProps = {
  title: string
  icon: ReactElement
  onClick: () => void
}

function Toggler({ title, icon, onClick }: TTogglerProps) {
  return (
    <button
      onClick={onClick}
      className="p-[0.2rem] relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">{title}</span>
      {icon}
    </button>
  )
}

export default Toggler
