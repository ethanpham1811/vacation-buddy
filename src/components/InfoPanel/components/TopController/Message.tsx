import { createElement } from 'react'
import { IconType } from 'react-icons'

type TMessageProps = {
  icon?: IconType
  message: string
  color?: 'red' | 'blue' | 'gray'
}

function Message({ icon, message, color }: TMessageProps) {
  const colorStyle = { red: 'text-red-600', blue: 'text-blue-600', gray: 'text-gray-600' }

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <p className={`flex w-max items-center gap-2 rounded-full bg-white px-4 py-2 text-center text-sm font-semibold`}>
        {/* icon (optional) */}
        {icon && createElement(icon, { size: 20, className: color ? colorStyle[color] : '' })}

        {/* main text */}
        {message}
      </p>
    </div>
  )
}

export default Message
