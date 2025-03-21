import type React from "react"
import type { Metadata } from "next"
import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "SkillPe Recruiter - Talent Acquisition Platform",
  description: "Recruiter dashboard for the SkillPe platform",
}

export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen">
      <RecruiterSidebar />
      <main className="flex-1 overflow-auto">
        {children}
        <Toaster />
      </main>
    </div>
  )
}

