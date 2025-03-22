"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrustScoreIndicator } from "@/components/assessment/trust-score-indicator"
import { Timer } from "@/components/assessment/timer"
import { useSearchParams } from "next/navigation"

export default function QuizPage() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [trustScore, setTrustScore] = useState(100)
  const [warnings, setWarnings] = useState([])
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(60 * 10)
  const [showSubmit, setShowSubmit] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showWarnings, setShowWarnings] = useState(true)

  const router = useRouter()

  useEffect(() => {
    fetch("/api/skillsmcq", {
      method: "POST",
      body: JSON.stringify({ skill: title }), // Replace with dynamic skill if needed
    })
      .then(res => res.json())
      .then(data => setQuestions(data.questions || []))
  }, [])

  useEffect(() => {
    const handler = () => {
      setTrustScore(prev => Math.max(prev - 10, 0))
      setWarnings(prev => [
        ...prev,
        { id: Date.now(), message: "Tab switch detected", time: new Date().toLocaleTimeString() },
      ])
    }
    const handleVisibility = () => {
      if (document.hidden) handler()
    }

    window.addEventListener("blur", handler)
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("blur", handler)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  useEffect(() => {
    if (timeRemaining <= 0 && !isCompleted) handleSubmit()
    const timer = setTimeout(() => setTimeRemaining(t => t - 1), 500)
    return () => clearTimeout(timer)
  }, [timeRemaining, isCompleted])

  const question = questions[current]
  const progress = questions.length ? Math.round((current / questions.length) * 100) : 0

  const handleAnswer = value => {
    setAnswers({ ...answers, [question.question]: value })
  }

  const handleSubmit = () => {
    setIsCompleted(true)
  }

  const score = questions.filter(q => answers[q.question] === q.correct).length
  if (showWarnings) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl bg-card rounded-lg border p-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold">Before You Start</h2>
          <ul className="text-left list-disc pl-5 text-sm space-y-2 text-muted-foreground">
            <li>This is a proctored quiz. Webcam and tab monitoring are active.</li>
            <li>Do not switch tabs or minimize the window — this will reduce your trust score.</li>
            <li>Stay in fullscreen. Leaving fullscreen may be considered suspicious behavior.</li>
            <li>Complete the quiz in one sitting. Timer does not stop.</li>
          </ul>
          <Button onClick={() => {
            setShowWarnings(false)
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen()
            }
          }}>
            I Understand, Start Quiz
          </Button>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20 p-6 border rounded-lg bg-card">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete</h2>
        <p className="mb-2">Score: {score} / {questions.length}</p>
        <p className="mb-4">Trust Score: {trustScore}%</p>
        <Button onClick={() => router.push("/assessments")}>Back to Assessments</Button>
      </div>
    )
  }
  
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-6 py-4 z-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Button size="icon" variant="ghost" onClick={() => setShowSubmit(true)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Proctored Quiz</h1>
            <Badge variant="outline">{current + 1} / {questions.length}</Badge>
          </div>
          <div className="flex gap-4 items-center">
            <TrustScoreIndicator score={trustScore} />
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <Timer timeRemaining={timeRemaining} />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsWebcamEnabled(!isWebcamEnabled)}>
              {isWebcamEnabled ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 px-6 py-8 container">
        {questions.length > 0 ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            <Progress value={progress} className="h-2 mb-4" />

            <div className="space-y-4">
              <h2 className="text-lg font-medium">{question?.question}</h2>
              <RadioGroup value={answers[question.question] || ""} onValueChange={handleAnswer}>
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} className="peer" />
                    <Label
                      htmlFor={key}
                      className="flex-1 p-3 rounded-lg border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted cursor-pointer"
                    >
                      {key}. {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
                Previous
              </Button>
              <Button onClick={() => current === questions.length - 1 ? setShowSubmit(true) : setCurrent(c => c + 1)}>
                {current === questions.length - 1 ? "Submit Quiz" : "Next"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-20">Generating questions for you...</p>
        )}
      </main>

      {/* Submit Dialog */}
      <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">Questions answered: {Object.keys(answers).length} / {questions.length}</p>
            <p>Trust Score: {trustScore}%</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmit(false)}>Continue</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}