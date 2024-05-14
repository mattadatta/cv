import { memo } from "react"
import EmploymentEntry from "./EmploymentEntry"
import { useCv } from "../store"
import Section from "./Section"
import { AtSymbol, BriefcaseLocked, Education, Globe, Location, PackedBox, Smartphone, Tools } from "./icons"
import IconLabel from "./IconLabel"
import EducationEntry from "./EducationEntry"
import TagBlock from "./TagBlock"
import ProjectEntry from "./ProjectEntry"
import { formatAddress } from "../util/address"

const NameAndTitleSection = memo(() => {
  const { name, tagline } = useCv().whoami

  return (
    <div className="flex flex-col font-nunito text-lg space-y-2">
      <h1 className="font-black text-6xl">{name.toUpperCase()}</h1>
      <h2 className="font-black text-xl text-gray-800 dark:text-gray-200">{tagline.toUpperCase()}</h2>
    </div>
  )
})

const ContactSection = memo(() => {
  const { address, contactInfo } = useCv().whoami
  const { number, email, links } = contactInfo

  const reversedIconStyle = "flex flex-row-reverse items-center space-x-reverse space-x-2"

  return (
    <div className="flex flex-col space-y-2 pb-2 text-gray-700 dark:text-gray-100">
      <IconLabel
        className={reversedIconStyle}
        Icon={Smartphone}
        label={number} />
      <IconLabel
        className={reversedIconStyle}
        Icon={AtSymbol}
        label={email} />
      {links.map((url) => (
        <IconLabel
          className={reversedIconStyle}
          key={url}
          Icon={Globe}
          label={url}
          isHyperlink={true} />
      ))}
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
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-4 justify-between">
        <NameAndTitleSection />
        <ContactSection />
      </div>
      <h3 className="text-gray-700 dark:text-gray-200">{summary}</h3>
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
  const { employment } = useCv()

  return (
    <Section
      Icon={BriefcaseLocked}
      title="Employment"
      remark="(references available upon request)"
      className="flex flex-col items-stretch space-y-4"
    >
      {employment.map((d) => (
        <EmploymentEntry key={d.endDate} data={d} />
      ))}
    </Section>
  )
})

const ProjectsSection = memo(() => {
  const { projects } = useCv()

  return (
    <Section
      Icon={PackedBox}
      title="Projects"
      className="flex flex-col items-stretch space-y-4"
    >
      {projects.map((p) => (
        <ProjectEntry key={p.title} data={p} />
      ))}
    </Section>
  )
})

const Resume = memo(() => {
  return (
    <div className="flex flex-col items-stretch space-y-4 leading-6">
      <IdentityHeader />
      <ExpertiseSection />
      <EducationSection />
      <EmploymentSection />
      <ProjectsSection />
    </div>
  )
})

export default Resume
