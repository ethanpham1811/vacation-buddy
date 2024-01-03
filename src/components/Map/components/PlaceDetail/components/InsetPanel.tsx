import { FaAward, FaStar, FaTrophy } from '@/constants/icons'
import { useMemo } from 'react'

type TRatingDescriptionProps = {
  rating: string | undefined
  num_reviews: string | undefined
  address: string | undefined
}
function InsetPanel({ rating, num_reviews, address }: TRatingDescriptionProps) {
  const fakeRank = useMemo(() => (Math.random() * 100).toFixed(0), [])
  const fakeAward = useMemo(() => (Math.random() * 10).toFixed(0), [])
  return (
    <div className="">
      <div className="flex items-center justify-around gap-4">
        {rating && (
          <>
            <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full p-4">
              <FaStar className="text-yellow-400" size={24} />
              <span className="text-xl font-semibold">{rating}</span>
            </div>
            <div className="h-5 w-[1px] bg-gray-800"></div>
          </>
        )}
        <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full p-4">
          <FaTrophy className="text-blue-600" size={24} />
          <span className="text-xl font-semibold">{fakeRank}</span>
        </div>
        <div className="h-5 w-[1px] bg-gray-800"></div>
        <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full p-4">
          <FaAward className="text-red-600" size={24} />
          <span className="text-xl font-semibold">{fakeAward}</span>
        </div>
      </div>
    </div>
  )
}

export default InsetPanel
