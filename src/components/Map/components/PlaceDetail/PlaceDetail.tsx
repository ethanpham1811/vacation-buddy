import { Spacer } from '@/components'
import { TPlace } from '@/constants/types'
import Address from './components/Address'
import Description from './components/Description'
import InsetPanel from './components/InsetPanel'
import IsOpen from './components/IsOpen'
import Phone from './components/Phone'
import Photo from './components/Photo'
import Price from './components/Price'

type TPlaceDetailProps = {
  place: TPlace
  zoom: number
}

function PlaceDetail({ place, zoom }: TPlaceDetailProps) {
  const { id, type, photo, name, lat, lng, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price } = place

  return (
    <div className="flex flex-col">
      {/* photo with favorite btn*/}
      <Photo web_url={web_url} website={website} place={{ id, lat, lng, photo, zoom, name, type }} />

      <div className="shadow-inset flex flex-col gap-1 p-4">
        {/* title */}
        <h1 className="text-lg font-semibold">{name}</h1>
        <Spacer />

        {/* description */}
        {description && <Description description={description} />}

        {/* price */}
        {price && <Price price={price} />}

        {/* open now */}
        {open_now_text && <IsOpen open_now_text={open_now_text} />}

        {/* phone */}
        {phone && <Phone phone={phone} />}
      </div>

      {/* inset panel: ratings + awards + ranking info */}
      <InsetPanel rating={rating} num_reviews={num_reviews} address={address} />

      {/* address */}
      {address && <Address address={address} />}
    </div>
  )
}

export default PlaceDetail
