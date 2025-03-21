"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, DollarSign, Building, BookmarkMinus, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const savedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    credits: 25,
    compatibility: 92,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    postedDate: "1 week ago",
    logo: "/placeholder.svg?height=40&width=40",
    credits: 20,
    compatibility: 85,
  },
  {
    id: 3,
    title: "React Developer",
    company: "WebSolutions",
    location: "New York, NY",
    type: "Contract",
    salary: "$90,000 - $110,000",
    postedDate: "3 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    credits: 15,
    compatibility: 78,
  },
  {
    id: 4,
    title: "JavaScript Engineer",
    company: "CodeMasters",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    postedDate: "5 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    credits: 30,
    compatibility: 88,
  },
]

export function SavedJobsList() {
  const [filter, setFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Search saved jobs..." className="md:w-1/3" />
        <Select defaultValue="all" onValueChange={setFilter}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {savedJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                      <img src={job.logo || "/placeholder.svg"} alt={`${job.company} logo`} className="w-10 h-10" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <Badge className="bg-primary/20 text-primary">{job.compatibility}% Match</Badge>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Posted {job.postedDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                      <Badge variant="outline" className="w-fit">
                        {job.credits} credits required
                      </Badge>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          <BookmarkMinus className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setSelectedJob(job)}>
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply for this job</DialogTitle>
                              <DialogDescription>
                                You are about to apply for {selectedJob?.title} at {selectedJob?.company}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-center justify-between mb-4">
                                <span className="font-medium">Required Credits:</span>
                                <Badge variant="outline" className="text-lg">
                                  {selectedJob?.credits}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Your Credits:</span>
                                <Badge variant="outline" className="text-lg">
                                  100
                                </Badge>
                              </div>
                              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                                <p className="text-sm">
                                  By applying, {selectedJob?.credits} credits will be deducted from your account. Your
                                  application will be sent to the recruiter immediately.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button>Confirm Application</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

