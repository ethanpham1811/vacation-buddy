'use client'
type TTooltipProps = {
  text: string
}

function Tooltip({ text }: TTooltipProps) {
  return (
    <div
      role="tooltip"
      className="top-2/3 -translate-x-full -left-2 transition-all group-hover/favorite:opacity-100 opacity-0 absolute z-[100000] inline-block px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg shadow-sm tooltip dark:bg-gray-700"
    >
      {text}
      <div className="tooltip-arrow top-1/4 right-0" data-popper-arrow></div>
    </div>
  )
}

export default Tooltip
