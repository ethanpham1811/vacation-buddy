'use client'
type TTooltipProps = {
  text: string
}

function Tooltip({ text }: TTooltipProps) {
  return (
    <div
      role="tooltip"
      className="tooltip absolute -left-2 top-2/3 z-[100000] hidden -translate-x-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all group-hover/favorite:block dark:bg-gray-700"
    >
      {text}
      <div
        className="tooltip-arrow absolute right-0 top-1 translate-x-1/2 border-[6px] border-solid border-transparent border-t-blue-600"
        data-popper-arrow
      ></div>
    </div>
  )
}

export default Tooltip
