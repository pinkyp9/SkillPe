"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Bookmark,
  Send,
  ChevronDown,
  BookOpen,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// const jobs = [
//   {
//     id: 1,
//     title: "Senior Frontend Developer",
//     company: "TechCorp",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     salary: "$120,000 - $150,000",
//     postedDate: "2 days ago",
//     logo: "https://plus.unsplash.com/premium_photo-1669077043641-7cb423357d08?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     credits: 25,
//     compatibility: 92,
//     description:
//       "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.",
//     requirements: [
//       "5+ years of experience with React",
//       "Strong knowledge of JavaScript, HTML, and CSS",
//       "Experience with state management libraries",
//       "Experience with responsive design",
//       "Experience with testing frameworks",
//     ],
//     skills: [
//       { name: "React", level: "Advanced", match: true },
//       { name: "JavaScript", level: "Advanced", match: true },
//       { name: "TypeScript", level: "Intermediate", match: true },
//       { name: "CSS/SCSS", level: "Advanced", match: true },
//       { name: "Redux", level: "Intermediate", match: false },
//     ],
//     recommendedCourses: [
//       { name: "Advanced Redux", duration: "4 weeks" },
//       { name: "React Performance Optimization", duration: "2 weeks" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Full Stack Engineer",
//     company: "InnovateTech",
//     location: "Remote",
//     type: "Full-time",
//     salary: "$100,000 - $130,000",
//     postedDate: "1 week ago",
//     logo: "https://plus.unsplash.com/premium_photo-1681488396760-2f64648717dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     credits: 20,
//     compatibility: 85,
//     description:
//       "We are looking for a Full Stack Engineer to join our team. You will be responsible for building and maintaining web applications.",
//     requirements: [
//       "3+ years of experience with React",
//       "3+ years of experience with Node.js",
//       "Experience with MongoDB",
//       "Experience with RESTful APIs",
//       "Experience with Git",
//     ],
//     skills: [
//       { name: "React", level: "Intermediate", match: true },
//       { name: "Node.js", level: "Intermediate", match: true },
//       { name: "MongoDB", level: "Beginner", match: false },
//       { name: "Express", level: "Intermediate", match: true },
//       { name: "Git", level: "Intermediate", match: true },
//     ],
//     recommendedCourses: [
//       { name: "MongoDB for Developers", duration: "3 weeks" },
//       { name: "Advanced Node.js", duration: "4 weeks" },
//     ],
//   },
//   {
//     id: 3,
//     title: "React Developer",
//     company: "WebSolutions",
//     location: "New York, NY",
//     type: "Contract",
//     salary: "$90,000 - $110,000",
//     postedDate: "3 days ago",
//     logo: "https://plus.unsplash.com/premium_photo-1667232497335-a22785d615b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic29sdXRpb25zfGVufDB8fDB8fHww",
//     credits: 15,
//     compatibility: 78,
//     description:
//       "We are looking for a React Developer to join our team. You will be responsible for building user interfaces for our web applications.",
//     requirements: [
//       "2+ years of experience with React",
//       "Strong knowledge of JavaScript",
//       "Experience with RESTful APIs",
//       "Experience with Git",
//       "Experience with Agile methodologies",
//     ],
//     skills: [
//       { name: "React", level: "Intermediate", match: true },
//       { name: "JavaScript", level: "Intermediate", match: true },
//       { name: "RESTful APIs", level: "Beginner", match: true },
//       { name: "Git", level: "Intermediate", match: true },
//       { name: "Agile", level: "Beginner", match: false },
//     ],
//     recommendedCourses: [
//       { name: "Agile Development", duration: "2 weeks" },
//       { name: "Advanced React Patterns", duration: "3 weeks" },
//     ],
//   },
//   {
//     id: 4,
//     title: "JavaScript Engineer",
//     company: "CodeMasters",
//     location: "Austin, TX",
//     type: "Full-time",
//     salary: "$110,000 - $140,000",
//     postedDate: "5 days ago",
//     logo: "https://plus.unsplash.com/premium_photo-1700483267294-eb01387a17a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kZW1hc3RlcnN8ZW58MHx8MHx8fDA%3D",
//     credits: 30,
//     compatibility: 88,
//     description:
//       "We are looking for a JavaScript Engineer to join our team. You will be responsible for building and maintaining web applications.",
//     requirements: [
//       "4+ years of experience with JavaScript",
//       "Experience with modern JavaScript frameworks",
//       "Experience with RESTful APIs",
//       "Experience with Git",
//       "Experience with testing frameworks",
//     ],
//     skills: [
//       { name: "JavaScript", level: "Advanced", match: true },
//       { name: "React", level: "Intermediate", match: true },
//       { name: "Vue.js", level: "Beginner", match: false },
//       { name: "RESTful APIs", level: "Intermediate", match: true },
//       { name: "Jest", level: "Intermediate", match: true },
//     ],
//     recommendedCourses: [
//       { name: "Vue.js for React Developers", duration: "3 weeks" },
//       { name: "Advanced JavaScript Testing", duration: "2 weeks" },
//     ],
//   },
// ]

