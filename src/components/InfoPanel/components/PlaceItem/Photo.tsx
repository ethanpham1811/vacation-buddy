import NoImgPlaceholder from '@/components/utilities/NoImgPlaceholder'
import { BLURRED_DATA_URL } from '@/constants/enum'
import Image from 'next/image'

function Photo({ photo, name }: { photo: string | undefined; name: string }) {
  return (
    <div className="relative hidden h-60 items-stretch overflow-hidden rounded-t-md lg:flex">
      {photo ? (
        <Image fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
      ) : (
        <NoImgPlaceholder />
      )}
    </div>
  )
}

export default Photo
