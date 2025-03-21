"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CodeEditor } from "@/components/assessment/code-editor"
import { TestResults } from "@/components/assessment/test-results"
import { TrustScoreIndicator } from "@/components/assessment/trust-score-indicator"
import { Timer } from "@/components/assessment/timer"
import { AssessmentComplete } from "@/components/assessment/assessment-complete"

// Mock assessment data
const assessmentData = {
  id: 1,
  title: "JavaScript Fundamentals",
  category: "Programming",
  difficulty: "Intermediate",
  duration: 45, // in minutes
  totalQuestions: 15,
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["String", "Number", "Boolean", "Object"],
      correctAnswer: "Object",
      explanation:
        "Object is a non-primitive data type in JavaScript. The primitive data types are String, Number, Boolean, Null, Undefined, Symbol, and BigInt.",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What will be the output of the following code?\n\nconsole.log(typeof null);",
      options: ["null", "undefined", "object", "number"],
      correctAnswer: "object",
      explanation: "In JavaScript, typeof null returns 'object', which is considered a bug in the language.",
    },
    {
      id: 3,
      type: "short-answer",
      question: "Explain the difference between '==' and '===' operators in JavaScript.",
      correctAnswer:
        "The == operator performs type coercion before comparison, while === compares both value and type without coercion.",
      explanation:
        "The == (loose equality) operator compares values after converting them to a common type, while === (strict equality) compares both values and types without any type conversion.",
    },
    {
      id: 4,
      type: "coding",
      question: "Write a function that reverses a string without using the built-in reverse() method.",
      starterCode:
        "function reverseString(str) {\n  // Your code here\n}\n\n// Example usage:\n// reverseString('hello') should return 'olleh'",
      testCases: [
        { input: "hello", expected: "olleh" },
        { input: "JavaScript", expected: "tpircSavaJ" },
        { input: "12345", expected: "54321" },
      ],
      solution:
        "function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}",
      explanation:
        "This solution iterates through the string from the end to the beginning, building a new string character by character.",
    },
    {
      id: 5,
      type: "coding",
      question:
        "Write a function that checks if a given string is a palindrome (reads the same forward and backward, ignoring spaces, punctuation, and capitalization).",
      starterCode:
        "function isPalindrome(str) {\n  // Your code here\n}\n\n// Example usage:\n// isPalindrome('A man, a plan, a canal: Panama') should return true",
      testCases: [
        { input: "A man, a plan, a canal: Panama", expected: true },
        { input: "race a car", expected: false },
        { input: "Was it a car or a cat I saw?", expected: true },
      ],
      solution:
        "function isPalindrome(str) {\n  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const reversed = cleanStr.split('').reverse().join('');\n  return cleanStr === reversed;\n}",
      explanation:
        "This solution first cleans the string by removing non-alphanumeric characters and converting to lowercase, then checks if the cleaned string is equal to its reverse.",
    },
  ],
}

