import { Spacer } from '@/components'

function Address({ address }: { address: string }) {
  return (
    <>
      {address && (
        <>
          <address className="hidden text-sm not-italic lg:block">{address}</address>
          <Spacer />
        </>
      )}
    </>
  )
}

export default Address
