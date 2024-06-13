import Hyperlink from "./Hyperlink"

export interface IconProps {
  className?: string
  'aria-label'?: string
}

export interface IconLabelProps {
  className?: string
  Icon: React.ComponentType<IconProps>
  iconProps?: IconProps
  label: string
  isHyperlink?: boolean
}

const IconLabel = ({
  className = "flex flex-row items-center space-x-2",
  Icon,
  iconProps = {},
  label,
  isHyperlink = false
}: IconLabelProps) => {
  return (
    <span className={className}>
      <Icon {...iconProps} className="fill-current" />
      {isHyperlink ? <Hyperlink link={label} /> : <span>{label}</span>}
    </span>
  )
}

export default IconLabel
