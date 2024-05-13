import { memo } from "react"
import { EmploymentInfo } from "../schema/cv"
import { formatMonthAndYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import TagBlock from "./TagBlock"

const formatDate = formatMonthAndYear

export interface EmploymentEntryProps {
  data: EmploymentInfo
}

const EmploymentEntry = memo(({ data }: EmploymentEntryProps) => {
  const {
    title, company,
    startDate, endDate,
    address, summary,
    tags, lines } = data

  return (
    <div className="flex flex-col items-stretch space-y-2 pt-3 border-dotted border-t border-gray-700 dark:border-gray-300">
      <span className="flex flex-row items-center justify-between">
        <span><span className="font-bold">{title}</span> <InlineDivider /> {company}</span>
        <span className="text-gray-600 dark:text-gray-300">
          {address ? formatAddress(address) : "Various locations"} <InlineDivider /> <span className="font-bold">{formatDate(startDate)} - {formatDate(endDate)}</span>
        </span>
      </span>
      <span className="leading-5">{summary}</span>
      <TagBlock labels={tags} />
      {lines &&
        <ul className="list-disc pl-4 leading-5 font-light space-y-1">
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
