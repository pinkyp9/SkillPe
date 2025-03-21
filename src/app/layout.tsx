import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarLayout } from "../components/sidebar-layout" // Import new client component
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkillPe - A Job Platform Focused on Skills",
  description: "A Job Platform Focused on Skills, Not Resumes",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Move sidebar logic to a client component */}
          <SidebarLayout>{children}</SidebarLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
