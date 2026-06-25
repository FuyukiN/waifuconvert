"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        !mounted
          ? "Alternar tema"
          : isDark
            ? "Ativar modo claro"
            : "Ativar modo escuro"
      }
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/60 text-primary transition-colors hover:bg-secondary"
    >
      {mounted ? (
        isDark ? <Sun size={16} /> : <Moon size={16} />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
