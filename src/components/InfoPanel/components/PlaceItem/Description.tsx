import { Spacer } from '@/components'
import LinesEllipsis from 'react-lines-ellipsis'

function Description({ description }: { description: string }) {
  return (
    <>
      <div className="text-sm">
        <label className="float-left hidden gap-1 font-semibold lg:flex">About this place:&nbsp;</label>
        <LinesEllipsis text={description} maxLine="1" ellipsis="..." trimRight basedOn="letters" />
      </div>
      <Spacer />
    </>
  )
}

export default Description
