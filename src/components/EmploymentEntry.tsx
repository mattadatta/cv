import { memo } from "react"
import { EmploymentInfo } from "../schema/cv"
import { formatYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import TagBlock from "./TagBlock"
import { useExapnded } from "../store"
import { ArrowRight } from "./icons"

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
    <div className={`flex flex-col items-stretch`}>
      <div className={`flex flex-row items-center justify-between ${isExpanded ? 'mb-1' : ''}`}>
        <span><span className="font-bold">{title}</span> <InlineDivider /> {company}</span>
        <span className="text-gray-600 dark:text-white font-light">
          {address ? formatAddress(address) : "Various locations"} <InlineDivider /> <span className="">{formatDate(startDate)} - {formatDate(endDate)}</span>
        </span>
      </div>
      <span className="leading-5 text-sm">{summary}</span>
      <div className={`${isExpanded ? '' : '-mb-2'}`}>
        <TagBlock labels={tags} />
      </div>
      {isExpanded && lines &&
        <ul className="list-none leading-5 font-light text-sm">
          {lines.map((l, i) => (
            <li key={i} className="flex">
              <ArrowRight className="fill-current shrink-0 w-6 h-6 -ml-[0.5rem] -mt-[0.15rem] mr-[0.1rem]" /><span className="">{l}</span>
            </li>
          ))}
        </ul>}
    </div>
  )
})

export default EmploymentEntry
