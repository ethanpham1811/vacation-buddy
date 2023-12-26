import { Spacer } from '@/components'
import { TPlaceInfo } from '@/constants/types'
import Photo from './components/Photo'
import RatingAddress from './components/RatingAddress'

type TPlaceDetailProps = {
  place: TPlaceInfo
}

function PlaceDetail({ place }: TPlaceDetailProps) {
  const { id, photo, name, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price } = place

  return (
    <div className="flex flex-col">
      {/* photo with favorite btn*/}
      <Photo photo={photo} name={name} />

      <div className="p-4 flex flex-col gap-1 shadow-card">
        {/* title */}
        <h1 className="font-semibold text-lg">{name}</h1>
        <Spacer />

        {/* rating & address */}
        {(address || rating) && <RatingAddress rating={rating} num_reviews={num_reviews} address={address} />}
      </div>
    </div>
  )
}

export default PlaceDetail
