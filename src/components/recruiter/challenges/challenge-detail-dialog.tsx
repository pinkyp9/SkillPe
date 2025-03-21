"use client"

import { useState } from "react"
import { Loader2, Trophy, Users, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Mock data for participants
const participants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    registeredAt: "2023-05-18T14:30:00Z",
    status: "registered",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    registeredAt: "2023-05-17T10:15:00Z",
    status: "registered",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    registeredAt: "2023-05-16T16:45:00Z",
    status: "registered",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    registeredAt: "2023-05-15T11:20:00Z",
    status: "registered",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    registeredAt: "2023-05-14T09:30:00Z",
    status: "registered",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function ChallengeDetailDialog({ open, onOpenChange, challenge }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isUpcoming = challenge.status === "upcoming"
  const isActive = challenge.status === "active"
  const isCompleted = challenge.status === "completed"

  const startDate = new Date(challenge.startDate)
  const endDate = new Date(challenge.endDate)
  const registrationDeadline = new Date(challenge.registrationDeadline)
  const now = new Date()

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
      await axios.patch(`/api/recruiter/challenges/${challenge.id}/status`, {
        status: challenge.status === 'active' ? 'inactive' : 'active'
      })
      
      onOpenChange(false)
      // Show success toast
    } catch (error) {
      console.error('Failed to update challenge status:', error)
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
      await axios.delete(`/api/recruiter/challenges/${challenge.id}`)
      
      setIsDeleteDialogOpen(false)
      onOpenChange(false)
      // Show success toast
    } catch (error) {
      console.error('Failed to delete challenge:', error)
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
            <DialogTitle>Challenge Details</DialogTitle>
            <DialogDescription>{challenge.title}</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="participants">
                Participants {isCompleted ? `(${challenge.participants})` : ""}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Challenge Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium">{challenge.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Difficulty</div>
                        <div className="font-medium">{challenge.difficulty}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Registration Deadline</div>
                        <div className="font-medium">{registrationDeadline.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Start Date</div>
                        <div className="font-medium">{startDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">End Date</div>
                        <div className="font-medium">{endDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">
                          {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge
                          className={
                            isUpcoming
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                          }
                        >
                          {isUpcoming ? "Upcoming" : isActive ? "Active" : "Completed"}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Created</div>
                        <div className="font-medium">{new Date(challenge.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Description</div>
                      <div className="text-sm">{challenge.description}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prizes & Participation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Prizes</div>
                      <div className="space-y-2">
                        {challenge.prizes.map((prize, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-primary" />
                            <div className="font-medium">
                              {index + 1}
                              {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Place: {prize}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>Participants</span>
                        </div>
                        <Badge variant="outline" className="text-lg">
                          {isCompleted ? challenge.participants : "0"}/{challenge.maxParticipants}
                        </Badge>
                      </div>

                      {isCompleted && challenge.winners && (
                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-2">Winners</div>
                          <div className="space-y-2">
                            {challenge.winners.map((winner, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                      index === 0
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                        : index === 1
                                          ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  <span className="font-medium">{winner.name}</span>
                                </div>
                                <Badge variant="outline">{winner.score}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Challenge
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Challenge
                  </Button>
                  {!isCompleted && (
                    <Button onClick={handleStatusChange} disabled={isDeactivating}>
                      {isDeactivating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : isUpcoming ? (
                        <XCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {isUpcoming ? "Cancel Challenge" : "Activate Challenge"}
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">Task {index + 1}</Badge>
                              <span className="text-sm text-muted-foreground">
                                Time Limit: {60 + index * 30} minutes
                              </span>
                            </div>
                            <h4 className="font-medium">
                              {index === 0
                                ? "Build a Responsive Landing Page"
                                : index === 1
                                  ? "Implement User Authentication"
                                  : "Create a REST API"}
                            </h4>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {index === 0
                                ? "Create a responsive landing page using HTML, CSS, and JavaScript. The page should include a hero section, features section, and a contact form."
                                : index === 1
                                  ? "Implement user authentication using JWT. Include registration, login, and password reset functionality."
                                  : "Create a REST API with CRUD operations for a resource of your choice. Include proper error handling and validation."}
                            </p>
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

            <TabsContent value="participants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isCompleted ? `Participants (${challenge.participants})` : "No participants yet"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isCompleted ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Participant</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {participants.map((participant) => (
                          <TableRow key={participant.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={participant.avatar} alt={participant.name} />
                                  <AvatarFallback>
                                    {participant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{participant.name}</div>
                                  <div className="text-xs text-muted-foreground">{participant.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(participant.registeredAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  participant.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                }
                              >
                                {participant.status === "completed" ? "Completed" : "Registered"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Submission
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No participants yet</h3>
                      <p className="mt-2 text-muted-foreground">
                        Participants will appear here once they register for the challenge.
                      </p>
                    </div>
                  )}
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
              This will permanently delete the challenge "{challenge.title}" and all associated data. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground"
            >
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

