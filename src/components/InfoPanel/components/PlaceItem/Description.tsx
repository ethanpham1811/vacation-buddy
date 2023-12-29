import { Spacer } from '@/components'
import LinesEllipsis from 'react-lines-ellipsis'

function Description({ description }: { description: string }) {
  return (
    <>
      <div className="text-sm hidden lg:block">
        <label className="flex gap-1 font-semibold float-left">About this place:&nbsp;</label>
        <LinesEllipsis text={description} maxLine="4" ellipsis="..." trimRight basedOn="letters" />
      </div>
      <Spacer />
    </>
  )
}

export default Description
