import { ReactNode, ReactInstance, createContext, memo, useContext, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useCv, useExapnded, useTheme } from "../store";

type UseReactToPrintHookReturn = (event?: unknown, content?: (() => ReactInstance | null)) => void;

const variableFonts = [
  {
    family: "NunitoSans",
    style: "normal",
    source: `url("./src/assets/fonts/NunitoSans.ttf") format("truetype")`,
  },
  {
    family: "SourceCodePro",
    style: "normal",
    source: `url("./src/assets/fonts/SourceCodePro.ttf") format("truetype")`,
  }
]

const staticFonts = [
  {
    family: "NunitoSans",
    style: "normal",
    weight: "300",
    source: `url("./src/assets/fonts/static/NunitoSans-Light.ttf") format("truetype")`,
  },
  {
    family: "NunitoSans",
    style: "normal",
    weight: "400",
    source: `url("./src/assets/fonts/static/NunitoSans-Regular.ttf") format("truetype")`,
  },
  {
    family: "NunitoSans",
    style: "normal",
    weight: "700",
    source: `url("./src/assets/fonts/static/NunitoSans-Bold.ttf") format("truetype")`,
  },
  {
    family: "NunitoSans",
    style: "normal",
    weight: "900",
    source: `url("./src/assets/fonts/static/NunitoSans-Black.ttf") format("truetype")`,
  },
  {
    family: "SourceCodePro",
    style: "normal",
    weight: "400",
    source: `url("./src/assets/fonts/static/SourceCodePro-Regular.ttf") format("truetype")`,
  }
]

const declaredFonts = staticFonts

interface PrintProviderData {
  printableRef: React.MutableRefObject<ReactInstance | null>
  handlePrint: UseReactToPrintHookReturn
}

const Context = createContext<PrintProviderData | null>(null)

interface PrintProviderProps {
  children?: ReactNode
}

function sanitizeForFilename(input: string): string {
  return input.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9-_]/g, '')
}

const PrintProvider = memo(({ children }: PrintProviderProps) => {
  const { getTheme } = useTheme()
  const { isExpanded } = useExapnded()

  const name = sanitizeForFilename(useCv().whoami.name)
  const expandedSuffix = isExpanded ? '' : '_singlepage'
  const themeSuffix = getTheme() === 'dark' ? '_dark' : ''

  const documentTitle = `CV_${name}${expandedSuffix}${themeSuffix}`
  const printableRef = useRef<ReactInstance | null>(null)
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: documentTitle,
    // pageStyle: "@page { background-color: blue; color: green; }",
    fonts: declaredFonts
  })

  return (
    <Context.Provider value={{ printableRef, handlePrint }}>
      {children}
    </Context.Provider>
  )
})

function usePrint(): PrintProviderData {
  return useContext(Context)!
}

export { PrintProvider, usePrint }
