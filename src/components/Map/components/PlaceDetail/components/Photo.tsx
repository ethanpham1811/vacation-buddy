import { MyImage } from '@/components'
import NoImgPlaceholder from '@/components/utilities/NoImgPlaceholder'
import { BLURRED_DATA_URL } from '@/constants/enum'
import { TFavorite } from '@/constants/types'
import ExternalBtns from './ExternalBtns'
import FavoriteBtn from './FavoriteBtn'

type TPhotoProps = {
  place: TFavorite
  web_url: string | undefined
  website: string | undefined
}

function Photo({ place, web_url, website }: TPhotoProps) {
  const { photo, name } = place
  return (
    <div className="relative flex h-60 items-stretch">
      {photo ? (
        <MyImage fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={BLURRED_DATA_URL} alt={`photo of ${name}`} src={photo} />
      ) : (
        <NoImgPlaceholder />
      )}

      {/* external btn: trip advisor + location website */}
      {web_url && website && <ExternalBtns web_url={web_url} website={website} />}

      {/* favorite btn */}
      <FavoriteBtn place={place} />
    </div>
  )
}

export default Photo
