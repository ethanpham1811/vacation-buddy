'use client'
type TTooltipProps = {
  text: string
}

function Tooltip({ text }: TTooltipProps) {
  return (
    <div
      role="tooltip"
      className="tooltip absolute -left-2 top-2/3 z-[100000] inline-block hidden -translate-x-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all group-hover/favorite:block dark:bg-gray-700"
    >
      {text}
      <div className="tooltip-arrow right-0 top-1/4" data-popper-arrow></div>
    </div>
  )
}

export default Tooltip
