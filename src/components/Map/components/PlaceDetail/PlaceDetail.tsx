import { Spacer } from '@/components'
import { TPlace } from '@/constants/types'
import { addFavorite, removeFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Photo from './components/Photo'
import RatingAddress from './components/RatingAddress'

type TPlaceDetailProps = {
  place: TPlace
  zoom: number
}

function PlaceDetail({ place, zoom }: TPlaceDetailProps) {
  const favoriteList = useAppSelector((state) => state.favoriteList.data)
  const dispatch = useAppDispatch()
  const { id, type, photo, name, lat, lng, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price } = place
  const isFavorite = favoriteList.some((item) => item.id === id)

  function handleAddFavorite() {
    dispatch(addFavorite({ id, lat, lng, photo, zoom, name, type }))
  }
  function handleRemoveFavorite(id: string) {
    dispatch(removeFavorite(id))
  }

  return (
    <div className="flex flex-col">
      {/* photo with favorite btn*/}
      <Photo id={id} photo={photo} name={name} addFavorite={handleAddFavorite} removeFavorite={handleRemoveFavorite} isFavorite={isFavorite} />

      <div className="flex flex-col gap-1 p-4 shadow-card">
        {/* title */}
        <h1 className="text-lg font-semibold">{name}</h1>
        <Spacer />

        {/* rating & address */}
        {(address || rating) && <RatingAddress rating={rating} num_reviews={num_reviews} address={address} />}
      </div>
    </div>
  )
}

export default PlaceDetail
