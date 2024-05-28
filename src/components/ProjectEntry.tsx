import { memo } from "react"
import { ProjectInfo } from "../schema/cv"
import TagBlock from "./TagBlock"
import IconLabel from "./IconLabel"
import { ArrowRight, Globe } from "./icons"
import { useExapnded } from "../store"

export interface ProjectEntryProps {
  data: ProjectInfo
}

const ProjectEntry = memo(({ data }: ProjectEntryProps) => {
  const { title, tags, links, summary, lines } = data
  const { isExpanded } = useExapnded()

  const reversedIconStyle = "flex flex-row-reverse font-light items-center space-x-reverse space-x-2"

  return (
    // py-2 border-dotted border-t
    <div className="flex flex-col items-stretch border-gray-700 dark:border-gray-300">
      <div className={`flex justify-between ${isExpanded ? 'mb-1' : ''}`}>
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

export default ProjectEntry
