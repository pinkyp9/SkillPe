"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Trophy, ChevronDown, Users, Calendar, Building, Award, Timer, CheckCircle, Code, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const challenges = [
  {
    id: 1,
    title: "Web Development Hackathon",
    company: "Google",
    logo: "https://plus.unsplash.com/premium_photo-1678565999332-1cde462f7b24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Web Development",
    difficulty: "Intermediate",
    startDate: "May 15, 2023",
    endDate: "May 17, 2023",
    participants: 120,
    prizes: ["$5,000", "Job Interview", "Developer Kit"],
    status: "upcoming",
    description:
      "Build a web application that solves a real-world problem in 48 hours. Teams of up to 3 people are allowed.",
    requirements: [
      "Knowledge of HTML, CSS, and JavaScript",
      "Experience with modern web frameworks",
      "Understanding of responsive design",
      "Basic knowledge of APIs",
    ],
    format: [
      "48-hour hackathon",
      "Teams of up to 3 people",
      "Projects will be judged on creativity, functionality, and code quality",
      "Proctored challenge with trust score",
    ],
    practiceLink: "https://www.hackerrank.com/skills-verification/javascript_basic",
  },
  {
    id: 2,
    title: "AI Algorithm Challenge",
    company: "Microsoft",
    logo: "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWxnb3JpdGhtfGVufDB8fDB8fHww",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    startDate: "May 22, 2023",
    endDate: "May 29, 2023",
    participants: 85,
    prizes: ["$10,000", "Internship Opportunity", "Cloud Credits"],
    status: "upcoming",
    description:
      "Develop an AI algorithm that can solve a specific problem in natural language processing or computer vision.",
    requirements: [
      "Strong knowledge of machine learning algorithms",
      "Experience with Python and ML libraries",
      "Understanding of neural networks",
      "Experience with data preprocessing",
    ],
    format: [
      "One-week challenge",
      "Individual participation only",
      "Submissions will be evaluated on accuracy, efficiency, and innovation",
      "Proctored challenge with trust score",
    ],
    practiceLink: "https://www.kaggle.com/competitions/titanic",
  },
  {
    id: 3,
    title: "Mobile App Innovation",
    company: "Apple",
    logo: "https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlJTIwZGV2fGVufDB8fDB8fHww",
    category: "Mobile Development",
    difficulty: "Intermediate",
    startDate: "June 5, 2023",
    endDate: "June 12, 2023",
    participants: 95,
    prizes: ["$7,500", "App Store Feature", "Developer Hardware"],
    status: "upcoming",
    description: "Create an innovative mobile app that leverages the latest platform features to solve a user need.",
    requirements: [
      "Experience with iOS or Android development",
      "Understanding of UI/UX principles",
      "Knowledge of mobile app architecture",
      "Experience with mobile APIs",
    ],
    format: [
      "One-week challenge",
      "Individual or team participation (up to 2 people)",
      "Apps will be judged on innovation, design, and functionality",
      "Proctored challenge with trust score",
    ],
    practiceLink: "https://developer.apple.com/tutorials/app-dev-training",
  },
  {
    id: 4,
    title: "Database Optimization Challenge",
    company: "Oracle",
    logo: "/https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Database",
    difficulty: "Advanced",
    startDate: "April 10, 2023",
    endDate: "April 17, 2023",
    participants: 65,
    prizes: ["$6,000", "Certification", "Cloud Credits"],
    status: "completed",
    description: "Optimize a complex database system for performance, security, and scalability.",
    requirements: [
      "Strong knowledge of SQL and database design",
      "Experience with database optimization techniques",
      "Understanding of indexing and query optimization",
      "Knowledge of database security best practices",
    ],
    format: [
      "One-week challenge",
      "Individual participation only",
      "Solutions will be evaluated on performance improvements, security, and scalability",
      "Proctored challenge with trust score",
    ],
    result: {
      participated: true,
      rank: 12,
      score: 85,
    },
    practiceLink: "https://www.hackerrank.com/domains/sql",
  },
  {
    id: 5,
    title: "Frontend Framework Showdown",
    company: "Facebook",
    logo: "/https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJvbnRlbmR8ZW58MHx8MHx8fDA%3D",
    category: "Web Development",
    difficulty: "Intermediate",
    startDate: "March 15, 2023",
    endDate: "March 22, 2023",
    participants: 150,
    prizes: ["$5,000", "Conference Tickets", "Developer Swag"],
    status: "completed",
    description: "Build a complex UI component using a modern frontend framework of your choice.",
    requirements: [
      "Experience with React, Vue, Angular, or other modern frameworks",
      "Strong knowledge of JavaScript",
      "Understanding of component architecture",
      "Experience with state management",
    ],
    format: [
      "One-week challenge",
      "Individual participation only",
      "Components will be judged on functionality, performance, and code quality",
      "Proctored challenge with trust score",
    ],
    result: {
      participated: true,
      rank: 5,
      score: 92,
    },
    practiceLink: "https://react.dev/learn/tutorial-tic-tac-toe",
  },
]

