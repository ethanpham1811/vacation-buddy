import { MdError } from 'react-icons/md'
import Message from '../../TopController/Message'

function Error() {
  return (
    <div className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch lg:justify-center">
      <Message icon={MdError} message="failed to load data" color="red" />
    </div>
  )
}

export default Error
