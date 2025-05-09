import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import MobileNav from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

// Add viewport meta tag to ensure proper mobile rendering
export const metadata = {
  title: "Lokhith Aswa A | Portfolio",
  description: "Personal portfolio website of Lokhith Aswa A",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* Star Background */}
          <StarBackground />

          <Navbar />
          <main className="flex-grow relative z-10 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
