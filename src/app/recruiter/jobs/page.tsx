"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  Calendar,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CreateJobDialog } from "@/components/recruiter/jobs/create-job-dialog"
import { JobDetailView } from "@/components/recruiter/jobs/job-detail-view"
import { JobFilterPanel } from "@/components/recruiter/jobs/job-filter-panel"
import { PageHeader } from "@/components/recruiter/page-header"

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced frontend developer with expertise in React, TypeScript, and modern frontend frameworks.",
    pay: {
      min: 120000,
      max: 150000,
      currency: "USD",
    },
    language: "English",
    location: "Remote",
    industry: "Technology",
    company: "TechCorp",
    createdAt: "2023-04-15T10:30:00Z",
    status: "active",
    applicants: 24,
    shortlisted: 5,
    daysLeft: 15,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    description: "Join our team to build scalable web applications using Node.js, React, and MongoDB.",
    pay: {
      min: 100000,
      max: 130000,
      currency: "USD",
    },
    language: "English",
    location: "Hybrid",
    industry: "Technology",
    company: "TechCorp",
    createdAt: "2023-04-10T14:20:00Z",
    status: "active",
    applicants: 32,
    shortlisted: 8,
    daysLeft: 10,
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description: "Design beautiful and intuitive user interfaces for our web and mobile applications.",
    pay: {
      min: 90000,
      max: 120000,
      currency: "USD",
    },
    language: "English",
    location: "Remote",
    industry: "Design",
    company: "TechCorp",
    createdAt: "2023-04-05T09:15:00Z",
    status: "active",
    applicants: 18,
    shortlisted: 4,
    daysLeft: 5,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployment of our applications.",
    pay: {
      min: 110000,
      max: 140000,
      currency: "USD",
    },
    language: "English",
    location: "Remote",
    industry: "Technology",
    company: "TechCorp",
    createdAt: "2023-03-28T11:45:00Z",
    status: "closed",
    applicants: 15,
    shortlisted: 3,
    daysLeft: 0,
  },
  {
    id: 5,
    title: "Product Manager",
    description:
      "Lead the development of our products from conception to launch, working closely with design and engineering teams.",
    pay: {
      min: 130000,
      max: 160000,
      currency: "USD",
    },
    language: "English",
    location: "Hybrid",
    industry: "Product",
    company: "TechCorp",
    createdAt: "2023-03-20T13:10:00Z",
    status: "closed",
    applicants: 28,
    shortlisted: 6,
    daysLeft: 0,
  },
]

export default function JobsPage() {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  // Filter jobs based on search query and active tab
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.industry.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || job.status === activeTab

    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Jobs"
        description="Manage your job postings and view applicants"
        action={
          <Button onClick={() => setIsCreateJobOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, description, or industry..."
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

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <JobFilterPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="closed">Closed Jobs</TabsTrigger>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <JobGrid jobs={filteredJobs} onJobSelect={setSelectedJob} selectedJobId={selectedJob?.id} />
        </TabsContent>

        <TabsContent value="closed" className="mt-0">
          <JobGrid jobs={filteredJobs} onJobSelect={setSelectedJob} selectedJobId={selectedJob?.id} />
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <JobGrid jobs={filteredJobs} onJobSelect={setSelectedJob} selectedJobId={selectedJob?.id} />
        </TabsContent>
      </Tabs>

      {/* Job Detail View */}
      {selectedJob && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Job Details</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedJob(null)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <JobDetailView job={selectedJob} />
        </div>
      )}

      {/* Create Job Dialog */}
      <CreateJobDialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen} />
    </div>
  )
}

function JobGrid({ jobs, onJobSelect, selectedJobId }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => onJobSelect(job)} isSelected={job.id === selectedJobId} />
        ))
      )}
    </div>
  )
}

function JobCard({ job, onClick, isSelected }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`cursor-pointer h-full ${isSelected ? "border-primary" : ""}`} onClick={onClick}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Building className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium truncate">{job.title}</h3>
                <Badge
                  className={
                    job.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                  }
                >
                  {job.status === "active" ? "Active" : "Closed"}
                </Badge>
              </div>

              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{job.location}</span>
                </div>

                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    ${job.pay.min.toLocaleString()} - ${job.pay.max.toLocaleString()} {job.pay.currency}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.applicants} applicants</span>
                </div>

                {job.status === "active" && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{job.daysLeft} days left</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

