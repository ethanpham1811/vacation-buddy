'use client'
import { Drawer, Toggler } from '@/components'
import { IoHeart } from '@/constants/icons'
import { useState } from 'react'
import HistoryList from './HistoryList'

function HistoryToggler() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Toggler onClick={() => setOpen(true)} title="history" icon={<IoHeart className="h-6 w-6 text-red-500" />} />
      <Drawer title="Your saved locations" open={open} setOpen={setOpen}>
        <HistoryList setOpen={setOpen} />
      </Drawer>
    </div>
  )
}

export default HistoryToggler