// export default function JobsPage() {
//   const [selectedJob, setSelectedJob] = useState(jobs[0])
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [salaryRange, setSalaryRange] = useState([80000, 150000])
//   const [isMobile, setIsMobile] = useState(false)

//   // Check if we're on mobile
//   useState(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkIfMobile()
//     window.addEventListener("resize", checkIfMobile)

//     return () => {
//       window.removeEventListener("resize", checkIfMobile)
//     }
//   })

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//           <Input placeholder="Search jobs, skills, companies..." className="pl-10" />
//         </div>

//         {isMobile ? (
//           <Drawer>
//             <DrawerTrigger asChild>
//               <Button variant="outline" className="md:hidden">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filters
//               </Button>
//             </DrawerTrigger>
//             <DrawerContent>
//               <DrawerHeader>
//                 <DrawerTitle>Filters</DrawerTitle>
//                 <DrawerDescription>Refine your job search</DrawerDescription>
//               </DrawerHeader>
//               <div className="px-4">
//                 <JobFilters salaryRange={salaryRange} setSalaryRange={setSalaryRange} />
//               </div>
//               <DrawerFooter>
//                 <Button>Apply Filters</Button>
//                 <DrawerClose asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </DrawerClose>
//               </DrawerFooter>
//             </DrawerContent>
//           </Drawer>
//         ) : (
//           <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="hidden md:flex">
//             <Filter className="h-4 w-4 mr-2" />
//             Filters
//             <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
//           </Button>
//         )}
//       </div>

//       {isFilterOpen && !isMobile && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6"
//         >
//           <Card>
//             <CardContent className="p-6">
//               <JobFilters salaryRange={salaryRange} setSalaryRange={setSalaryRange} />
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}

//       <Tabs defaultValue="recommended">
//         <TabsList className="mb-6">
//           <TabsTrigger value="recommended">Recommended</TabsTrigger>
//           <TabsTrigger value="recent">Recent</TabsTrigger>
//           <TabsTrigger value="saved">Saved</TabsTrigger>
//         </TabsList>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="md:col-span-1 space-y-4">
//             <TabsContent value="recommended" className="m-0">
//               {jobs.map((job) => (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   isSelected={selectedJob?.id === job.id}
//                   onClick={() => setSelectedJob(job)}
//                 />
//               ))}
//             </TabsContent>

//             <TabsContent value="recent" className="m-0">
//               {jobs
//                 .slice()
//                 .reverse()
//                 .map((job) => (
//                   <JobCard
//                     key={job.id}
//                     job={job}
//                     isSelected={selectedJob?.id === job.id}
//                     onClick={() => setSelectedJob(job)}
//                   />
//                 ))}
//             </TabsContent>

