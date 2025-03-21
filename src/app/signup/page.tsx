"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Award, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResumeUploader } from "@/components/signup/resume-uploader"
import { ProfileForm } from "@/components/signup/profile-form"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [signupMethod, setSignupMethod] = useState("email")

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (step < 3) {
        setStep(step + 1)
      } else {
        // Redirect to dashboard after signup
        router.push("/")
      }
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      const response = await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
      })
      
      if (response.status === 200) {
        router.push('/')
      }
    } catch (error) {
      console.error('Signup failed:', error)
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
    */
  }

  const handleResumeUpload = (file) => {
    setIsLoading(true)

    // Simulate API call for resume parsing
    setTimeout(() => {
      setIsLoading(false)
      setResumeUploaded(true)
      setStep(3)
    }, 2000)

    // Actual API call would look like this:
    /*
    const formData = new FormData()
    formData.append('resume', file)
    
    try {
      const response = await axios.post('/api/resume/parse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.status === 200) {
        setResumeData(response.data)
        setResumeUploaded(true)
        setStep(3)
      }
    } catch (error) {
      console.error('Resume upload failed:', error)
      setError('Resume upload failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
    */
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              SkillPe
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Join SkillPe to find jobs that match your skills and expertise.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="text-sm mt-2">
                      {stepNumber === 1 ? "Account" : stepNumber === 2 ? "Resume" : "Profile"}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step - 1) * 50}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Tabs defaultValue={signupMethod} onValueChange={setSignupMethod}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="google">Google</TabsTrigger>
                    <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                  </TabsList>

                  <TabsContent value="email">
                    <form onSubmit={handleSignup}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" placeholder="Doe" required />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" required />
                      </div>

                      <div className="space-y-2 mb-6">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="google">
                    <div className="text-center py-8">
                      <Button variant="outline" className="w-full" onClick={handleSignup}>
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
                          className="h-5 w-5 mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                        Sign up with Google
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="linkedin">
                    <div className="text-center py-8">
                      <Button variant="outline" className="w-full" onClick={handleSignup}>
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
                          className="h-5 w-5 mr-2"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        Sign up with LinkedIn
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Log in
                  </Link>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium">Upload your resume</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll extract your information to create your profile automatically.
                  </p>
                </div>

                <ResumeUploader onUpload={handleResumeUpload} isLoading={isLoading} />

                <div className="mt-6 flex items-center">
                  <Separator className="flex-1" />
                  <span className="mx-4 text-sm text-muted-foreground">or</span>
                  <Separator className="flex-1" />
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Skip and fill manually
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <ProfileForm resumeUploaded={resumeUploaded} onSubmit={handleSignup} isLoading={isLoading} />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

