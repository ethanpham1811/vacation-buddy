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
  const { trlng, trlat, bllng, bllat } = body

  const res = await fetch(
    `${process.env.RAPID_API_ENDPOINT}/${type}/list-in-boundary?tr_longitude=${trlng}&tr_latitude=${trlat}&bl_longitude=${bllng}&bl_latitude=${bllat}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': process.env.RAPID_API_DOMAIN!
      },
      signal: request.signal
    }
  )

  // TODO: map error message
  if (!res.ok) {
    throw new Error('Failed to fetch places')
  }

  const result = await res.json()
  const rawList = result?.data

  /* data mapping */
  const placeList = rawList.map(
    (place: TPlacesAPIResponse): TPlace => ({
      name: place?.name || 'unknown',
      latitude: parseFloat(place?.latitude),
      longitude: parseFloat(place?.longitude)
    })
  )

  return Response.json({ data: placeList })
}