//             <TabsContent value="saved" className="m-0">
//               <div className="text-center py-8">
//                 <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
//                 <h3 className="mt-4 text-lg font-medium">No saved jobs yet</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">Save jobs you're interested in to view them later</p>
//               </div>
//             </TabsContent>
//           </div>

//           <div className="md:col-span-2">
//             {selectedJob && (
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
//                         <img
//                           src={selectedJob.logo || "/placeholder.svg"}
//                           alt={`${selectedJob.company} logo`}
//                           className="w-10 h-10"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
//                         <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
//                         <Badge className="bg-primary/20 text-primary w-fit">{selectedJob.compatibility}% Match</Badge>
//                       </div>

//                       <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
//                         <div className="flex items-center gap-1">
//                           <Building className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">{selectedJob.company}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">{selectedJob.location}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Briefcase className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">{selectedJob.type}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">{selectedJob.salary}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">Posted {selectedJob.postedDate}</span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
//                         <Badge variant="outline" className="w-fit">
//                           {selectedJob.credits} credits required
//                         </Badge>

//                         <div className="flex gap-2 mt-4 md:mt-0">
//                           <Button variant="outline">
//                             <Bookmark className="h-4 w-4 mr-2" />
//                             Save
//                           </Button>
//                           <Dialog>
//                             <DialogTrigger asChild>
//                               <Button>
//                                 <Send className="h-4 w-4 mr-2" />
//                                 Apply Now
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                               <DialogHeader>
//                                 <DialogTitle>Apply for this job</DialogTitle>
//                                 <DialogDescription>
//                                   You are about to apply for {selectedJob.title} at {selectedJob.company}
//                                 </DialogDescription>
//                               </DialogHeader>
//                               <div className="py-4">
//                                 <div className="flex items-center justify-between mb-4">
//                                   <span className="font-medium">Required Credits:</span>
//                                   <Badge variant="outline" className="text-lg">
//                                     {selectedJob.credits}
//                                   </Badge>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <span className="font-medium">Your Credits:</span>
//                                   <Badge variant="outline" className="text-lg">
//                                     100
//                                   </Badge>
//                                 </div>
//                                 <div className="mt-6 p-4 bg-primary/5 rounded-lg">
//                                   <p className="text-sm">
//                                     By applying, {selectedJob.credits} credits will be deducted from your account. Your
//                                     application will be sent to the recruiter immediately.
//                                   </p>
//                                 </div>
//                               </div>
//                               <DialogFooter>
//                                 <Button variant="outline">Cancel</Button>
//                                 <Button>Confirm Application</Button>
//                               </DialogFooter>
//                             </DialogContent>
//                           </Dialog>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <Accordion type="single" collapsible defaultValue="description">
//                       <AccordionItem value="description">
//                         <AccordionTrigger>Job Description</AccordionTrigger>
//                         <AccordionContent>
//                           <p className="text-sm">{selectedJob.description}</p>
//                           <h4 className="font-medium mt-4 mb-2">Requirements:</h4>
//                           <ul className="list-disc pl-5 space-y-1">
//                             {selectedJob.requirements.map((req, index) => (
//                               <li key={index} className="text-sm">
//                                 {req}
//                               </li>
//                             ))}
//                           </ul>
//                         </AccordionContent>
//                       </AccordionItem>

//                       <AccordionItem value="skills">
//                         <AccordionTrigger>Required Skills</AccordionTrigger>
//                         <AccordionContent>
//                           <div className="space-y-4">
//                             {selectedJob.skills.map((skill, index) => (
//                               <div key={index} className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <div
//                                     className={`w-2 h-2 rounded-full ${skill.match ? "bg-green-500" : "bg-red-500"}`}
//                                   />
//                                   <span className="font-medium">{skill.name}</span>
//                                   <Badge variant="outline" className="text-xs">
//                                     {skill.level}
//                                   </Badge>
//                                 </div>
//                                 {skill.match ? (
//                                   <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                                     Match
//                                   </Badge>
//                                 ) : (
//                                   <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
//                                     Missing
//                                   </Badge>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </AccordionContent>
//                       </AccordionItem>

