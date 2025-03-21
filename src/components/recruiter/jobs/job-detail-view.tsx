"use client"

import { useState } from "react"
import { Building, MapPin, DollarSign, Calendar, Globe, Briefcase, Users, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicantCard } from "@/components/recruiter/jobs/applicant-card"
import { ShortlistDialog } from "@/components/recruiter/jobs/shortlist-dialog"
import { ResumeViewDialog } from "@/components/recruiter/jobs/resume-view-dialog"

// Mock data for applicants
const mockApplicants = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    resumeScore: 92,
    skillMatch: 95,
    appliedDate: "2023-04-18T10:30:00Z",
    skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
    experience: "5 years",
    education: "Bachelor's in Computer Science",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    resumeScore: 88,
    skillMatch: 90,
    appliedDate: "2023-04-17T14:20:00Z",
    skills: ["JavaScript", "React", "CSS", "HTML", "Vue.js"],
    experience: "3 years",
    education: "Master's in Web Development",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Michael Johnson",
    title: "Full Stack Developer",
    location: "Austin, TX",
    resumeScore: 85,
    skillMatch: 82,
    appliedDate: "2023-04-16T09:15:00Z",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: "4 years",
    education: "Bachelor's in Software Engineering",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "UI/UX Developer",
    location: "Seattle, WA",
    resumeScore: 80,
    skillMatch: 78,
    appliedDate: "2023-04-15T11:45:00Z",
    skills: ["JavaScript", "React", "UI Design", "Figma", "CSS"],
    experience: "2 years",
    education: "Bachelor's in Design",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Robert Wilson",
    title: "Frontend Engineer",
    location: "Chicago, IL",
    resumeScore: 78,
    skillMatch: 75,
    appliedDate: "2023-04-14T13:10:00Z",
    skills: ["JavaScript", "Angular", "TypeScript", "HTML/CSS", "RxJS"],
    experience: "3 years",
    education: "Master's in Computer Science",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function JobDetailView({ job }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [isShortlistDialogOpen, setIsShortlistDialogOpen] = useState(false)
  const [isResumeViewOpen, setIsResumeViewOpen] = useState(false)

  // Filter applicants based on search query
  const filteredApplicants = mockApplicants.filter((applicant) => {
    return (
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const handleShortlist = (applicant) => {
    setSelectedApplicant(applicant)
    setIsShortlistDialogOpen(true)
  }

  const handleViewResume = (applicant) => {
    setSelectedApplicant(applicant)
    setIsResumeViewOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Job Description</h3>
                <p className="text-muted-foreground">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <span>
                      ${job.pay.min.toLocaleString()} - ${job.pay.max.toLocaleString()} {job.pay.currency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span>{job.language}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <span>{job.industry}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/3 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Job Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>Total Applicants</span>
                      </div>
                      <Badge variant="outline" className="text-lg">
                        {job.applicants}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>Shortlisted</span>
                      </div>
                      <Badge variant="outline" className="text-lg">
                        {job.shortlisted}
                      </Badge>
                    </div>

                    {job.status === "active" && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>Days Remaining</span>
                        </div>
                        <Badge variant="outline" className="text-lg">
                          {job.daysLeft}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button className="flex-1" variant={job.status === "active" ? "destructive" : "default"}>
                  {job.status === "active" ? "Close Job" : "Reopen Job"}
                </Button>
                <Button className="flex-1" variant="outline">
                  Edit Job
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold mb-4">Applicants</h3>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applicants by name, title, or skills..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Applicants</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredApplicants.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No applicants found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredApplicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  onShortlist={() => handleShortlist(applicant)}
                  onViewResume={() => handleViewResume(applicant)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-4">
            <div className="text-center py-12">
              <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No shortlisted applicants</h3>
              <p className="text-muted-foreground">Shortlist applicants to see them here</p>
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            {filteredApplicants.slice(0, 2).map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onShortlist={() => handleShortlist(applicant)}
                onViewResume={() => handleViewResume(applicant)}
                isNew
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Shortlist Dialog */}
      {selectedApplicant && (
        <ShortlistDialog
          open={isShortlistDialogOpen}
          onOpenChange={setIsShortlistDialogOpen}
          applicant={selectedApplicant}
          jobTitle={job.title}
        />
      )}

      {/* Resume View Dialog */}
      {selectedApplicant && (
        <ResumeViewDialog open={isResumeViewOpen} onOpenChange={setIsResumeViewOpen} applicant={selectedApplicant} />
      )}
    </div>
  )
}

