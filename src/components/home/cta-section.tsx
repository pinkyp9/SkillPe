"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 p-8 md:p-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your perfect job match?</h2>
              <p className="mt-4 text-lg text-white/80">
                Sign up today and get 100 free credits to start applying for jobs that match your skills.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
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
                      className="h-6 w-6"
                    >
                      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                      <line x1="18" x2="12" y1="9" y2="15" />
                      <line x1="12" x2="18" y1="9" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Free Plan</h3>
                    <p className="text-white/80">100 credits on signup</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Access to all skill assessments</span>
                  </li>
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Job matching based on skills</span>
                  </li>
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Participate in challenges</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
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
                      className="h-6 w-6"
                    >
                      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Premium Plan</h3>
                    <p className="text-white/80">$9.99/month</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>All free features</span>
                  </li>
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>500 additional credits monthly</span>
                  </li>
                  <li className="flex items-center gap-2">
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
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Priority application processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

