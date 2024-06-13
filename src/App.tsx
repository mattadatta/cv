import { useExapnded, useTheme } from "./store"
import Button from "./components/Button"
import Resume from './components/Resume'
import { DarkIcon, LightIcon, PageAdd, PageRemove, Print } from "./components/icons"
import { PrintProvider, usePrint } from "./components/PrintProvider"
import InlineDivider from "./components/InlineDivider"

interface ThemeWrapperProps {
  children: React.ReactNode
  className?: string
}

const ThemeWrapper = ({ children, className = '' }: ThemeWrapperProps) => {
  const { getTheme } = useTheme()
  const themeSelector = getTheme() === 'dark' ? 'dark' : ''

  return (
    <div className={`${themeSelector} ${className}`}>
      {children}
    </div>
  )
}

const ExpandButton = () => {
  const { isExpanded, toggleExpanded } = useExapnded()
  return (
    <Button onClick={toggleExpanded}>
      {isExpanded ? (<PageRemove className="fill-current" />) : (<PageAdd className="fill-current" />)}
    </Button>
  )
}

const PrintButton = () => {
  const { handlePrint } = usePrint()
  return (
    <Button onClick={handlePrint}>
      <Print className="fill-current" />
    </Button>
  )
}

const ThemeButton = () => {
  const { getTheme, toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme}>
      {getTheme() === 'dark' ? (<LightIcon className="fill-current" />) : (<DarkIcon className="fill-current" />)}
    </Button>
  )
}

const Controls = () => {
  return (
    <div className="absolute w-48 top-0 -right-52">
      <div className="fixed top-0 flex flex-col items-start space-y-2 p-4 bg-white dark:bg-gray-800">
        <span className="font-black">OPTIONS</span>
        <div className="flex flex-row space-x-2">
          <ThemeButton />
          <ExpandButton />
          <PrintButton />
        </div>
      </div>
    </div>
  )
}

const PageOverlays = () => {
  const { isExpanded } = useExapnded()
  const pageCount = isExpanded ? 3 : 1
  const pages = Array.from(new Array(pageCount), (_, i) => i)

  return (
    <div className="absolute left-0 top-0 right-0 flex flex-col pointer-events-none">
      {pages.map((i) => (
        <div key={i} className="relative w-[216mm] h-[279.4mm] pointer-events-none">
          <span className="absolute bottom-8 right-8 font-black">
            <span className="font-light">{i+1}</span> <InlineDivider /> <span className="font-light">{pageCount}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

const Paper = () => {
  const { printableRef } = usePrint()
  const { isExpanded } = useExapnded()
  return (
    <div ref={printableRef as any}>
      <ThemeWrapper className={`flex flex-col items-stretch ${isExpanded ? 'h-[838.2mm]' : 'h-[279.4mm]'} p-8 no-print-paddings bg-white dark:bg-gray-800 text-black dark:text-white font-nunito`}>
        <Resume />
        <PageOverlays />
      </ThemeWrapper>
    </div>
  )
}

const Container = () => {
  return (
    <div className="flex-1 flex flex-col items-stretch w-[216mm] relative">
      <Paper />
      <Controls />
    </div>
  )
}

const App = () => {
  return (
    <ThemeWrapper className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 text-black dark:text-white">
      <PrintProvider>
        <Container />
      </PrintProvider>
    </ThemeWrapper>
  )
}

export default App
