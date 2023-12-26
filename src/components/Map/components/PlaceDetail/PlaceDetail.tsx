import { TPlaceInfo } from '@/constants/types'

type TPlaceDetailProps = {
  place: TPlaceInfo
}

function PlaceDetail({ place }: TPlaceDetailProps) {
  const { id, photo, name, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price } = place

  return <div className="flex flex-col"></div>
}

export default PlaceDetail
