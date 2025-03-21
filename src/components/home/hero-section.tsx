"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-transparent bg-clip-text">
              Find Jobs Based on Your Skills
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              SkillPe is a job platform that focuses on your skills, not just your resume. Take assessments, build your
              profile, and find the perfect job match.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="inline-block h-8 w-8 rounded-full border-2 border-background bg-primary/10"></div>
                <div className="inline-block h-8 w-8 rounded-full border-2 border-background bg-primary/20"></div>
                <div className="inline-block h-8 w-8 rounded-full border-2 border-background bg-primary/30"></div>
                <div className="inline-block h-8 w-8 rounded-full border-2 border-background bg-primary/40"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">5,000+</span> job seekers
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M12 2v2" />
                      <path d="M12 22v-2" />
                      <path d="m17 20.66-1-1.73" />
                      <path d="M11 10.27 7 3.34" />
                      <path d="m20.66 17-1.73-1" />
                      <path d="m3.34 7 1.73 1" />
                      <path d="M14 12h8" />
                      <path d="M2 12h2" />
                      <path d="m20.66 7-1.73 1" />
                      <path d="m3.34 17 1.73-1" />
                      <path d="m17 3.34-1 1.73" />
                      <path d="m11 13.73-4 6.93" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Your Skill Profile</h3>
                    <p className="text-sm text-muted-foreground">92% Complete</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">JavaScript</div>
                      <div className="text-sm font-medium">92%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">React</div>
                      <div className="text-sm font-medium">88%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Node.js</div>
                      <div className="text-sm font-medium">76%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary/10">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "76%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
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
                          className="h-5 w-5 text-primary"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M7 7h10" />
                          <path d="M7 12h10" />
                          <path d="M7 17h10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Senior Frontend Developer</h4>
                        <p className="text-xs text-muted-foreground">TechCorp</p>
                      </div>
                      <div className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        92% Match
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-accent/20 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7c3aed_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#7c3aed_100%)] opacity-30"></div>
    </section>
  )
}

