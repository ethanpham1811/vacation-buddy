'use client'
import { MdOutlineStar } from '@/constants/icons'
import { formatNumber } from '@/services/utilities'

function Rating({ rating, num_reviews }: { rating: string; num_reviews: string | undefined }) {
  return (
    <div className="flex gap-1 items-center text-sm">
      <label className="flex gap-1">
        <MdOutlineStar className="text-yellow-400" size={20} />
        {rating}
      </label>
      {num_reviews && (
        <span className="flex">
          (<span className="font-semibold">{formatNumber(parseInt(num_reviews))}</span>&nbsp;
          <span>reviews</span>)
        </span>
      )}
    </div>
  )
}

export default Rating
