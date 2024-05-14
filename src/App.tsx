import { memo } from "react"
import { useCondensed, useTheme } from "./store"
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

const CondenseButton = memo(() => {
  const { isCondensed, toggleCondensed } = useCondensed()
  return (
    <Button onClick={toggleCondensed}>
      {isCondensed ? (<PageAdd className="fill-current" />) : (<PageRemove className="fill-current" />)}
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
    <div className="absolute flex flex-col items-start space-y-2 p-4 w-48 top-0 -right-52 bg-gray-300 dark:bg-gray-700">
      <span className="font-black">OPTIONS</span>
      <div className="flex flex-row space-x-2">
        <ThemeButton />
        <CondenseButton />
        <PrintButton />
      </div>
    </div>
  )
})

const Paper = memo(() => {
  const { printableRef } = usePrint()
  return (
    <div ref={printableRef as any} className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-nunito">
      <ThemeWrapper className="flex flex-col items-stretch p-8 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-nunito">
        <Resume />
      </ThemeWrapper>
    </div>
  )
})

const Container = memo(() => {
  return (
    <PrintProvider>
      <div className="flex-1 flex flex-col items-stretch w-[216mm] relative">
        <Paper />
        <Controls />
      </div>
    </PrintProvider>
  )
})

const App = memo(() => {
  return (
    <ThemeWrapper className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Container />
    </ThemeWrapper>
  )
})

export default App
