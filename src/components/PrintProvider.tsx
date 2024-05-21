import { ReactNode, ReactInstance, createContext, memo, useContext, useRef } from "react"
import { useReactToPrint } from "react-to-print"

type UseReactToPrintHookReturn = (event?: unknown, content?: (() => ReactInstance | null)) => void;

const declaredFonts = [
  {
    family: "NunitoSans",
    source: `url("./src/assets/fonts/NunitoSans.ttf") format("truetype")`,
  },
  {
    family: "SourceCodePro",
    source: `url("./src/assets/fonts/SourceCodePro.ttf") format("truetype")`,
  }
]

interface PrintProviderData {
  printableRef: React.MutableRefObject<ReactInstance | null>
  handlePrint: UseReactToPrintHookReturn
}

const Context = createContext<PrintProviderData | null>(null)

interface PrintProviderProps {
  children?: ReactNode
}

const PrintProvider = memo(({ children }: PrintProviderProps) => {
  const printableRef = useRef<ReactInstance | null>(null)
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: "cv",
    pageStyle: "html, body { background-color: red; }",
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
