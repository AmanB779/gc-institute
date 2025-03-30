import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata = {
  title: "Excel Academy - Leading Coaching Institute for JEE, NEET & Foundation Courses",
  description:
    "Excel Academy is a premier coaching institute offering comprehensive preparation for JEE, NEET, and Foundation courses with expert faculty and proven results.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="custom-cursor">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script id="reveal-animation">
          {`
            function reveal() {
              var reveals = document.querySelectorAll(".reveal");
              for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                  reveals[i].classList.add("active");
                }
              }
            }
            
            window.addEventListener("scroll", reveal);
            reveal();
          `}
        </Script>
      </body>
    </html>
  )
}



import './globals.css'