import { TPlace, TPlacesAPIResponse } from '@/constants/types'

type TGetPlacesParams = {
  params: {
    type: string
  }
}

/**
 * Fetch city data from Rapid api
 * @param  {string} RAPID_API_KEY       // retrieve in rapid site
 * @param  {string} RAPID_API_DOMAIN    // travel-advisor.p.rapidapi.com
 * @param  {string} RAPID_API_ENDPOINT  // http://travel-advisor.p.rapidapi.com
 *
 * This api provide more than just cities
 * => manually filter and return to client
 */

export async function POST(request: Request, { params: { type } }: TGetPlacesParams) {
  const body = await request.json()
  const { tr_lng, tr_lat, bl_lng, bl_lat } = body

  const res = await fetch(
    `${process.env.RAPID_API_ENDPOINT}/${type}/list-in-boundary?tr_longitude=${tr_lng}&tr_latitude=${tr_lat}&bl_longitude=${bl_lng}&bl_latitude=${bl_lat}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': process.env.RAPID_API_DOMAIN!
      }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch places')
  }

  const result = await res.json()
  const rawList = result?.data

  /* data mapping */
  const placeList = (rawList as TPlacesAPIResponse[])
    .filter((place: TPlacesAPIResponse) => place?.name)
    .map(
      ({
        latitude,
        longitude,
        name,
        photo,
        description,
        website,
        web_url,
        address,
        phone,
        rating,
        num_reviews,
        price,
        open_now_text,
        ranking,
        offer_group
      }: TPlacesAPIResponse): TPlace => ({
        id: `${name}_${latitude}_${longitude}`,
        name,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        thumbnail: photo?.images?.thumbnail?.url,
        photo: photo?.images?.medium?.url,
        description,
        website,
        web_url,
        address,
        phone,
        rating,
        num_reviews,
        price,
        open_now_text,
        ranking,
        offer_group
      })
    )

  return Response.json({ data: placeList })
}
