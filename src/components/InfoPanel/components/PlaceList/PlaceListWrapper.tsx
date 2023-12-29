'use client'
import { TPoint } from '@/constants/types'
import Empty from './components/Empty'
import Error from './components/Error'
import List from './components/List'
import LoadingSke from './components/LoadingSke'

type TPlaceListProps = {
  data: TPoint[] | undefined
  isLoading: boolean
  error: string | null
}

function PlaceListWrapper({ data, isLoading, error }: TPlaceListProps) {
  /* on loading */
  if (isLoading) return <LoadingSke />

  /* on error */
  if ((!data || data?.length === 0) && error) return <Error />

  /* on empty list */
  if (!data || data.length === 0) return <Empty />

  /* data list */
  return <List data={data} />
}

export default PlaceListWrapper
