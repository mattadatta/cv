import { Fragment, memo } from "react"
import EmploymentEntry from "./EmploymentEntry"
import { useCv, useExapnded } from "../store"
import Section from "./Section"
import { AtSymbol, BriefcaseLocked, Education, Github, Globe, LinkedIn, Location, PackedBox, Smartphone, Tools } from "./icons"
import IconLabel from "./IconLabel"
import EducationEntry from "./EducationEntry"
import TagBlock from "./TagBlock"
import ProjectEntry from "./ProjectEntry"
import { formatAddress } from "../util/address"

const NameAndTitleSection = memo(() => {
  const { name, tagline } = useCv().whoami

  return (
    <div className="flex flex-col">
      <h1 className="font-black text-6xl">{name.toUpperCase()}</h1>
      <h2 className="font-black text-xl text-gray-800 dark:text-gray-200">{tagline.toUpperCase()}</h2>
    </div>
  )
})

const ContactSection = memo(() => {
  const { address, contactInfo } = useCv().whoami
  const { number, email, links } = contactInfo

  const reversedIconStyle = "flex flex-row-reverse font-light items-center space-x-reverse space-x-2"

  return (
    <div className="flex flex-col space-y-1 mt-2 mb-2 text-nowrap">
      <IconLabel
        className={reversedIconStyle}
        Icon={Smartphone}
        label={number} />
      <IconLabel
        className={reversedIconStyle}
        Icon={AtSymbol}
        label={email} />
      {links.map((url) => {
        const isLinkedIn = url.includes("linkedin")
        const isGithub = url.includes("github")
        const Icon = isLinkedIn ? LinkedIn : isGithub ? Github : Globe
        return (
          <IconLabel
            className={reversedIconStyle}
            key={url}
            Icon={Icon}
            label={url}
            isHyperlink={true} />)
      })}
      <IconLabel
        className={reversedIconStyle}
        Icon={Location}
        label={formatAddress(address)} />
    </div>
  )
})

const IdentityHeader = memo(() => {
  const { summary } = useCv().whoami

  return (
    <div className="flex flex-col space-y-1 pt-2 pb-1">
      <div className="flex flex-row justify-between">
        <NameAndTitleSection />
        <ContactSection />
      </div>
      <h3 className="text-gray-700 dark:text-gray-100 leading-5">{summary}</h3>
    </div>
  )
})

const ExpertiseSection = memo(() => {
  const { tags } = useCv().whoami

  return (
    <Section
      Icon={Tools}
      title="Expertise"
      className="flex flex-col"
    >
      <TagBlock labels={tags} />
    </Section>
  )
})

const EducationSection = memo(() => {
  const { education } = useCv()

  return (
    <Section Icon={Education} title="Education">
      {education.map((d) => (
        <EducationEntry key={d.degree} data={d} />
      ))}
    </Section>
  )
})

const EmploymentSection = memo(() => {
  const employment = useCv().employment.filter((d) => !d.hidden)
  const { isExpanded } = useExapnded()
  const count = isExpanded ? employment.length : 3
  const bottomMargin = isExpanded ? 'mb-2' : 'mb-1'

  return (
    <Section
      Icon={BriefcaseLocked}
      title="Employment"
      remark="(references available upon request)"
      className="flex flex-col items-stretch pb-2"
    >
      {employment.slice(0, count).map((d, i) => (
        <Fragment key={d.endDate}>
          {/* TODO: need better way to do page management */}
          {isExpanded && (i == 1) && (<div className="relative h-[6.5rem]" />)}

          {(i > 0) && (<div className={`border-dotted border-t border-gray-700 dark:border-gray-300 mt-3 ${bottomMargin}`} />)}
          <EmploymentEntry data={d} />
        </Fragment>
      ))}
    </Section>
  )
})

const ProjectsSection = memo(() => {
  const projects = useCv().projects.filter((d) => !d.hidden)
  const { isExpanded } = useExapnded()
  const count = isExpanded ? projects.length : 2
  const bottomMargin = isExpanded ? 'mb-2' : 'mb-1'

  return (
    <Section
      Icon={PackedBox}
      title="Projects"
      className="flex flex-col items-stretch"
    >
      {projects.slice(0, count).map((p, i) => (
        <Fragment key={p.title}>
          {(i > 0) && (<div className={`border-dotted border-t border-gray-700 dark:border-gray-300 mt-3 ${bottomMargin}`} />)}
          <ProjectEntry data={p} />
        </Fragment>
      ))}
    </Section>
  )
})

const Resume = memo(() => {
  const { isExpanded } = useExapnded()

  return (
    <div className={`flex flex-col items-stretch leading-6 ${isExpanded ? 'space-y-1' : ''}`}>
      <IdentityHeader />
      <ExpertiseSection />
      <EducationSection />
      <EmploymentSection />
      {/* TODO: need better way to do page management */}
      {isExpanded && (<div className="h-[6rem]" />)}
      <ProjectsSection />
    </div>
  )
})

export default Resume
