import { Skeleton } from '@/components'

function LoadingSke() {
  return (
    <ul className="flex flex-row lg:flex-col gap-4 flex-1 overflow-x-scroll lg:overflow-x-auto lg:overflow-y-scroll pr-2 h-48 lg:h-full items-stretch">
      {[0, 1, 2].map((_, i) => (
        <li key={`skeleton_${i}`}>
          <Skeleton />
        </li>
      ))}
    </ul>
  )
}

export default LoadingSke
