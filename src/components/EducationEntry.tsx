import { memo } from "react"
import { EducationInfo } from "../schema/cv"
import { formatYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"

const formatDate = formatYear

export interface EducationEntryProps {
  data: EducationInfo
}

// Slightly different layout

// const EducationEntry = memo(({ data }: EducationEntryProps) => {
//   const { degree, institution, startDate, endDate, address, accolades } = data

//   return (
//     <div className="flex flex-col items-stretch">
//       <span><span className="font-bold">{degree}</span> <InlineDivider /> {institution}</span>
//       <span className="text-gray-600 dark:text-gray-400">{formatDate(startDate)}-{formatDate(endDate)} <InlineDivider /> {formatAddress(address)}</span>
//       <span>{accolades.map((a, index) => (
//         <span key={index}> {a} {index < accolades.length - 1 ? <InlineDivider /> : null}
//         </span>
//       ))}</span>
//     </div>
//   )
// })

const EducationEntry = memo(({ data }: EducationEntryProps) => {
  const { degree, institution, startDate, endDate, address, accolades } = data

  return (
    <div className="flex flex-col items-stretch">
      <span className="flex flex-row items-center justify-between">
        <span><span className="font-bold">{degree}</span> <InlineDivider /> {institution}</span>
        <span className="text-gray-600 dark:text-gray-300">
          {formatAddress(address)} <InlineDivider /> <span className="font-bold">{formatDate(startDate)} - {formatDate(endDate)}</span>
        </span>
      </span>
      <span>{accolades.map((a, index) => (
        <span key={index}> {a} {index < accolades.length - 1 ? <InlineDivider /> : null}
        </span>
      ))}</span>
    </div>
  )
})

export default EducationEntry
