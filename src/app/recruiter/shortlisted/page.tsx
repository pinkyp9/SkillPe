"use client"

import { useState } from "react"
import { Users, Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/recruiter/page-header"
import { ShortlistedCandidateCard } from "@/components/recruiter/shortlisted/shortlisted-candidate-card"
import { ScheduleInterviewDialog } from "@/components/recruiter/shortlisted/schedule-interview-dialog"
import { ResumeViewDialog } from "@/components/recruiter/jobs/resume-view-dialog"
import { RemoveCandidateDialog } from "@/components/recruiter/shortlisted/remove-candidate-dialog"

// Mock data for shortlisted candidates
const mockShortlistedCandidates = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    resumeScore: 92,
    skillMatch: 95,
    appliedDate: "2023-04-18T10:30:00Z",
    shortlistedDate: "2023-04-20T14:30:00Z",
    skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
    experience: "5 years",
    education: "Bachelor's in Computer Science",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Senior Frontend Developer",
    notes: "Excellent candidate with strong React experience. Would be a great fit for the team.",
    interviewScheduled: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    resumeScore: 88,
    skillMatch: 90,
    appliedDate: "2023-04-17T14:20:00Z",
    shortlistedDate: "2023-04-19T11:15:00Z",
    skills: ["JavaScript", "React", "CSS", "HTML", "Vue.js"],
    experience: "3 years",
    education: "Master's in Web Development",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Frontend Developer",
    notes: "Strong CSS skills and good eye for design.",
    interviewScheduled: true,
    interviewDate: "2023-05-05T15:00:00Z",
  },
  {
    id: 3,
    name: "Michael Johnson",
    title: "Full Stack Developer",
    location: "Austin, TX",
    resumeScore: 85,
    skillMatch: 82,
    appliedDate: "2023-04-16T09:15:00Z",
    shortlistedDate: "2023-04-18T16:45:00Z",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: "4 years",
    education: "Bachelor's in Software Engineering",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Full Stack Engineer",
    notes: "",
    interviewScheduled: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "UI/UX Developer",
    location: "Seattle, WA",
    resumeScore: 80,
    skillMatch: 78,
    appliedDate: "2023-04-15T11:45:00Z",
    shortlistedDate: "2023-04-17T10:30:00Z",
    skills: ["JavaScript", "React", "UI Design", "Figma", "CSS"],
    experience: "2 years",
    education: "Bachelor's in Design",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "UX/UI Designer",
    notes: "Great portfolio with impressive UI designs.",
    interviewScheduled: true,
    interviewDate: "2023-05-03T11:00:00Z",
  },
]

// Group candidates by job title
const groupCandidatesByJob = (candidates) => {
  return candidates.reduce((groups, candidate) => {
    const group = groups[candidate.jobTitle] || []
    group.push(candidate)
    groups[candidate.jobTitle] = group
    return groups
  }, {})
}

export default function ShortlistedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isResumeViewOpen, setIsResumeViewOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter candidates based on search query and active tab
  const filteredCandidates = mockShortlistedCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "scheduled" && candidate.interviewScheduled) ||
      (activeTab === "pending" && !candidate.interviewScheduled)

    return matchesSearch && matchesTab
  })

  const groupedCandidates = groupCandidatesByJob(filteredCandidates)

  const handleScheduleInterview = (candidate) => {
    setSelectedCandidate(candidate)
    setIsScheduleDialogOpen(true)
  }

  const handleViewResume = (candidate) => {
    setSelectedCandidate(candidate)
    setIsResumeViewOpen(true)
  }

  const handleRemoveCandidate = (candidate) => {
    setSelectedCandidate(candidate)
    setIsRemoveDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Shortlisted Candidates"
        description="Manage your shortlisted candidates and schedule interviews"
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name, title, or job..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:w-auto w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="pending">Pending Interview</TabsTrigger>
          <TabsTrigger value="scheduled">Interview Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ShortlistedCandidatesList
            groupedCandidates={groupedCandidates}
            onScheduleInterview={handleScheduleInterview}
            onViewResume={handleViewResume}
            onRemoveCandidate={handleRemoveCandidate}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <ShortlistedCandidatesList
            groupedCandidates={groupedCandidates}
            onScheduleInterview={handleScheduleInterview}
            onViewResume={handleViewResume}
            onRemoveCandidate={handleRemoveCandidate}
          />
        </TabsContent>

        <TabsContent value="scheduled" className="mt-0">
          <ShortlistedCandidatesList
            groupedCandidates={groupedCandidates}
            onScheduleInterview={handleScheduleInterview}
            onViewResume={handleViewResume}
            onRemoveCandidate={handleRemoveCandidate}
          />
        </TabsContent>
      </Tabs>

      {/* Schedule Interview Dialog */}
      {selectedCandidate && (
        <ScheduleInterviewDialog
          open={isScheduleDialogOpen}
          onOpenChange={setIsScheduleDialogOpen}
          candidate={selectedCandidate}
        />
      )}

      {/* Resume View Dialog */}
      {selectedCandidate && (
        <ResumeViewDialog open={isResumeViewOpen} onOpenChange={setIsResumeViewOpen} applicant={selectedCandidate} />
      )}

      {/* Remove Candidate Dialog */}
      {selectedCandidate && (
        <RemoveCandidateDialog
          open={isRemoveDialogOpen}
          onOpenChange={setIsRemoveDialogOpen}
          candidate={selectedCandidate}
        />
      )}
    </div>
  )
}

function ShortlistedCandidatesList({ groupedCandidates, onScheduleInterview, onViewResume, onRemoveCandidate }) {
  if (Object.keys(groupedCandidates).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No shortlisted candidates found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedCandidates).map(([jobTitle, candidates]) => (
        <div key={jobTitle}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{jobTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <ShortlistedCandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onScheduleInterview={() => onScheduleInterview(candidate)}
                    onViewResume={() => onViewResume(candidate)}
                    onRemoveCandidate={() => onRemoveCandidate(candidate)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

