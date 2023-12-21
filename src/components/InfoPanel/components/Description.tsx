import { Spacer } from '@/components'

function Description({ description }: { description: string }) {
  return (
    <>
      <div className="text-sm">
        <label className="flex gap-1 font-semibold float-left">About this place:&nbsp;</label>
        {description}
      </div>
      <Spacer />
    </>
  )
}

export default Description