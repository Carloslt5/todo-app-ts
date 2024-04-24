import { ReactNode, createContext, useState } from 'react'

export interface ThemeContextType {
  darkMode: boolean
  toggleThemeHandler:VoidFunction
}

const initialThemeMode = localStorage.getItem('theme') === 'dark'

export const ThemeContext = createContext<ThemeContextType | null>(null)
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(initialThemeMode)

  const toggleThemeHandler = () => {
    setDarkMode(!darkMode)
  }

  const value = { darkMode, toggleThemeHandler }

  return (
    <ThemeContext.Provider value={value}>
    {children}
    </ThemeContext.Provider>
  )
}

