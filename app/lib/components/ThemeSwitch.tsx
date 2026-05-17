"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export default function ThemeSwitch() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button 
            className="flex items-center justify-center fixed right-3 bottom-3 w-10 h-10 bg-theme-switch border-2 border-gray-400 rounded-full cursor-pointer"
            onClick={() => (setTheme(theme === "dark" ? "light" : "dark"))}
        >
            {
                theme === "dark" ? <Sun /> : <Moon />
            }
        </button>
    )
}