import Message from '../../TopController/Message'

function Empty() {
  return (
    <div className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch lg:justify-center">
      <Message message="No places found" color="gray" />
    </div>
  )
}

export default Empty
