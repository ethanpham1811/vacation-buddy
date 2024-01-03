'use client'
import { FaStar } from '@/constants/icons'
import { formatNumber } from '@/services/utilities'

function Rating({ rating, num_reviews }: { rating: string; num_reviews: string | undefined }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <label className="flex gap-1">
        <FaStar className="text-yellow-400" size={18} />
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
