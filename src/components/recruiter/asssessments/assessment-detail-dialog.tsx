"use client"

import { useState } from "react"
import { Loader2, CheckCircle, XCircle, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for candidates who took the assessment
const candidateResults = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    score: 85,
    timeTaken: 38, // minutes
    completedAt: "2023-05-18T14:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    score: 92,
    timeTaken: 42,
    completedAt: "2023-05-17T10:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    score: 68,
    timeTaken: 45,
    completedAt: "2023-05-16T16:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    score: 75,
    timeTaken: 35,
    completedAt: "2023-05-15T11:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    score: 62,
    timeTaken: 40,
    completedAt: "2023-05-14T09:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AssessmentDetailDialog({ open, onOpenChange, assessment }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleStatusChange = () => {
    setIsDeactivating(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeactivating(false)
      onOpenChange(false)
      // Show success toast or notification here
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.patch(`/api/recruiter/assessments/${assessment.id}/status`, {
        status: assessment.status === 'active' ? 'inactive' : 'active'
      })
      
      onOpenChange(false)
      // Show success toast
    } catch (error) {
      console.error('Failed to update assessment status:', error)
      // Show error toast
    } finally {
      setIsDeactivating(false)
    }
    */
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      onOpenChange(false)
      // Show success toast or notification here
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.delete(`/api/recruiter/assessments/${assessment.id}`)
      
      setIsDeleteDialogOpen(false)
      onOpenChange(false)
      // Show success toast
    } catch (error) {
      console.error('Failed to delete assessment:', error)
      // Show error toast
    } finally {
      setIsDeleting(false)
    }
    */
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>{assessment.title}</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Job Title</div>
                        <div className="font-medium">{assessment.jobTitle}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium">{assessment.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Difficulty</div>
                        <div className="font-medium">{assessment.difficulty}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{assessment.duration} minutes</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Questions</div>
                        <div className="font-medium">{assessment.questions}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Passing Score</div>
                        <div className="font-medium">{assessment.passingScore}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge
                          className={
                            assessment.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                          }
                        >
                          {assessment.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Created</div>
                        <div className="font-medium">{new Date(assessment.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>Total Completions</span>
                      </div>
                      <Badge variant="outline" className="text-lg">
                        {assessment.completions}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Average Score</span>
                        <span className="text-sm font-medium">{assessment.avgScore}%</span>
                      </div>
                      <Progress
                        value={assessment.avgScore}
                        className={`h-2 ${
                          assessment.avgScore >= assessment.passingScore
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-red-100 dark:bg-red-900"
                        }`}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">0%</span>
                        <span className="text-xs text-muted-foreground">
                          Passing: {assessment.passingScore}%
                        </span>
                        <span className="text-xs text-muted-foreground">100%</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-2">Pass/Fail Rate</h4>
                      <div className="flex h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500 dark:bg-green-600"
                          style={{
                            width: `${
                              assessment.completions > 0
                                ? (assessment.avgScore >= assessment.passingScore
                                    ? assessment.completions * 0.7
                                    : assessment.completions * 0.3) /
                                  assessment.completions *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                        <div
                          className="bg-red-500 dark:bg-red-600"
                          style={{
                            width: `${
                              assessment.completions > 0
                                ? (assessment.avgScore < assessment.passingScore
                                    ? assessment.completions * 0.7
                                    : assessment.completions * 0.3) /
                                  assessment.completions *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs">Pass</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-xs">Fail</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Assessment
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Assessment
                  </Button>
                  <Button onClick={handleStatusChange} disabled={isDeactivating}>
                    {isDeactivating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : assessment.status === "active" ? (
                      <XCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    {assessment.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">
                                {index % 3 === 0
                                  ? "Multiple Choice"
                                  : index % 3 === 1
                                  ? "True/False"
                                  : "Short Answer"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                            </div>
                            <h4 className="font-medium">
                              {index % 3 === 0
                                ? "What is the correct way to declare a variable in JavaScript?"
                                : index % 3 === 1
                                ? "Is JavaScript a compiled language?"
                                : "Explain the concept of closures in JavaScript."\
                            </h4>
                            <div className="mt-2 text-sm">
                              {index % 3 === 0 ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span>let x = 10;</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground" />
                                    <span>variable x = 10;</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground" />
                                    <span>x := 10;</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground" />
                                    <span>int x = 10;</span>
                                  </div>
                                </div>
                              ) : index % 3 === 1 ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground" />
                                    <span>True</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span>False</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="italic text-muted-foreground">Short answer question</div>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Candidate Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Time Taken</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidateResults.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                <AvatarFallback>
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-xs text-muted-foreground">{candidate.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {candidate.score >= assessment.passingScore ? (
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              )}
                              <span>{candidate.score}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{candidate.timeTaken} min</TableCell>
                          <TableCell>{new Date(candidate.completedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                candidate.score >= assessment.passingScore
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }
                            >
                              {candidate.score >= assessment.passingScore ? "Passed" : "Failed"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the assessment "{assessment.title}" and all associated data. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground">
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

