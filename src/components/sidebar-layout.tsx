"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Hide sidebar for homepage and signup page
  const hideSidebar = pathname === "/" || pathname === "/signup" || pathname === "/login"

  return (
    <div className="flex h-screen">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
