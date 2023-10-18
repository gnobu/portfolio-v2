import { createContext, useEffect, useState } from "react"

type Theme = 'light' | 'dark'
export const ThemeContext = createContext<{
    theme: Theme | null,
    setTheme: React.Dispatch<React.SetStateAction<Theme | null>>,
}>({
    theme: null,
    setTheme: () => { }
})
export default function useTheme() {
    const [theme, setTheme] = useState<Theme | null>(null)

    useEffect(() => {
        setTheme(localStorage.getItem('theme') as Theme | null)

        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        function setDefaultTheme() {
            if (!localStorage.getItem('theme')) {
                const defaultTheme = mq.matches ? 'dark' : 'light'
                document.body.setAttribute('data-theme', defaultTheme)
            }
        }
        setDefaultTheme()
        mq.addEventListener('change', setDefaultTheme)
        return () => { mq.removeEventListener('change', setDefaultTheme) }
    }, [])

    useEffect(() => {
        if (theme) {
            document.body.setAttribute('data-theme', theme)
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    return { theme, setTheme } as const
}