import { memo } from "react"
import { EducationInfo } from "../schema/cv"
import { formatYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import { useExapnded } from "../store"

const formatDate = formatYear

export interface EducationEntryProps {
  data: EducationInfo
}

const EducationEntry = memo(({ data }: EducationEntryProps) => {
  const { degree, institution, startDate, endDate, address, accolades } = data
  const { isExpanded } = useExapnded()

  return (
    <div className="flex flex-col items-stretch">
      <div className={`flex flex-row items-center justify-between ${isExpanded ? '' : 'mb-1'}`}>
        <span><span className="font-bold">{degree}</span> <InlineDivider /> {institution}</span>
        <span className="text-gray-600 dark:text-white font-light">
          {formatAddress(address)} <InlineDivider /> <span className="">{formatDate(startDate)} - {formatDate(endDate)}</span>
        </span>
      </div>
      <span className={`text-sm flex ${isExpanded ? 'flex-col' : 'flex-row space-x-1'}`}>
        {accolades.map((a, index) => (
          <span key={index}> {a} {((!isExpanded) && (index < accolades.length - 1)) ? <InlineDivider /> : null}</span>
        ))}
      </span>
    </div>
  )
})

export default EducationEntry
