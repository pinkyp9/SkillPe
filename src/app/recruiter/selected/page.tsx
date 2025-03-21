"use client"

import { useState } from "react"
import { Users, Search, Filter, ChevronDown, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/recruiter/page-header"
import { SelectedCandidateCard } from "@/components/recruiter/selected/selected-candidate-card"
import { ResumeViewDialog } from "@/components/recruiter/jobs/resume-view-dialog"
import { SendOfferDialog } from "@/components/recruiter/selected/send-offer-dialog"
import { RejectCandidateDialog } from "@/components/recruiter/selected/reject-candidate-dialog"
import { BatchActionDialog } from "@/components/recruiter/selected/batch-action-dialog"

// Mock data for interviewed candidates
const mockInterviewedCandidates = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    resumeScore: 92,
    skillMatch: 95,
    interviewDate: "2023-05-05T14:30:00Z",
    interviewScore: 90,
    skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
    experience: "5 years",
    education: "Bachelor's in Computer Science",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Senior Frontend Developer",
    interviewNotes:
      "Excellent communication skills. Strong technical knowledge. Would be a great addition to the team.",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    resumeScore: 88,
    skillMatch: 90,
    interviewDate: "2023-05-03T11:00:00Z",
    interviewScore: 85,
    skills: ["JavaScript", "React", "CSS", "HTML", "Vue.js"],
    experience: "3 years",
    education: "Master's in Web Development",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Frontend Developer",
    interviewNotes: "Good technical skills. Needs improvement in system design concepts.",
    status: "approved",
  },
  {
    id: 3,
    name: "Michael Johnson",
    title: "Full Stack Developer",
    location: "Austin, TX",
    resumeScore: 85,
    skillMatch: 82,
    interviewDate: "2023-05-02T15:30:00Z",
    interviewScore: 78,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: "4 years",
    education: "Bachelor's in Software Engineering",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "Full Stack Engineer",
    interviewNotes: "Good backend knowledge. Frontend skills need improvement.",
    status: "rejected",
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "UI/UX Developer",
    location: "Seattle, WA",
    resumeScore: 80,
    skillMatch: 78,
    interviewDate: "2023-04-28T10:00:00Z",
    interviewScore: 88,
    skills: ["JavaScript", "React", "UI Design", "Figma", "CSS"],
    experience: "2 years",
    education: "Bachelor's in Design",
    avatar: "/placeholder.svg?height=60&width=60",
    jobTitle: "UX/UI Designer",
    interviewNotes: "Excellent design skills. Good understanding of user experience principles.",
    status: "pending",
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

export default function SelectedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isResumeViewOpen, setIsResumeViewOpen] = useState(false)
  const [isSendOfferOpen, setIsSendOfferOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [isBatchActionOpen, setIsBatchActionOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCandidates, setSelectedCandidates] = useState([])

  // Filter candidates based on search query and active tab
  const filteredCandidates = mockInterviewedCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || activeTab === candidate.status

    return matchesSearch && matchesTab
  })

  const groupedCandidates = groupCandidatesByJob(filteredCandidates)

  const handleViewResume = (candidate) => {
    setSelectedCandidate(candidate)
    setIsResumeViewOpen(true)
  }

  const handleSendOffer = (candidate) => {
    setSelectedCandidate(candidate)
    setIsSendOfferOpen(true)
  }

  const handleReject = (candidate) => {
    setSelectedCandidate(candidate)
    setIsRejectOpen(true)
  }

  const handleSelectCandidate = (candidate, isSelected) => {
    if (isSelected) {
      setSelectedCandidates([...selectedCandidates, candidate])
    } else {
      setSelectedCandidates(selectedCandidates.filter((c) => c.id !== candidate.id))
    }
  }

  const handleBatchAction = () => {
    setIsBatchActionOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Selected Candidates"
        description="Manage candidates who have completed interviews"
        action={
          selectedCandidates.length > 0 && (
            <Button onClick={handleBatchAction}>
              <Mail className="mr-2 h-4 w-4" />
              Send Offers ({selectedCandidates.length})
            </Button>
          )
        }
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
          <TabsTrigger value="pending">Pending Decision</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <SelectedCandidatesList
            groupedCandidates={groupedCandidates}
            onViewResume={handleViewResume}
            onSendOffer={handleSendOffer}
            onReject={handleReject}
            onSelectCandidate={handleSelectCandidate}
            selectedCandidateIds={selectedCandidates.map((c) => c.id)}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <SelectedCandidatesList
            groupedCandidates={groupedCandidates}
            onViewResume={handleViewResume}
            onSendOffer={handleSendOffer}
            onReject={handleReject}
            onSelectCandidate={handleSelectCandidate}
            selectedCandidateIds={selectedCandidates.map((c) => c.id)}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          <SelectedCandidatesList
            groupedCandidates={groupedCandidates}
            onViewResume={handleViewResume}
            onSendOffer={handleSendOffer}
            onReject={handleReject}
            onSelectCandidate={handleSelectCandidate}
            selectedCandidateIds={selectedCandidates.map((c) => c.id)}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <SelectedCandidatesList
            groupedCandidates={groupedCandidates}
            onViewResume={handleViewResume}
            onSendOffer={handleSendOffer}
            onReject={handleReject}
            onSelectCandidate={handleSelectCandidate}
            selectedCandidateIds={selectedCandidates.map((c) => c.id)}
          />
        </TabsContent>
      </Tabs>

      {/* Resume View Dialog */}
      {selectedCandidate && (
        <ResumeViewDialog open={isResumeViewOpen} onOpenChange={setIsResumeViewOpen} applicant={selectedCandidate} />
      )}

      {/* Send Offer Dialog */}
      {selectedCandidate && (
        <SendOfferDialog open={isSendOfferOpen} onOpenChange={setIsSendOfferOpen} candidate={selectedCandidate} />
      )}

      {/* Reject Candidate Dialog */}
      {selectedCandidate && (
        <RejectCandidateDialog open={isRejectOpen} onOpenChange={setIsRejectOpen} candidate={selectedCandidate} />
      )}

      {/* Batch Action Dialog */}
      <BatchActionDialog
        open={isBatchActionOpen}
        onOpenChange={setIsBatchActionOpen}
        candidates={selectedCandidates}
        onComplete={() => setSelectedCandidates([])}
      />
    </div>
  )
}

function SelectedCandidatesList({
  groupedCandidates,
  onViewResume,
  onSendOffer,
  onReject,
  onSelectCandidate,
  selectedCandidateIds,
}) {
  if (Object.keys(groupedCandidates).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No candidates found</h3>
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
                  <SelectedCandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onViewResume={() => onViewResume(candidate)}
                    onSendOffer={() => onSendOffer(candidate)}
                    onReject={() => onReject(candidate)}
                    onSelect={(isSelected) => onSelectCandidate(candidate, isSelected)}
                    isSelected={selectedCandidateIds.includes(candidate.id)}
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

