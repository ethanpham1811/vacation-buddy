import NoImgPlaceholder from '@/components/utilities/NoImgPlaceholder'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { IoHeart } from '@/constants/icons'
import Image from 'next/image'

function Photo({ photo, name, addFavorite }: { photo: string | undefined; name: string; addFavorite: () => void }) {
  return (
    <div className="relative h-60 flex items-stretch relative">
      {photo ? (
        <Image layout="fill" style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
      ) : (
        <NoImgPlaceholder />
      )}

      {/* favorite btn */}
      <div
        onClick={addFavorite}
        className="absolute right-7 bottom-0 translate-y-1/2 shadow-card text-red-400 p-3 rounded-full bg-white cursor-pointer hover:bg-red-400 hover:text-white"
      >
        <IoHeart size={25} />
      </div>
    </div>
  )
}

export default Photo
