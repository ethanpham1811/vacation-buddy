import { TAutoCompleteData, TCityAPIResponse } from '@/constants/types'

/**
 * Fetch city data from Rapic api
 * @param  {string} RAPID_API_KEY       // retrieve in rapid site
 * @param  {string} RAPID_API_DOMAIN    // travel-advisor.p.rapidapi.com
 * @param  {string} RAPID_API_ENDPOINT  // http://travel-advisor.p.rapidapi.com
 *
 * This api provide more than just cities
 * => manually filter and return to client
 */
export async function GET(request: Request, { params: { query } }: { params: { query: string } }) {
  const res = await fetch(`${process.env.RAPID_API_ENDPOINT}/locations/v2/auto-complete?query=${query}&lang=en_US&units=km`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
      'X-RapidAPI-Host': process.env.RAPID_API_DOMAIN!
    },
    next: { revalidate: 3600 },
    signal: request.signal
  })
  if (!res.ok) {
    throw new Error('Failed to fetch cities')
  }
  const result = await res.json()
  const data = result?.data?.Typeahead_autocomplete?.results

  /* data mapping */
  const rawList = data?.filter((item: { detailsV2?: { placeType: string } }) => item.detailsV2?.placeType === 'CITY')
  const citiesList: TAutoCompleteData[] = (rawList as TCityAPIResponse[]).map(({ detailsV2 }: TCityAPIResponse): TAutoCompleteData => {
    const name = detailsV2?.names?.name
    const fullName = detailsV2?.names?.longOnlyHierarchyTypeaheadV2
    const lat = detailsV2?.geocode?.latitude
    const lng = detailsV2?.geocode?.longitude

    return {
      id: `${name}_${lat}_${lng}`,
      name: `${name}. ${fullName}` || 'unknown',
      lat,
      lng
    }
  })

  return Response.json({ data: citiesList })
}
