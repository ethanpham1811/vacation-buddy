import { Spacer } from '@/components'
import { OPEN_STATUS } from '@/constants/enum'

function IsOpen({ open_now_text }: { open_now_text: string }) {
  let textColor = ''

  if (open_now_text.includes(OPEN_STATUS.open)) textColor = 'text-green-500'
  else if (open_now_text.includes(OPEN_STATUS.closed)) textColor = 'text-red-500'
  else if (open_now_text.includes(OPEN_STATUS.closes)) textColor = 'text-yellow-500'

  return (
    <>
      <div className="text-sm font-semibold">
        <label className={`flex gap-1 float-left`}>Status:&nbsp;</label>
        <span className={textColor}>{open_now_text}</span>
      </div>
      <Spacer />
    </>
  )
}

export default IsOpen
