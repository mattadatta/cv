export interface TagChipProps {
  label: string
}

const TagChip = ({ label }: TagChipProps) => {
  return (
    <span className="flex flex-row justify-center items-center px-2 py-1 border rounded-md border-gray-800 dark:border-gray-200 font-source-code-pro text-xs">
      {label}
    </span>
  )
}

export default TagChip
