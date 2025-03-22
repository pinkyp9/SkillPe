"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Briefcase, Award, BookOpen, Trophy, LogOut, User, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components';

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Skill Assessments",
    href: "/assessments",
    icon: Award,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Challenges",
    href: "/challenges",
    icon: Trophy,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(null);
  const isHomepage = pathname === '/'; 

   useEffect(() => {
      if (!isHomepage) {
        const fetchSession = async () => {
          try {
            const res = await fetch('/api/auth/session');
            if (res.ok) {
              const data = await res.json();
              console.log(data);
              setUser(data);
            }
          } catch (err) {
            console.error('Failed to fetch user session', err);
          }
        };
  
        fetchSession();
      }
    }, [isHomepage]);
  
  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={cn(
        "h-screen bg-background border-r border-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-primary/10 p-2 rounded-md">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              SkillPe
            </h1>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="mx-auto bg-primary/10 p-2 rounded-md">
            <Award className="h-6 w-6 text-primary" />
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
      </div>

      <div className="flex flex-col gap-2 px-3 py-2">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGUlMjBzcXVhcmV8ZW58MHx8MHx8fDA%3D" />
              {/* <AvatarFallback>{user&&user.name['0']}</AvatarFallback> */}
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user&&user.name}</p>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-primary/10 hover:bg-primary/20">
                  100 Credits
                </Badge>
              </div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center py-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{user&&user.name['0']}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3 transition-all", isCollapsed ? "px-3" : "px-4")}
                >
                  <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-primary" : "")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center justify-between">
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <LogoutLink>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
          </LogoutLink>
          {!isCollapsed && (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

