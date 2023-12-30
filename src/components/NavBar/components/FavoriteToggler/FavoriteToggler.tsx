'use client'
import { Drawer, Toggler } from '@/components'
import { IoHeart } from '@/constants/icons'
import { useState } from 'react'
import FavoriteList from './FavoriteList'

function FavoriteToggler() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Toggler onClick={() => setOpen(true)} title="favorite toggler" icon={<IoHeart className="w-6 h-6 text-red-500" />} />
      <Drawer title="Your saved locations" open={open} setOpen={setOpen}>
        <FavoriteList setOpen={setOpen} />
      </Drawer>
    </div>
  )
}

export default FavoriteToggler