//                       <AccordionItem value="courses">
//                         <AccordionTrigger>Recommended Courses</AccordionTrigger>
//                         <AccordionContent>
//                           <div className="space-y-4">
//                             {selectedJob.recommendedCourses.map((course, index) => (
//                               <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
//                                 <div className="bg-primary/10 p-2 rounded-md">
//                                   <BookOpen className="h-5 w-5 text-primary" />
//                                 </div>
//                                 <div className="flex-1">
//                                   <h4 className="text-sm font-medium">{course.name}</h4>
//                                   <p className="text-xs text-muted-foreground mt-1">Duration: {course.duration}</p>
//                                   <Button size="sm" variant="outline" className="mt-2">
//                                     View Course
//                                   </Button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </AccordionContent>
//                       </AccordionItem>
//                     </Accordion>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </Tabs>
//     </div>
//   )
// }

// function JobCard({ job, isSelected, onClick }) {
//   return (
//     <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
//       <Card className={`cursor-pointer ${isSelected ? "border-primary" : ""}`} onClick={onClick}>
//         <CardContent className="p-4">
//           <div className="flex gap-3">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
//                 <img src={job.logo || "/placeholder.svg"} alt={`${job.company} logo`} className="w-8 h-8" />
//               </div>
//             </div>

//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium truncate">{job.title}</h3>
//               <div className="flex items-center gap-1 mt-1">
//                 <Building className="h-3 w-3 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground truncate">{job.company}</span>
//               </div>
//               <div className="flex items-center gap-1 mt-1">
//                 <MapPin className="h-3 w-3 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground truncate">{job.location}</span>
//               </div>
//               <div className="flex items-center justify-between mt-2">
//                 <Badge variant="outline" className="text-xs">
//                   {job.credits} credits
//                 </Badge>
//                 <Badge className="bg-primary/20 text-primary text-xs">{job.compatibility}% Match</Badge>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// function JobFilters({ salaryRange, setSalaryRange }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div>
//         <h3 className="font-medium mb-3">Salary Range</h3>
//         <div className="px-2">
//           <Slider defaultValue={salaryRange} min={30000} max={200000} step={5000} onValueChange={setSalaryRange} />
//           <div className="flex justify-between mt-2">
//             <span className="text-sm">${salaryRange[0].toLocaleString()}</span>
//             <span className="text-sm">${salaryRange[1].toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="font-medium mb-3">Job Type</h3>
//         <div className="space-y-2">
//           {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
//             <div key={type} className="flex items-center space-x-2">
//               <Checkbox id={`type-${type}`} />
//               <Label htmlFor={`type-${type}`}>{type}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3 className="font-medium mb-3">Experience Level</h3>
//         <div className="space-y-2">
//           {["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"].map((level) => (
//             <div key={level} className="flex items-center space-x-2">
//               <Checkbox id={`level-${level}`} />
//               <Label htmlFor={`level-${level}`}>{level}</Label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { motion } from "framer-motion"
// import {
//   Search,
//   Filter,
//   Briefcase,
//   MapPin,
//   Clock,
//   DollarSign,
//   Building,
//   Bookmark,
//   Send,
//   ChevronDown,
//   BookOpen,
// } from "lucide-react"
// import {
//   Card,
//   CardContent,
//   Badge,
//   Button,
//   Input,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
//   Slider,
//   Checkbox,
//   Label,
// } from "@/components/ui"

// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { motion } from "framer-motion"
// import {
//   Search,
//   Filter,
//   MapPin,
//   DollarSign,
//   Bookmark,
//   Send,
//   ChevronDown,
// } from "lucide-react"
// import {
//   Card,
//   CardContent,
//   Badge,
//   Button,
//   Input,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
//   Slider,
//   Checkbox,
//   Label,
// } from "@/components/ui"

