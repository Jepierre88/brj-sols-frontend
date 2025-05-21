'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        // Detectar el tema del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // Función para actualizar el tema
        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            setTheme(e.matches ? 'dark' : 'light')
            document.documentElement.classList.toggle('dark', e.matches)
        }

        // Establecer el tema inicial
        updateTheme(mediaQuery)

        // Escuchar cambios en el tema del sistema
        mediaQuery.addEventListener('change', updateTheme)

        return () => mediaQuery.removeEventListener('change', updateTheme)
    }, [])

    return (
        <SessionProvider>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        </SessionProvider>
    )
} 