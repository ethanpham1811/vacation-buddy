import { Tooltip } from '@/components'
import NoImgPlaceholder from '@/components/utilities/NoImgPlaceholder'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { IoHeart } from '@/constants/icons'
import Image from 'next/image'

type TPhotoProps = {
  photo: string | undefined
  name: string
  id: string
  addFavorite: () => void
  removeFavorite: (id: string) => void
  isFavorite: boolean
}

function Photo({ id, photo, name, addFavorite, removeFavorite, isFavorite }: TPhotoProps) {
  return (
    <div className="relative h-60 flex items-stretch">
      {photo ? (
        <Image layout="fill" style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
      ) : (
        <NoImgPlaceholder />
      )}

      {/* favorite btn */}
      <div
        onClick={() => (isFavorite ? removeFavorite(id) : addFavorite())}
        className={`${
          isFavorite ? 'bg-red-400 text-white' : 'bg-white'
        } group/favorite absolute right-7 bottom-0 translate-y-1/2 shadow-card text-red-400 p-3 rounded-full cursor-pointer hover:bg-red-400 hover:text-white`}
      >
        <IoHeart size={25} />

        {/* tooltip */}
        <Tooltip text={isFavorite ? 'Unfavorite' : 'Favorite'} />
      </div>
    </div>
  )
}

export default Photo
