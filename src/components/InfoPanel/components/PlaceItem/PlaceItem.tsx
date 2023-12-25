'use client'
import { TActivePoint, TPlace } from '@/constants/types'
import { Dispatch, SetStateAction } from 'react'
import Address from './Address'
import Description from './Description'
import ExternalLinks from './ExternalLinks'
import IsOpen from './IsOpen'
import Phone from './Phone'
import Photo from './Photo'
import Price from './Price'
import Rating from './Rating'

function PlaceItem({ place, setActivePoint }: { place: TPlace; setActivePoint: Dispatch<SetStateAction<TActivePoint | null>> }) {
  const { id, photo, name, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price, lat, lng } = place

  return (
    <div className="group flex flex-col shadow-card" onClick={() => setActivePoint({ lat, lng, id })}>
      {/* photo */}
      <Photo photo={photo} name={name} />

      <div className="rounded-b-md bg-white p-2 flex flex-col gap-1 group-hover:bg-blue-50">
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
