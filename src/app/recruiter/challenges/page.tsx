"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, ChevronDown, Trophy, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/recruiter/page-header"
import { CreateChallengeDialog } from "@/components/recruiter/challenges/create-challenge-dialog"
import { ChallengeDetailDialog } from "@/components/recruiter/challenges/challenge-detail-dialog"

// Mock data for challenges
const challenges = [
  {
    id: 1,
    title: "Web Development Hackathon",
    description: "Build a web application that solves a real-world problem in 48 hours.",
    category: "Web Development",
    difficulty: "Intermediate",
    startDate: "2023-06-15T10:00:00Z",
    endDate: "2023-06-17T10:00:00Z",
    registrationDeadline: "2023-06-10T23:59:59Z",
    status: "upcoming",
    participants: 0,
    maxParticipants: 100,
    prizes: ["$5,000", "Job Interview", "Developer Kit"],
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    title: "AI Algorithm Challenge",
    description: "Develop an AI algorithm that can solve a specific problem in natural language processing.",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    startDate: "2023-06-22T10:00:00Z",
    endDate: "2023-06-29T10:00:00Z",
    registrationDeadline: "2023-06-20T23:59:59Z",
    status: "upcoming",
    participants: 0,
    maxParticipants: 50,
    prizes: ["$10,000", "Internship Opportunity", "Cloud Credits"],
    createdAt: "2023-05-10T14:20:00Z",
  },
  {
    id: 3,
    title: "Mobile App Innovation",
    description: "Create an innovative mobile app that leverages the latest platform features.",
    category: "Mobile Development",
    difficulty: "Intermediate",
    startDate: "2023-07-05T10:00:00Z",
    endDate: "2023-07-12T10:00:00Z",
    registrationDeadline: "2023-07-03T23:59:59Z",
    status: "upcoming",
    participants: 0,
    maxParticipants: 75,
    prizes: ["$7,500", "App Store Feature", "Developer Hardware"],
    createdAt: "2023-05-05T09:15:00Z",
  },
  {
    id: 4,
    title: "Database Optimization Challenge",
    description: "Optimize a complex database system for performance, security, and scalability.",
    category: "Database",
    difficulty: "Advanced",
    startDate: "2023-04-10T10:00:00Z",
    endDate: "2023-04-17T10:00:00Z",
    registrationDeadline: "2023-04-08T23:59:59Z",
    status: "completed",
    participants: 65,
    maxParticipants: 100,
    prizes: ["$6,000", "Certification", "Cloud Credits"],
    createdAt: "2023-03-28T11:45:00Z",
    winners: [
      { name: "John Doe", rank: 1, score: 95 },
      { name: "Jane Smith", rank: 2, score: 92 },
      { name: "Michael Johnson", rank: 3, score: 88 },
    ],
  },
  {
    id: 5,
    title: "Frontend Framework Showdown",
    description: "Build a complex UI component using a modern frontend framework of your choice.",
    category: "Web Development",
    difficulty: "Intermediate",
    startDate: "2023-03-15T10:00:00Z",
    endDate: "2023-03-22T10:00:00Z",
    registrationDeadline: "2023-03-13T23:59:59Z",
    status: "completed",
    participants: 150,
    maxParticipants: 200,
    prizes: ["$5,000", "Conference Tickets", "Developer Swag"],
    createdAt: "2023-02-20T13:10:00Z",
    winners: [
      { name: "Emily Davis", rank: 1, score: 97 },
      { name: "Robert Wilson", rank: 2, score: 94 },
      { name: "Sarah Thompson", rank: 3, score: 91 },
    ],
  },
]

export default function RecruiterChallengesPage() {
  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter challenges based on search query and active tab
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || challenge.status === activeTab

    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Challenges"
        description="Create and manage coding challenges and hackathons"
        action={
          <Button onClick={() => setIsCreateChallengeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Challenge
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search challenges by title, description, or category..."
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

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Challenges</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} onClick={() => setSelectedChallenge(challenge)} />
            ))
          )}
        </div>
      </Tabs>

      {/* Create Challenge Dialog */}
      <CreateChallengeDialog open={isCreateChallengeOpen} onOpenChange={setIsCreateChallengeOpen} />

      {/* Challenge Detail Dialog */}
      {selectedChallenge && (
        <ChallengeDetailDialog
          open={!!selectedChallenge}
          onOpenChange={() => setSelectedChallenge(null)}
          challenge={selectedChallenge}
        />
      )}
    </div>
  )
}

function ChallengeCard({ challenge, onClick }) {
  const isUpcoming = challenge.status === "upcoming"
  const isActive = challenge.status === "active"
  const isCompleted = challenge.status === "completed"

  const startDate = new Date(challenge.startDate)
  const endDate = new Date(challenge.endDate)
  const now = new Date()

  const daysUntilStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const daysUntilEnd = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="cursor-pointer h-full" onClick={onClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-md">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
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
          <CardTitle className="mt-4">{challenge.title}</CardTitle>
          <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Category</span>
            <Badge variant="outline">{challenge.category}</Badge>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Difficulty</span>
            <Badge variant="outline">{challenge.difficulty}</Badge>
          </div>

          {isCompleted ? (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Participants</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{challenge.participants}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{isUpcoming ? "Starts in" : "Ends in"}</span>
              <Badge
                variant="outline"
                className={
                  isUpcoming
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                }
              >
                {isUpcoming ? `${daysUntilStart} days` : `${daysUntilEnd} days`}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

