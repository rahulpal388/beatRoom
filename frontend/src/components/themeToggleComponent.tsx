import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";



export function ThemeToggleComponent() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return <>
        <button
            onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
            }
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white cursor-pointer"
        >
            {currentTheme === "dark" ? <Sun /> : <Moon />}
        </button>
    </>



}