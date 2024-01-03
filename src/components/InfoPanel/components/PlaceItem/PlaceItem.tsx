'use client'
import { TPoint } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import Address from './Address'
import Description from './Description'
import ExternalLinks from './ExternalLinks'
import IsOpen from './IsOpen'
import Phone from './Phone'
import Photo from './Photo'
import Price from './Price'
import Rating from './Rating'

function PlaceItem({ place }: { place: TPoint }) {
  const { id, type, photo, zoom, name, web_url, website, address, description, phone, rating, num_reviews, open_now_text, price, lat, lng } = place

  function onClick() {
    // trigger PAN_TO_PIN => move map viewport to the pin's location + activate the pin
    eventEmitter.dispatch(Events.PAN_TO_PIN, { id, lat, lng, zoom, type })
  }

  return (
    <div className="group relative flex w-[50dvw] flex-none flex-col shadow-card xs:w-[40dvw] sm:w-[25dvw] lg:w-auto" onClick={onClick}>
      {/* photo */}
      <Photo photo={photo} name={name} />

      <div className="absolute inset-2 flex h-auto w-auto flex-1 cursor-pointer flex-col gap-1 overflow-hidden rounded-b-md rounded-t-md bg-white/50 p-2 backdrop-blur-sm lg:relative lg:inset-0 lg:flex-auto lg:cursor-auto lg:overflow-visible lg:rounded-none lg:bg-white lg:backdrop-blur-none lg:group-hover:bg-blue-50">
        {/* title */}
        <h1 className="text-sm font-semibold lg:text-lg">{name}</h1>

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
