import TagChip from "./TagChip"

export interface TagBlockProps {
  labels: string[]
}

const TagBlock = ({ labels }: TagBlockProps) => {
  return (
    <div className="flex flex-row flex-wrap pt-1">
      {labels.map((l) => (
        <span key={l} className="mr-1 mb-1">
          <TagChip label={l} />
        </span>
      ))}
    </div>
  )
}

export default TagBlock