import axios from "axios"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    companyName: "",
    location: "",
    language: "",
    minPay: 30000,
    maxPay: 200000,
  })

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString())
      })
      const res = await axios.get(`/api/joblisting?${params.toString()}`)
      const jobListings: Job[] = res.data.jobListings || []
      setJobs(jobListings)
      setSelectedJob(jobListings[0] || null)
    } catch (err) {
      setError("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search jobs, skills, companies..." className="pl-10" />
        </div>

        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>Refine your job search</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <JobFilters filters={filters} setFilters={setFilters} />
              </div>
              <DrawerFooter>
                <Button onClick={fetchJobs}>Apply Filters</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" /> Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </Button>
        )}
      </div>

      {isFilterOpen && !isMobile && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <JobFilters filters={filters} setFilters={setFilters} />
              <Button onClick={fetchJobs} className="mt-4">Apply Filters</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center text-muted-foreground">Loading jobs...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Tabs defaultValue="recommended">
          <TabsList className="mb-6">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} isSelected={selectedJob?._id === job._id} onClick={() => setSelectedJob(job)} />
                ))}
              </div>
              <div className="md:col-span-2">
                {selectedJob && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                      <p className="text-muted-foreground mb-4">{selectedJob.description}</p>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="outline">{selectedJob.location}</Badge>
                        <Badge variant="outline">{selectedJob.language}</Badge>
                        <Badge variant="outline">
                          ${selectedJob.pay.min.toLocaleString()} - ${selectedJob.pay.max.toLocaleString()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function JobCard({ job, isSelected, onClick }: { job: Job; isSelected: boolean; onClick: () => void }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`cursor-pointer ${isSelected ? "border-primary" : ""}`} onClick={onClick}>
        <CardContent className="p-4">
          <div>
            <h3 className="font-medium">{job.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{job.location} • {job.language}</p>
            <Badge variant="outline" className="mt-2">
              ${job.pay.min.toLocaleString()} - ${job.pay.max.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function JobFilters({ filters, setFilters }: { filters: any; setFilters: React.Dispatch<React.SetStateAction<any>> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-medium mb-3">Salary Range</h3>
        <Slider
          defaultValue={[filters.minPay, filters.maxPay]}
          min={30000}
          max={200000}
          step={5000}
          onValueChange={(value) =>
            setFilters((prev: any) => ({ ...prev, minPay: value[0], maxPay: value[1] }))
          }
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${filters.minPay.toLocaleString()}</span>
          <span>${filters.maxPay.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Location</h3>
        {["Remote", "Hybrid", "Offline"].map((loc) => (
          <div key={loc} className="flex items-center space-x-2">
            <Checkbox
              id={`loc-${loc}`}
              checked={filters.location === loc}
              onCheckedChange={() =>
                setFilters((prev: any) => ({
                  ...prev,
                  location: prev.location === loc ? "" : loc,
                }))
              }
            />
            <Label htmlFor={`loc-${loc}`}>{loc}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-3">Language</h3>
        {[
          "English",
          "Spanish",
          "French",
          "German",
          "Mandarin",
          "Other",
        ].map((lang) => (
          <div key={lang} className="flex items-center space-x-2">
            <Checkbox
              id={`lang-${lang}`}
              checked={filters.language === lang}
              onCheckedChange={() =>
                setFilters((prev: any) => ({
                  ...prev,
                  language: prev.language === lang ? "" : lang,
                }))
              }
            />
            <Label htmlFor={`lang-${lang}`}>{lang}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

type Job = {
  _id: string
  title: string
  description: string
  pay: {
    min: number
    max: number
    currency?: string
  }
  language: string
  location: "Remote" | "Hybrid" | "Offline"
  industry?: string
  createdAt?: string
}

