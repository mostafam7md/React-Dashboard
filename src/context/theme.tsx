import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeCtx = { theme: Theme; toggle: () => void; set: (t: Theme) => void }
const ThemeContext = createContext<ThemeCtx | null>(null)
const STORAGE_KEY = 'theme_v1'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) || null
    const prefDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(saved ?? (prefDark ? 'dark' : 'dark'))
  }, [])
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])
  const value: ThemeCtx = { theme, toggle: () => setTheme((t)=> t === 'dark' ? 'light' : 'dark'), set: (t)=> setTheme(t) }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export function useTheme(){ const ctx = useContext(ThemeContext); if(!ctx) throw new Error('useTheme must be used within ThemeProvider'); return ctx }
