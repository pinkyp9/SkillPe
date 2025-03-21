import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkillPe - A Job Platform Focused on Skills",
  description: "A Job Platform Focused on Skills, Not Resumes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen">
            {/* Only show sidebar on authenticated pages */}
            {React.isValidElement(children) && !["/login", "/signup", "/"].includes(children.props?.childProp?.segment) && <Sidebar />}
            <main className="flex-1 overflow-auto">
              <Navbar/>
              {children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'