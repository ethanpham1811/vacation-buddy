import { Spacer } from '@/components'
import { TPlace } from '@/constants/types'
import { addFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch } from '@/lib/hooks'
import Photo from './components/Photo'
import RatingAddress from './components/RatingAddress'

type TPlaceDetailProps = {
  place: TPlace
}

function PlaceDetail({ place }: TPlaceDetailProps) {
  const dispatch = useAppDispatch()
  const { id, photo, name, lat, lng, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price } = place

  function handleAddFavorite() {
    dispatch(addFavorite({ id, lat, lng, photo, name }))
  }

  return (
    <div className="flex flex-col">
      {/* photo with favorite btn*/}
      <Photo photo={photo} name={name} addFavorite={handleAddFavorite} />

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
