'use client'
import { Drawer, Toggler } from '@/components'
import { BookOpenIcon } from '@/constants/icons'
import { useState } from 'react'

function HistoryToggler() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Toggler onClick={() => setOpen(true)} title="history" icon={<BookOpenIcon className="h-6 w-6 text-blue-700" />} />
      <Drawer open={open} setOpen={setOpen} />
    </div>
  )
}

export default HistoryToggler
