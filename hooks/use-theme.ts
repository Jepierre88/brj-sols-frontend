import { useEffect, useState } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        setTheme(theme as "light" | "dark")
    }, [])

    return { theme, setTheme }
}
