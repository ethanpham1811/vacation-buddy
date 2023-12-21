import { Spacer } from '@/components'

function Price({ price }: { price: string }) {
  return (
    <>
      <div className="text-sm">
        <label className="flex gap-1 font-semibold float-left">Price range:&nbsp;</label>
        {price}
      </div>
      <Spacer />
    </>
  )
}

export default Price
