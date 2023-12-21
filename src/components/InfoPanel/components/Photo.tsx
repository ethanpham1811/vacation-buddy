import NoImgPlaceholder from '@/components/utilities/NoImgPlaceholder'
import { BLURRED_DATA_URL } from '@/constants/enum'
import Image from 'next/image'

function Photo({ photo, name }: { photo: string | undefined; name: string }) {
  return (
    <div className="relative h-60 rounded-t-md overflow-hidden flex items-stretch">
      {photo ? (
        <Image layout="fill" style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
      ) : (
        <NoImgPlaceholder />
      )}
    </div>
  )
}

export default Photo