export default function ChallengesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState("all")

  // Filter challenges based on search and filter criteria
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || challenge.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesCompany = selectedCompany === "all" || challenge.company.toLowerCase() === selectedCompany.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search challenges by title, company, category..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Difficulty</h3>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
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
                  <h3 className="font-medium mb-3">Company</h3>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges
              .filter((c) => c.status === "upcoming")
              .map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onClick={() => setSelectedChallenge(challenge)}
                />
              ))}
            {filteredChallenges.filter((c) => c.status === "upcoming").length === 0 && (
              <div className="col-span-3 text-center py-12">
                <Trophy className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">No Upcoming Challenges</h3>
                <p className="mt-2 text-muted-foreground">No upcoming challenges match your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="m-0">
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-medium">No Active Challenges</h3>
            <p className="mt-2 text-muted-foreground">There are no active challenges at the moment. Check back soon!</p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges
              .filter((c) => c.status === "completed")
              .map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onClick={() => setSelectedChallenge(challenge)}
                />
              ))}
            {filteredChallenges.filter((c) => c.status === "completed").length === 0 && (
              <div className="col-span-3 text-center py-12">
                <Trophy className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">No Completed Challenges</h3>
                <p className="mt-2 text-muted-foreground">No completed challenges match your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} onClick={() => setSelectedChallenge(challenge)} />
            ))}
            {filteredChallenges.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <Trophy className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">No Challenges Found</h3>
                <p className="mt-2 text-muted-foreground">No challenges match your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Challenge Details</DialogTitle>
            <DialogDescription>{selectedChallenge?.title}</DialogDescription>
          </DialogHeader>

          {selectedChallenge && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <img
                    src={selectedChallenge.logo || "/placeholder.svg"}
                    alt={`${selectedChallenge.company} logo`}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedChallenge.title}</h3>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedChallenge.company}</span>
                  </div>
                </div>
                <Badge
                  className={`ml-auto ${
                    selectedChallenge.status === "upcoming"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : selectedChallenge.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                  }`}
                >
                  {selectedChallenge.status === "upcoming"
                    ? "Upcoming"
                    : selectedChallenge.status === "active"
                      ? "Active"
                      : "Completed"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium">{selectedChallenge.category}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div className="font-medium">{selectedChallenge.difficulty}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">
                    {selectedChallenge.startDate} - {selectedChallenge.endDate}
                  </div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Participants</div>
                  <div className="font-medium">{selectedChallenge.participants} registered</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm">{selectedChallenge.description}</p>
              </div>

              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value="requirements">
                  <AccordionTrigger>Requirements</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedChallenge.requirements.map((req, index) => (
                        <li key={index} className="text-sm">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="format">
                  <AccordionTrigger>Challenge Format</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedChallenge.format.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prizes">
                  <AccordionTrigger>Prizes</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedChallenge.prizes.map((prize, index) => (
                        <li key={index} className="text-sm">
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {selectedChallenge.status === "completed" && selectedChallenge.result && (
                <div className="p-4 bg-primary/5 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Your Results</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>You participated in this challenge</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Your Rank</div>
                      <div className="font-medium">
                        {selectedChallenge.result.rank} of {selectedChallenge.participants}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Your Score</div>
                      <div className="font-medium">{selectedChallenge.result.score}%</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedChallenge.practiceLink && (
                <div className="p-4 bg-primary/5 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Practice Resources</h4>
                  <p className="text-sm mb-2">Want to prepare for this challenge? Try this practice exercise:</p>
                  <Button variant="outline" className="w-full" onClick={() => window.open(selectedChallenge.practiceLink, '_blank')}>
                    <Code className="h-4 w-4 mr-2" />
                    Practice Now
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              )}

              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Important Note</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      This challenge is proctored. Your trust score will be calculated based on your behavior during the
                      challenge.
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                {selectedChallenge.status === "upcoming" && (
                  <div className="flex w-full gap-2 flex-col sm:flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => window.open(selectedChallenge.practiceLink, '_blank')}>
                      <Code className="h-4 w-4 mr-2" />
                      Practice First
                    </Button>
                    <Button className="flex-1">
                      <Trophy className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </div>
                )}

                {selectedChallenge.status === "completed" && selectedChallenge.result && (
                  <Button>
                    <Award className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ChallengeCard({ challenge, onClick }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="cursor-pointer h-full flex flex-col" onClick={onClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
              <img src={challenge.logo || "/placeholder.svg"} alt={`${challenge.company} logo`} className="w-8 h-8" />
            </div>
            <Badge
              className={`
                ${
                  challenge.status === "upcoming"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : challenge.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }
              `}
            >
              {challenge.status === "upcoming" ? "Upcoming" : challenge.status === "active" ? "Active" : "Completed"}
            </Badge>
          </div>
          <CardTitle className="mt-4 line-clamp-1">{challenge.title}</CardTitle>
          <CardDescription>By {challenge.company}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{challenge.startDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{challenge.participants} participants</span>
            </div>
          </div>

          <Badge variant="outline" className="w-full justify-center">
            {challenge.category} - {challenge.difficulty}
          </Badge>

          {challenge.status === "completed" && challenge.result && (
            <div className="mt-4 p-2 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm">Your Rank:</span>
                <Badge variant="outline">
                  {challenge.result.rank} of {challenge.participants}
                </Badge>
              </div>
            </div>
          )}
          
          {challenge.practiceLink && challenge.status === "upcoming" && (
            <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center text-xs text-blue-700 dark:text-blue-300">
                <Code className="h-3 w-3 mr-1 flex-shrink-0" />
                Practice available
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {challenge.status === "upcoming"
              ? "View Details"
              : challenge.status === "active"
                ? "Participate"
                : "View Results"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}