export default function AssessmentPage({ params }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(assessmentData.duration * 60) // in seconds
  const [trustScore, setTrustScore] = useState(100)
  const [proctorWarnings, setProctorWarnings] = useState([])
  const [isProctorDialogOpen, setIsProctorDialogOpen] = useState(false)
  const [testResults, setTestResults] = useState({})
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true)

  // Calculate progress
  const progress = Math.round((currentQuestion / assessmentData.questions.length) * 100)

  // Current question data
  const question = assessmentData.questions[currentQuestion]

  // Handle answer change
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [question.id]: value,
    })
  }

  // Handle code change for coding questions
  const handleCodeChange = (code) => {
    setAnswers({
      ...answers,
      [question.id]: code,
    })
  }

  // Run tests for coding questions
  const runTests = () => {
    // Simulate test running
    setTestResults({
      ...testResults,
      [question.id]: {
        running: true,
        results: [],
      },
    })

    setTimeout(() => {
      // Simulate test results
      const results = question.testCases.map((testCase, index) => {
        const passed = index < 2 // Simulate first two tests passing
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: passed ? testCase.expected : "different result",
          passed,
        }
      })

      setTestResults({
        ...testResults,
        [question.id]: {
          running: false,
          results,
        },
      })
    }, 1500)
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < assessmentData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowConfirmSubmit(true)
    }
  }

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  // Submit assessment
  const submitAssessment = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsCompleted(true)
    }, 2000)

    // Actual API call would look like this:
    /*
    try {
      const response = await axios.post(`/api/assessments/${assessmentData.id}/submit`, {
        answers,
        trustScore
      })
      
      if (response.status === 200) {
        setIsCompleted(true)
      }
    } catch (error) {
      console.error('Assessment submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  // Simulate proctor warnings
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to trigger a warning
      if (Math.random() < 0.05 && !isCompleted) {
        const warnings = [
          "Multiple faces detected in the frame",
          "Face not visible in the frame",
          "Looking away from the screen",
          "Background noise detected",
          "Suspicious movement detected",
        ]

        const newWarning = {
          id: Date.now(),
          message: warnings[Math.floor(Math.random() * warnings.length)],
          timestamp: new Date().toLocaleTimeString(),
        }

        setProctorWarnings((prev) => [...prev, newWarning])
        setTrustScore((prev) => Math.max(prev - 5, 0))
        setIsProctorDialogOpen(true)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [isCompleted])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || isCompleted) return

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeRemaining, isCompleted])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining <= 0 && !isCompleted) {
      submitAssessment()
    }
  }, [timeRemaining, isCompleted])

  // If assessment is completed, show results
  if (isCompleted) {
    return (
      <AssessmentComplete
        score={85}
        trustScore={trustScore}
        creditsEarned={15}
        onFinish={() => router.push("/assessments")}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setShowConfirmSubmit(true)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-medium">{assessmentData.title}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{assessmentData.category}</Badge>
                <Badge variant="outline">{assessmentData.difficulty}</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TrustScoreIndicator score={trustScore} />

            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <Timer timeRemaining={timeRemaining} />
            </div>

            <Button variant="ghost" size="icon" onClick={() => setIsWebcamEnabled(!isWebcamEnabled)}>
              {isWebcamEnabled ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-2" />
            <span className="text-sm font-medium">
              {currentQuestion + 1}/{assessmentData.questions.length}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Question {currentQuestion + 1}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {question.type === "multiple-choice"
                        ? "Multiple Choice"
                        : question.type === "short-answer"
                          ? "Short Answer"
                          : "Coding Challenge"}
                    </Badge>
                  </div>

                  <div className="text-lg font-medium">
                    {question.question.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>

                {question.type === "multiple-choice" && (
                  <div className="space-y-4">
                    <RadioGroup value={answers[question.id] || ""} onValueChange={handleAnswerChange}>
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${index}`} className="peer" />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 p-3 rounded-lg border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {question.type === "short-answer" && (
                  <div className="space-y-4">
                    <Textarea
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Type your answer here..."
                      className="min-h-[150px]"
                    />
                  </div>
                )}

                {question.type === "coding" && (
                  <div className="space-y-4">
                    <Tabs defaultValue="code">
                      <TabsList>
                        <TabsTrigger value="code">Code</TabsTrigger>
                        <TabsTrigger value="tests">Tests</TabsTrigger>
                      </TabsList>
                      <TabsContent value="code" className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="typescript">TypeScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button onClick={runTests}>Run Tests</Button>
                        </div>

                        <CodeEditor
                          code={answers[question.id] || question.starterCode}
                          language={selectedLanguage}
                          onChange={handleCodeChange}
                        />
                      </TabsContent>
                      <TabsContent value="tests">
                        <TestResults
                          testCases={question.testCases}
                          results={testResults[question.id]?.results || []}
                          isRunning={testResults[question.id]?.running || false}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <h3 className="font-medium mb-2">Explanation</h3>
                    <p>{question.explanation}</p>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <Button onClick={nextQuestion}>
                    {currentQuestion < assessmentData.questions.length - 1 ? (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Submit Assessment"
                    )}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-medium mb-4">Question Navigator</h3>
                <div className="grid grid-cols-5 gap-2">
                  {assessmentData.questions.map((q, index) => (
                    <Button
                      key={index}
                      variant={currentQuestion === index ? "default" : answers[q.id] ? "outline" : "ghost"}
                      className="h-10 w-10 p-0"
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {isWebcamEnabled && (
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Proctoring</h3>
                    <Badge
                      variant="outline"
                      className={
                        trustScore > 80
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : trustScore > 50
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      Trust Score: {trustScore}%
                    </Badge>
                  </div>

                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-primary/10 p-2 rounded-full inline-flex mb-2">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Webcam feed active</p>
                    </div>
                  </div>

                  {proctorWarnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recent Warnings</h4>
                      <div className="max-h-[150px] overflow-y-auto space-y-2">
                        {proctorWarnings.slice(-3).map((warning) => (
                          <div
                            key={warning.id}
                            className="text-xs p-2 bg-yellow-100 dark:bg-yellow-900 rounded flex items-start gap-2"
                          >
                            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                            <div>
                              <p className="text-yellow-800 dark:text-yellow-300">{warning.message}</p>
                              <p className="text-yellow-600 dark:text-yellow-400">{warning.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Submit Dialog */}
      <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assessment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your assessment? You won't be able to change your answers after
              submission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span>Questions Answered:</span>
              <Badge variant="outline">
                {Object.keys(answers).length}/{assessmentData.questions.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Trust Score:</span>
              <Badge variant={trustScore > 80 ? "success" : trustScore > 50 ? "warning" : "destructive"}>
                {trustScore}%
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
              Continue Assessment
            </Button>
            <Button onClick={submitAssessment} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Assessment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Proctor Warning Dialog */}
      <Dialog open={isProctorDialogOpen} onOpenChange={setIsProctorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="h-5 w-5" />
              Proctor Warning
            </DialogTitle>
            <DialogDescription>A potential issue has been detected by our proctoring system.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {proctorWarnings.length > 0 && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  {proctorWarnings[proctorWarnings.length - 1].message}
                </p>
                <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                  This warning has affected your trust score. Please ensure you're following the assessment guidelines.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsProctorDialogOpen(false)}>Acknowledge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

