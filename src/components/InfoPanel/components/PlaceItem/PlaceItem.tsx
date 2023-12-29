'use client'
import { TPoint } from '@/constants/types'
import { setActivePoint } from '@/lib/features/activePoint/activePointSlice'
import { useAppDispatch } from '@/lib/hooks'
import Address from './Address'
import Description from './Description'
import ExternalLinks from './ExternalLinks'
import IsOpen from './IsOpen'
import Phone from './Phone'
import Photo from './Photo'
import Price from './Price'
import Rating from './Rating'

function PlaceItem({ place }: { place: TPoint }) {
  const dispatch = useAppDispatch()
  const { id, photo, zoom, name, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price, lat, lng } = place

  /* set active point => move map to the selected point */
  function onClick() {
    dispatch(setActivePoint({ id, lat, lng, zoom }))
  }

  return (
    <div className="group flex flex-col shadow-card w-[30dvw] lg:w-auto" onClick={onClick}>
      {/* photo */}
      <Photo photo={photo} name={name} />

      <div className=" overflow-hidden lg:overflow-visible rounded-t-md lg:rounded-none rounded-b-md bg-white p-2 flex flex-1 lg:flex-auto flex-col gap-1 group-hover:bg-blue-50">
        {/* title */}
        <h1 className="font-semibold text-lg">{name}</h1>

        {/* rating count */}
        {rating && <Rating rating={rating} num_reviews={num_reviews} />}

        {/* external links */}
        {(web_url || website) && <ExternalLinks web_url={web_url} website={website} />}

        {/* address */}
        {address && <Address address={address} />}

        {/* description */}
        {description && <Description description={description} />}

        {/* price */}
        {price && <Price price={price} />}

        {/* open now */}
        {open_now_text && <IsOpen open_now_text={open_now_text} />}

        {/* phone */}
        {phone && <Phone phone={phone} />}
      </div>
    </div>
  )
}

export default PlaceItem
