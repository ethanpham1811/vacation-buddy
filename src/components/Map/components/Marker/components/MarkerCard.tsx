import { BLURRED_DATA_URL } from '@/constants/enum'
import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'

type TCircleProps = {
  onClick: () => void
  isActive: boolean
  thumbnail: string | undefined
  name: string
}

function MarkerCard({ onClick, isActive, thumbnail, name }: TCircleProps) {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive ? 'bg-blue-500 text-white' : 'bg-white'
      } relative top-[-100%] left-[-50%] group flex flex-col p-2 shadow-card gap-2 w-20 cursor-pointer hover:bg-blue-500 hover:text-white`}
    >
      <div className="relative h-16">
        <Image
          fill
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL={BLURRED_DATA_URL}
          alt={`thumbnail of ${name}`}
          src={thumbnail || '/'}
        />
      </div>
      <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" className="text-xs" />
    </div>
  )
}

export default MarkerCard
