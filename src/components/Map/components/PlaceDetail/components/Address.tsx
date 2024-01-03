function Address({ address }: { address: string }) {
  return (
    <address className="shadow-inset p-4 text-sm not-italic">
      <label className="inline-block gap-1 font-semibold">Address:&nbsp;</label>
      {address}
    </address>
  )
}

export default Address
