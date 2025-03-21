"use client"
import {useRouter} from 'next/navigation';
import { useState } from "react"
import Link from 'next/link'
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Clock,
  ChevronDown,
  Star,
  CheckCircle,
  Code,
  FileText,
  MessageSquare,
  Timer,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import AssessmentInterface from "@/components/AssessmentsInterface"

const assessments = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "45 minutes",
    questions: 30,
    credits: 15,
    completed: true,
    score: 92,
    trustScore: 97,
    icon: Code,
  },
  {
    id: 2,
    title: "React Advanced Concepts",
    category: "Programming",
    difficulty: "Advanced",
    duration: "60 minutes",
    questions: 25,
    credits: 25,
    completed: true,
    score: 88,
    trustScore: 95,
    icon: Code,
  },
  {
    id: 3,
    title: "Node.js Essentials",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "50 minutes",
    questions: 35,
    credits: 20,
    completed: false,
    icon: Code,
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    category: "Design",
    difficulty: "Beginner",
    duration: "40 minutes",
    questions: 25,
    credits: 15,
    completed: false,
    icon: FileText,
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    category: "Programming",
    difficulty: "Advanced",
    duration: "90 minutes",
    questions: 40,
    credits: 30,
    completed: false,
    icon: Code,
  },
  {
    id: 6,
    title: "Technical Writing",
    category: "Communication",
    difficulty: "Intermediate",
    duration: "45 minutes",
    questions: 20,
    credits: 15,
    completed: false,
    icon: FileText,
  },
  {
    id: 7,
    title: "SQL Database Design",
    category: "Database",
    difficulty: "Intermediate",
    duration: "60 minutes",
    questions: 30,
    credits: 20,
    completed: false,
    icon: Code,
  },
  {
    id: 8,
    title: "Communication Skills",
    category: "Soft Skills",
    difficulty: "Beginner",
    duration: "30 minutes",
    questions: 25,
    credits: 10,
    completed: false,
    icon: MessageSquare,
  },
]

export default function AssessmentsPage() {
  const router=useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  
  const handleStartAssessment = () => {
    if (selectedAssessment) {
      const encodedTitle = encodeURIComponent(selectedAssessment.title)
      router.push(`/quiz?title=${encodedTitle}`)
    }
    setSelectedAssessment(null)
    setAssessmentStarted(true)
  }

  const handleCloseAssessment = () => {
    setAssessmentStarted(false)
  }

  if (assessmentStarted) {
    return <AssessmentInterface onClose={handleCloseAssessment} />
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Skill Assessments</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search assessments by skill, category..." className="pl-10" />
        </div>

        <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Difficulty</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Duration</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="short">Under 30 minutes</SelectItem>
                      <SelectItem value="medium">30-60 minutes</SelectItem>
                      <SelectItem value="long">Over 60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={() => setSelectedAssessment(assessment)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments
              .filter((a) => !a.completed)
              .slice(0, 6)
              .map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onClick={() => setSelectedAssessment(assessment)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments
              .filter((a) => a.completed)
              .map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onClick={() => setSelectedAssessment(assessment)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>{selectedAssessment?.title}</DialogDescription>
          </DialogHeader>

          {selectedAssessment && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <selectedAssessment.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedAssessment.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAssessment.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div className="font-medium">{selectedAssessment.difficulty}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{selectedAssessment.duration}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div className="font-medium">{selectedAssessment.questions}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Credits Reward</div>
                  <div className="font-medium">{selectedAssessment.credits} credits</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Assessment Format</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">Multiple choice questions</li>
                  <li className="text-sm">Short answer questions</li>
                  {selectedAssessment.category === "Programming" && (
                    <li className="text-sm">Coding challenges with live editor</li>
                  )}
                  <li className="text-sm">Proctored assessment with trust score</li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Time Commitment</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Once started, you must complete the assessment in one sitting. Make sure you have{" "}
                      {selectedAssessment.duration} of uninterrupted time.
                    </p>
                  </div>
                </div>
              </div>

              {selectedAssessment.completed ? (
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-600 dark:text-green-400" />
                  <h4 className="font-medium mt-2 text-green-800 dark:text-green-300">Assessment Completed</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-xs text-green-700 dark:text-green-400">Skill Score</p>
                      <p className="font-medium text-green-800 dark:text-green-300">{selectedAssessment.score}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 dark:text-green-400">Trust Score</p>
                      <p className="font-medium text-green-800 dark:text-green-300">{selectedAssessment.trustScore}%</p>
                    </div>
                  </div>
                  <Button className="mt-3" variant="outline">
                    View Results
                  </Button>
                </div>
              ) : (
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleStartAssessment}>Start Assessment</Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AssessmentCard({ assessment, onClick }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="cursor-pointer h-full" onClick={onClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-md">
              <assessment.icon className="h-6 w-6 text-primary" />
            </div>
            {assessment.completed && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
            )}
          </div>
          <CardTitle className="mt-4">{assessment.title}</CardTitle>
          <CardDescription>{assessment.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{assessment.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{assessment.duration}</span>
            </div>
          </div>

          {assessment.completed ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Score</span>
                <span className="text-sm font-medium">{assessment.score}%</span>
              </div>
              <Progress value={assessment.score} className="h-2" />
            </div>
          ) : (
            <Badge variant="outline" className="w-full justify-center">
              Earn {assessment.credits} credits
            </Badge>
          )}
        </CardContent>
        <CardFooter>
          {/* <Link href='/quiz'> */}
          <Button variant="outline" className="w-full">
            {assessment.completed ? "View Results" : "Take Assessment"}
          </Button>
          {/* </Link> */}
        </CardFooter>
      </Card>
    </motion.div>
  )
}