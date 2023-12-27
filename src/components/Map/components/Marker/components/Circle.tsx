import { ReactNode } from 'react'

type TCircleProps = {
  content: ReactNode
  width: string
  height: string
}

function Circle({ content, width, height }: TCircleProps) {
  return (
    <div
      className="text-white bg-gray-600 rounded-full p-5 flex justify-center items-center cursor-pointer hover:bg-cyan-400"
      style={{ width, height }}
    >
      {content}
    </div>
  )
}

export default Circle
