import { memo } from "react"
import { useExapnded, useTheme } from "./store"
import Button from "./components/Button"
import Resume from './components/Resume'
import { DarkIcon, LightIcon, PageAdd, PageRemove, Print } from "./components/icons"
import { PrintProvider, usePrint } from "./components/PrintProvider"

interface ThemeWrapperProps {
  children: React.ReactNode
  className?: string
}

const ThemeWrapper = memo(({ children, className = '' }: ThemeWrapperProps) => {
  const { getTheme } = useTheme()
  const themeSelector = getTheme() === 'dark' ? 'dark' : ''

  return (
    <div className={`${themeSelector} ${className}`}>
      {children}
    </div>
  )
})

const ExpandButton = memo(() => {
  const { isExpanded, toggleExpanded } = useExapnded()
  return (
    <Button onClick={toggleExpanded}>
      {isExpanded ? (<PageRemove className="fill-current" />) : (<PageAdd className="fill-current" />)}
    </Button>
  )
})

const PrintButton = memo(() => {
  const { handlePrint } = usePrint()
  return (
    <Button onClick={handlePrint}>
      <Print className="fill-current" />
    </Button>
  )
})

const ThemeButton = memo(() => {
  const { getTheme, toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme}>
      {getTheme() === 'dark' ? (<LightIcon className="fill-current" />) : (<DarkIcon className="fill-current" />)}
    </Button>
  )
})

const Controls = memo(() => {
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
})

const Paper = memo(() => {
  const { printableRef } = usePrint()
  const { isExpanded } = useExapnded()
  return (
    <div ref={printableRef as any}>
      <ThemeWrapper className={`flex flex-col items-stretch ${isExpanded ? 'h-[838.2mm]' : 'h-[279.4mm]'} p-8 no-print-paddings bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-nunito`}>
        <Resume />
      </ThemeWrapper>
    </div>
  )
})

const Container = memo(() => {
  return (
    <div className="flex-1 flex flex-col items-stretch w-[216mm] relative">
      <Paper />
      <Controls />
    </div>
  )
})

const App = memo(() => {
  return (
    <ThemeWrapper className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
      <PrintProvider>
        <Container />
      </PrintProvider>
    </ThemeWrapper>
  )
})

export default App
