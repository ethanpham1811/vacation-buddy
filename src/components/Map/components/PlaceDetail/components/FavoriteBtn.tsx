import { IoHeart } from '@/constants/icons'
import { TFavorite } from '@/constants/types'
import { addFavorite, removeFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import clsx from 'clsx'

type TFavoriteBtnProps = {
  place: TFavorite
}

function FavoriteBtn({ place }: TFavoriteBtnProps) {
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.favoriteList.data)
  const isFavorite = favoriteList.some((item) => item.id === place.id)

  function handleAddFavorite() {
    dispatch(addFavorite(place))
  }
  function handleRemoveFavorite() {
    dispatch(removeFavorite(place.id))
  }

  return (
    <div
      onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      className={clsx(
        'absolute bottom-0 right-7 translate-y-1/2 cursor-pointer rounded-full p-3 text-red-400 shadow-card transition-all',
        isFavorite ? 'bg-red-400 text-white' : 'bg-white'
      )}
    >
      <IoHeart className={clsx(!isFavorite ? 'animate-wiggle-more animate-infinite' : '', '')} size={25} />
    </div>
  )
}

export default FavoriteBtn
