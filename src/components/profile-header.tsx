"use client"

import { motion } from "framer-motion"
import { Edit, Mail, MapPin, Briefcase, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";

export function ProfileHeader() {
  const [user, setUser] = useState(null);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
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
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-xl relative">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="-mt-12 flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>{user&&user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user&&user.name}</h1>
              <p className="text-muted-foreground">Full Stack Developer</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {user&&user.email}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> San Francisco, CA
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> 3 years experience
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="p-4 rounded-lg bg-primary/5 border"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Score</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2 mt-1" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg bg-primary/5 border"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Credits</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-bold">100</span>
                      <Badge variant="outline" className="text-xs">
                        Available
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg bg-primary/5 border"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Trust Score</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2 mt-1" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Removed local useEffect function

