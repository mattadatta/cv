import { memo } from "react"
import { ProjectInfo } from "../schema/cv"
import { formatMonthAndYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import TagBlock from "./TagBlock"
import IconLabel from "./IconLabel"
import { Globe } from "./icons"

const formatDate = formatMonthAndYear

export interface ProjectEntryProps {
  data: ProjectInfo
}

const ProjectEntry = memo(({ data }: ProjectEntryProps) => {
  const { title, tags, links, summary, lines } = data

  return (
    <div className="flex flex-col items-stretch space-y-1 pt-3 border-dotted border-t border-gray-700 dark:border-gray-300">
      <span className="font-bold">{title}</span>
      <span className="leading-5">{summary}</span>
      {links.map((url) => (
        <IconLabel
          key={url}
          Icon={Globe}
          label={url}
          isHyperlink={true} />
      ))}
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

export default ProjectEntry
