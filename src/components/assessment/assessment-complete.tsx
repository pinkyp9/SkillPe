"use client"

import { motion } from "framer-motion"
import { CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AssessmentComplete({ score, trustScore, creditsEarned, onFinish }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Assessment Completed!</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Congratulations on completing the assessment. Here's how you did.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Score</CardTitle>
                <CardDescription>Your assessment score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{score}%</div>
                <Progress value={score} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trust Score</CardTitle>
                <CardDescription>Proctoring evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{trustScore}%</div>
                <Progress value={trustScore} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Credits Earned</CardTitle>
                <CardDescription>Added to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{creditsEarned}</div>
                <div className="flex items-center justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(score / 20) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Skills Verified</CardTitle>
              <CardDescription>These skills have been added to your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">JavaScript</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">ES6+</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Data Types</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Functions</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Problem Solving</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onFinish}>
              Back to Assessments
            </Button>
            <Button size="lg" variant="outline">
              View Detailed Results
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

