import { Spacer } from '@/components'
import Link from 'next/link'

function Phone({ phone }: { phone: string }) {
  return (
    <>
      <div className="hidden lg:flex gap-1 items-center text-sm">
        <label className="flex gap-1 font-semibold">Tel:</label>
        <Link href={`tel:${phone}`} className="link text-sm">
          {phone}
        </Link>
      </div>
      <Spacer />
    </>
  )
}

export default Phone
