import { MdOutlineStar } from '@/constants/icons'
import { formatNumber } from '@/services/utilities'
import LinesEllipsis from 'react-lines-ellipsis'

type TRatingDescriptionProps = {
  rating: string | undefined
  num_reviews: string | undefined
  address: string | undefined
}

function RatingAddress({ rating, num_reviews, address }: TRatingDescriptionProps) {
  return (
    <div className="flex gap-4">
      {rating && (
        <div className="flex items-center justify-center text-sm flex-col shadow-card p-3 pr-4">
          <label className="flex gap-1 items-center">
            <MdOutlineStar className="text-yellow-400" size={40} />
            <span className="text-2xl font-bold">{rating}</span>
          </label>
          {num_reviews && (
            <span className="flex">
              (<span className="text-sm">{formatNumber(parseInt(num_reviews))}</span>)
            </span>
          )}
        </div>
      )}
      {address && (
        <div className="text-sm text-justify">
          <LinesEllipsis text={address} maxLine="5" ellipsis="..." trimRight basedOn="letters" />
        </div>
      )}
    </div>
  )
}

export default RatingAddress
