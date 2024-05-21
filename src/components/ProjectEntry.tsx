import { memo } from "react"
import { ProjectInfo } from "../schema/cv"
import { formatMonthAndYear } from "../util/date"
import { formatAddress } from "../util/address"
import InlineDivider from "./InlineDivider"
import TagBlock from "./TagBlock"
import IconLabel from "./IconLabel"
import { Globe } from "./icons"
import { useExapnded } from "../store"

const formatDate = formatMonthAndYear

export interface ProjectEntryProps {
  data: ProjectInfo
}

const ProjectEntry = memo(({ data }: ProjectEntryProps) => {
  const { title, tags, links, summary, lines } = data
  const { isExpanded } = useExapnded()

  const reversedIconStyle = "flex flex-row-reverse items-center space-x-reverse space-x-2"

  return (
    // py-2 border-dotted border-t
    <div className="flex flex-col items-stretch border-gray-700 dark:border-gray-300">
      <div className="flex justify-between">
        <span className="font-bold">{title}</span>
        {links.map((url) => (
          <IconLabel
            className={reversedIconStyle}
            key={url}
            Icon={Globe}
            label={url}
            isHyperlink={true} />
        ))}
      </div>
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

export default ProjectEntry
