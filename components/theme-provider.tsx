"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { themes, darkThemeColors } from "@/lib/theme-config"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply theme CSS variables when the component mounts
  React.useEffect(() => {
    // Set up theme CSS variables
    themes.forEach((theme) => {
      const themeClass = theme.name === "default" ? ":root" : `.theme-${theme.name}`

      const cssText = `
        ${themeClass} {
          --background: ${theme.colors.background};
          --foreground: ${theme.colors.foreground};
          --card: ${theme.colors.background};
          --card-foreground: ${theme.colors.foreground};
          --popover: ${theme.colors.background};
          --popover-foreground: ${theme.colors.foreground};
          --primary: ${theme.colors.primary};
          --primary-foreground: 0 0% 100%;
          --secondary: ${theme.colors.secondary};
          --secondary-foreground: 0 0% 100%;
          --muted: ${theme.colors.muted};
          --muted-foreground: 240 3.8% 46.1%;
          --accent: ${theme.colors.accent};
          --accent-foreground: 240 5.9% 10%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 98%;
          --border: ${theme.colors.border};
          --input: ${theme.colors.border};
          --ring: ${theme.colors.primary};
          --radius: 1rem;
        }
        
        ${themeClass}.dark {
          --background: ${darkThemeColors.background};
          --foreground: ${darkThemeColors.foreground};
          --card: ${darkThemeColors.background};
          --card-foreground: ${darkThemeColors.foreground};
          --popover: ${darkThemeColors.background};
          --popover-foreground: ${darkThemeColors.foreground};
          --primary: ${theme.colors.primary};
          --primary-foreground: 0 0% 100%;
          --secondary: ${theme.colors.secondary};
          --secondary-foreground: 0 0% 100%;
          --muted: ${darkThemeColors.muted};
          --muted-foreground: 240 5% 64.9%;
          --accent: ${theme.colors.accent};
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: ${darkThemeColors.border};
          --input: ${darkThemeColors.border};
          --ring: ${theme.colors.primary};
        }
      `

      // Add the styles to the document
      const style = document.createElement("style")
      style.textContent = cssText
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    })
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  )
}

