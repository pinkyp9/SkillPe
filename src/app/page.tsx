import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/home/hero-section"
import { FeatureSection } from "@/components/home/feature-section"
import { TestimonialSection } from "@/components/home/testimonial-section"
import { CTASection } from "@/components/home/cta-section"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6 sm:px-6 md:py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-md">
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
                <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
                  SkillPe
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                A job platform focused on skills, not resumes. Find the perfect job based on your skills and expertise.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Subscribe to our newsletter</h3>
              <p className="mt-4 text-sm text-muted-foreground">Get the latest news and updates from SkillPe.</p>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SkillPe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

