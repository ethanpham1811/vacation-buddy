import { BLURRED_DATA_URL } from '@/constants/enum'
import { IoHeart } from '@/constants/icons'
import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'

type TCircleProps = {
  isActive: boolean
  thumbnail: string | undefined
  name: string
  isFavorite: boolean
}

function MarkerCard({ isFavorite, isActive, thumbnail, name }: TCircleProps) {
  return (
    <div
      className={`${
        isActive ? 'bg-blue-500 text-white' : 'bg-white'
      } group relative left-[-50%] top-[-100%] flex w-20 cursor-pointer flex-col gap-2 p-2 shadow-card hover:bg-blue-500 hover:text-white`}
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

      {/* favorite icon */}
      {isFavorite && <IoHeart className="h-4 w-4 text-red-400" />}

      {/* description */}
      <LinesEllipsis text={name} maxLine="2" ellipsis="..." trimRight basedOn="letters" className="text-xs" />
    </div>
  )
}

export default MarkerCard
