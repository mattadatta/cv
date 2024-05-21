import { memo } from "react";

export interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}

const Button = memo(({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800"
      onClick={onClick}
    >
      {children}
    </button>
  )
})

export default Button
