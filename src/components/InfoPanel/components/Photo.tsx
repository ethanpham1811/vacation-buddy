import { BLURRED_DATA_URL } from '@/constants/enum'
import Image from 'next/image'

function Photo({ photo }: { photo: string }) {
  return (
    <div className="relative h-60 rounded-t-md overflow-hidden">
      <Image layout="fill" style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
    </div>
  )
}

export default Photo
