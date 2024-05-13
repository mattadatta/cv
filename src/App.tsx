import { memo, useCallback } from "react"
import { useCondensed, useTheme } from "./store"
import Button from "./components/Button"
import Resume from './components/Resume'
import { DarkIcon, LightIcon, PageAdd, PageRemove, Print } from "./components/icons"

const CondenseButton = memo(() => {
  const { isCondensed, toggleCondensed } = useCondensed()
  return (
    <Button onClick={toggleCondensed}>
      {isCondensed ? (<PageAdd className="fill-current" />) : (<PageRemove className="fill-current" />)}
    </Button>
  )
})

const PrintButton = memo(() => {
  const onClick = useCallback(() => window.print(), [])
  return (
    <Button onClick={onClick}>
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
  return (
    <div className="flex flex-col items-stretch">
      <Resume />
    </div>
  )
})

const Container = memo(() => {
  return (
    <div className="flex-1 flex flex-col items-stretch bg-gray-200 dark:bg-gray-800 w-[850px] p-8 relative">
      <Paper />
      <Controls />
    </div>
  )
})

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

const App = memo(() => {
  return (
    <ThemeWrapper className="w-screen h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-nunito">
      <Container />
    </ThemeWrapper>
  )
})

export default App
