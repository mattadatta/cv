import { memo } from "react"
import IconLabel, { IconProps } from "./IconLabel"

export interface SectionProps {
  Icon: React.ComponentType<IconProps>
  title?: string
  remark?: string
  children?: React.ReactNode
  className?: string
}

const Section = memo(({ Icon, title, remark, children, className = '' }: SectionProps) => {
  return (
    <div className="flex flex-col border-gray-700 dark:border-gray-300 pb-1">
      {/* <div className="flex flex-col space-y-2 h-4 -mx-2 -mb-2 border-t border-l rounded-tl-lg border-gray-700 dark:border-gray-300" /> */}
      <div className="flex flex-col space-y-2 h-1 border-t border-gray-400 dark:border-gray-600" />
      {title &&
        <span className="flex flex-row items-center space-x-2">
          <IconLabel
            className="flex flex-row items-center space-x-2 text-lg font-black my-1"
            Icon={Icon}
            label={title.toUpperCase()} />
          {remark &&
            <span className="font-light">{remark}</span>}
        </span>}
      <div className={`${className}`}>
        {children}
      </div>
    </div>
  )
})

export default Section
