// Theme configuration with three distinct themes
export type ThemeColor = {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

export type Theme = {
  name: string
  colors: ThemeColor
  description: string
}

export const themes: Theme[] = [
  {
    name: "default",
    description: "Modern purple and pink theme",
    colors: {
      primary: "265 89% 60%", // Vibrant purple
      secondary: "335 78% 58%", // Bright pink
      accent: "190 95% 50%", // Electric blue
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      border: "240 5.9% 90%",
    },
  },
  {
    name: "emerald",
    description: "Fresh green and teal theme",
    colors: {
      primary: "160 84% 39%", // Emerald green
      secondary: "175 84% 32%", // Teal
      accent: "43 96% 58%", // Amber
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      muted: "166 63% 96%",
      border: "172 32% 90%",
    },
  },
  {
    name: "royal",
    description: "Elegant blue and gold theme",
    colors: {
      primary: "224 76% 48%", // Royal blue
      secondary: "47 100% 50%", // Gold
      accent: "262 83% 58%", // Purple
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      muted: "225 60% 96%",
      border: "226 27% 90%",
    },
  },
]

export const darkThemeColors = {
  background: "240 10% 3.9%",
  foreground: "0 0% 98%",
  muted: "240 3.7% 15.9%",
  border: "240 3.7% 15.9%",
}

