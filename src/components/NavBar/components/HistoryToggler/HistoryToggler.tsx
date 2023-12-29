'use client'
import { Drawer, Toggler } from '@/components'
import { IoHeart } from '@/constants/icons'
import { removeFavorite } from '@/lib/features/favoriteList/favoriteListSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useState } from 'react'
import HistoryList from './HistoryList'

function HistoryToggler() {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.favoriteList.data)

  function handleLocatePlace({ id, lat, lng }: { id: string; lat: number; lng: number }) {
    // dispatch(removeFavorite(id))
  }
  function handleRemoveFavorite(id: string) {
    dispatch(removeFavorite(id))
  }

  return (
    <div>
      <Toggler onClick={() => setOpen(true)} title="history" icon={<IoHeart className="h-6 w-6 text-red-500" />} />
      <Drawer title="Your saved locations" open={open} setOpen={setOpen}>
        <HistoryList data={favoriteList} removeFavorite={handleRemoveFavorite} locatePlace={handleLocatePlace} />
      </Drawer>
    </div>
  )
}

export default HistoryToggler
