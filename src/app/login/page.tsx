"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState("email")

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/") // Redirect after login
    }, 1500)
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
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Log in to SkillPe</CardTitle>
            <CardDescription>Access your account and find jobs that match your skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={loginMethod} onValueChange={setLoginMethod}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleLogin}>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                      </>
                    ) : (
        
                                    <Link href="/dashboard" className="font-medium text-primary hover:underline">

                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="google">
                <div className="text-center py-8">
                  <Button variant="outline" className="w-full" onClick={handleLogin}>
                    Sign in with Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="linkedin">
                <div className="text-center py-8">
                  <Button variant="outline" className="w-full" onClick={handleLogin}>
                    Sign in with LinkedIn
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              Don't have an account? {" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
