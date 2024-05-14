import { ReactNode, ReactInstance, createContext, memo, useContext, useRef } from "react"
import { useReactToPrint } from "react-to-print"

type UseReactToPrintHookReturn = (event?: unknown, content?: (() => ReactInstance | null)) => void;

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
