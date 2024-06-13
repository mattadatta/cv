export interface HyperlinkProps {
  link: string
  label?: string
}

const Hyperlink = ({ link, label = link }: HyperlinkProps) => {
  return (
    <a
      className="underline"
      href={link}
      target="_blank"
    >
      {label}
    </a>
  )
}

export default Hyperlink
