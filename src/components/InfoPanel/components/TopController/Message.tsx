import { createElement } from 'react'
import { IconType } from 'react-icons'

type TMessageProps = {
  icon?: IconType
  message: string
  color: string
}

function Message({ icon, message, color }: TMessageProps) {
  return (
    <div className="h-full flex-1 items-center justify-center flex">
      <p className={`text-${color}-600 text-center text-sm py-2 px-4 rounded-full w-max bg-white font-semibold flex items-center gap-2`}>
        {icon && createElement(icon)} {message}
      </p>
    </div>
  )
}

export default Message
