import { Spacer } from '@/components'

function Address({ address }: { address: string }) {
  return (
    <>
      {address && (
        <>
          <address className="hidden lg:block text-sm not-italic">{address}</address>
          <Spacer />
        </>
      )}
    </>
  )
}

export default Address
