import { memo } from "react"
import { EmploymentInfo } from "../schema/cv"
import { formatMonthAndYear, formatYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import TagBlock from "./TagBlock"
import { useExapnded } from "../store"

const formatDate = formatYear

export interface EmploymentEntryProps {
  data: EmploymentInfo
}

const EmploymentEntry = memo(({ data }: EmploymentEntryProps) => {
  const {
    title, company,
    startDate, endDate,
    address, summary,
    tags, lines } = data
  const { isExpanded } = useExapnded()

  return (
    <div className={`flex flex-col items-stretch ${isExpanded ? 'space-y-1' : ''}`}>
      <span className="flex flex-row items-center justify-between">
        <span><span className="font-bold">{title}</span> <InlineDivider /> {company}</span>
        <span className="text-gray-600 dark:text-white font-light">
          {address ? formatAddress(address) : "Various locations"} <InlineDivider /> <span className="font-bold">{formatDate(startDate)} - {formatDate(endDate)}</span>
        </span>
      </span>
      <span className="leading-5 text-sm">{summary}</span>
      <div className={`${isExpanded ? '' : '-mb-2'}`}>
        <TagBlock labels={tags} />
      </div>
      {isExpanded && lines &&
        <ul className="list-disc pl-4 leading-5 font-light text-sm">
          {
            lines.map((l) => (
              <li key={l}>{l}</li>
            ))
          }
        </ul>}
    </div>
  )
})

export default EmploymentEntry
