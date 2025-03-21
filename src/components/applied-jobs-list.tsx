"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, DollarSign, Building, Calendar, CheckCircle, XCircle, Clock3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const appliedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    appliedDate: "Apr 15, 2023",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    appliedDate: "Apr 10, 2023",
    status: "Rejected",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "React Developer",
    company: "WebSolutions",
    location: "New York, NY",
    type: "Contract",
    salary: "$90,000 - $110,000",
    appliedDate: "Apr 5, 2023",
    status: "Pending",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "JavaScript Engineer",
    company: "CodeMasters",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    appliedDate: "Mar 28, 2023",
    status: "Offer",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "UI/UX Developer",
    company: "DesignHub",
    location: "Seattle, WA",
    type: "Part-time",
    salary: "$70,000 - $90,000",
    appliedDate: "Mar 20, 2023",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function AppliedJobsList() {
  const [filter, setFilter] = useState("all")

  const filteredJobs =
    filter === "all" ? appliedJobs : appliedJobs.filter((job) => job.status.toLowerCase() === filter.toLowerCase())

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Search applied jobs..." className="md:w-1/3" />
        <Select defaultValue="all" onValueChange={setFilter}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
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
                      <StatusBadge status={job.status} />
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
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Applied on {job.appliedDate}</span>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Recruiter
                        </Button>
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

function StatusBadge({ status }) {
  let icon
  let className

  switch (status) {
    case "Pending":
      icon = <Clock3 className="h-3 w-3" />
      className = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      break
    case "Interview":
      icon = <Clock className="h-3 w-3" />
      className = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      break
    case "Offer":
      icon = <CheckCircle className="h-3 w-3" />
      className = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      break
    case "Rejected":
      icon = <XCircle className="h-3 w-3" />
      className = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      break
    default:
      icon = <Clock3 className="h-3 w-3" />
      className = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }

  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${className}`}>
      {icon}
      {status}
    </Badge>
  )
}

