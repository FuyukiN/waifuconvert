import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WaifuConvert - Gothic Anime Video to MP3 & MP4 Converter",
  description:
    "Convert videos from YouTube, TikTok, Instagram, Twitter, Reddit, and Facebook to MP3 or MP4. Fast, free, ad-free with gothic anime aesthetics and customizable logo.",
  keywords: "video converter, MP3, MP4, YouTube, TikTok, Instagram, gothic, anime, dark theme, light theme, waifu",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
