"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, BookOpen, Clock, ChevronDown, Star, Play, Award, BarChart, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Added course links that would redirect to external platforms
const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    category: "Programming",
    level: "Advanced",
    duration: "4 weeks",
    modules: 12,
    progress: 75,
    completed: false,
    instructor: "Jane Smith",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["React", "JavaScript", "Design Patterns"],
    description: "Learn advanced React patterns and techniques to build scalable and maintainable applications.",
    externalLink: "https://www.udemy.com/course/advanced-react-patterns/",
    platform: "Udemy"
  },
  {
    id: 2,
    title: "Node.js Microservices",
    category: "Programming",
    level: "Intermediate",
    duration: "6 weeks",
    modules: 15,
    progress: 0,
    completed: false,
    instructor: "John Doe",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["Node.js", "Microservices", "API Design"],
    description: "Build scalable microservices with Node.js and learn best practices for distributed systems.",
    externalLink: "https://www.coursera.org/learn/nodejs-microservices",
    platform: "Coursera"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    duration: "3 weeks",
    modules: 10,
    progress: 100,
    completed: true,
    instructor: "Sarah Johnson",
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1661589354357-f56ddf86a0b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["UI Design", "UX Research", "Prototyping"],
    description: "Learn the fundamentals of UI/UX design and create user-centered digital experiences.",
    externalLink: "https://www.udemy.com/course/ui-ux-design-fundamentals",
    platform: "Udemy"
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    category: "Programming",
    level: "Advanced",
    duration: "8 weeks",
    modules: 20,
    progress: 30,
    completed: false,
    instructor: "Michael Chen",
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    description: "Master data structures and algorithms to solve complex programming problems efficiently.",
    externalLink: "https://www.coursera.org/learn/algorithms-part1",
    platform: "Coursera"
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    category: "Programming",
    level: "Intermediate",
    duration: "10 weeks",
    modules: 25,
    progress: 0,
    completed: false,
    instructor: "Alex Rodriguez",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "React", "MongoDB"],
    description: "Become a full stack developer by learning both frontend and backend technologies.",
    externalLink: "https://www.udemy.com/course/full-stack-web-development-bootcamp",
    platform: "Udemy"
  },
  {
    id: 6,
    title: "Technical Communication",
    category: "Soft Skills",
    level: "Beginner",
    duration: "2 weeks",
    modules: 8,
    progress: 100,
    completed: true,
    instructor: "Emily Watson",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["Writing", "Presentation", "Documentation"],
    description: "Improve your technical communication skills for better collaboration and documentation.",
    externalLink: "https://www.coursera.org/learn/technical-communication",
    platform: "Coursera"
  },
]

export default function CoursesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterDuration, setFilterDuration] = useState("all")
  const [favorites, setFavorites] = useState([])

  // Function to handle external link navigation
  const handleStartCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId)
    if (course && course.externalLink) {
      // Open in new tab
      window.open(course.externalLink, "_blank")
      
      // Show toast notification
      toast({
        title: "Opening course on " + course.platform,
        description: `Redirecting to ${course.title} on ${course.platform}`,
      })
      
      // Update progress if it's 0
      if (course.progress === 0) {
        // In a real app, this would update the database
        console.log(`Started course: ${course.title}`)
      }
    }
  }

  // Function to toggle favorite status
  const toggleFavorite = (courseId) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Category filter
    const matchesCategory = filterCategory === "all" || 
      course.category.toLowerCase() === filterCategory.toLowerCase()
    
    // Level filter
    const matchesLevel = filterLevel === "all" || 
      course.level.toLowerCase() === filterLevel.toLowerCase()
    
    // Duration filter
    let matchesDuration = true
    if (filterDuration === "short") {
      matchesDuration = parseInt(course.duration) < 3
    } else if (filterDuration === "medium") {
      matchesDuration = parseInt(course.duration) >= 3 && parseInt(course.duration) <= 6
    } else if (filterDuration === "long") {
      matchesDuration = parseInt(course.duration) > 6
    }
    
    return matchesSearch && matchesCategory && matchesLevel && matchesDuration
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search courses by title, skill, category..." 
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
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="soft skills">Soft Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Level</h3>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Duration</h3>
                  <Select value={filterDuration} onValueChange={setFilterDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="short">Under 3 weeks</SelectItem>
                      <SelectItem value="medium">3-6 weeks</SelectItem>
                      <SelectItem value="long">Over 6 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilterCategory("all")
                    setFilterLevel("all")
                    setFilterDuration("all")
                    setSearchTerm("")
                  }}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="recommended">
        <TabsList className="mb-6">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((c) => c.progress === 0)
              .map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => setSelectedCourse(course)} 
                  isFavorite={favorites.includes(course.id)}
                  onToggleFavorite={() => toggleFavorite(course.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inprogress" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((c) => c.progress > 0 && c.progress < 100)
              .map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => setSelectedCourse(course)} 
                  isFavorite={favorites.includes(course.id)}
                  onToggleFavorite={() => toggleFavorite(course.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((c) => c.progress === 100)
              .map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => setSelectedCourse(course)} 
                  isFavorite={favorites.includes(course.id)}
                  onToggleFavorite={() => toggleFavorite(course.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((c) => favorites.includes(c.id))
              .map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => setSelectedCourse(course)} 
                  isFavorite={favorites.includes(course.id)}
                  onToggleFavorite={() => toggleFavorite(course.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={() => setSelectedCourse(course)} 
                isFavorite={favorites.includes(course.id)}
                onToggleFavorite={() => toggleFavorite(course.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>{selectedCourse?.title}</DialogDescription>
          </DialogHeader>

          {selectedCourse && (
            <div className="py-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedCourse.image || "/placeholder.svg"}
                  alt={selectedCourse.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedCourse.title}</h3>
                  <p className="text-sm text-muted-foreground">By {selectedCourse.instructor}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{selectedCourse.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium">{selectedCourse.category}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Level</div>
                  <div className="font-medium">{selectedCourse.level}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{selectedCourse.duration}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Modules</div>
                  <div className="font-medium">{selectedCourse.modules} modules</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm">{selectedCourse.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Skills You'll Learn</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Platform</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedCourse.platform}</Badge>
                  <a 
                    href={selectedCourse.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    View on {selectedCourse.platform} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>

              {selectedCourse.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} className="h-2" />
                </div>
              )}

              <DialogFooter className="gap-2 sm:gap-0">
                {selectedCourse.progress === 0 && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => toggleFavorite(selectedCourse.id)}
                      className="sm:mr-auto"
                    >
                      {favorites.includes(selectedCourse.id) ? 
                        "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                    <Button onClick={() => handleStartCourse(selectedCourse.id)}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                  </>
                )}

                {selectedCourse.progress > 0 && selectedCourse.progress < 100 && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => toggleFavorite(selectedCourse.id)}
                      className="sm:mr-auto"
                    >
                      {favorites.includes(selectedCourse.id) ? 
                        "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                    <Button onClick={() => handleStartCourse(selectedCourse.id)}>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Course
                    </Button>
                  </>
                )}

                {selectedCourse.progress === 100 && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => toggleFavorite(selectedCourse.id)}
                      className="sm:mr-auto"
                    >
                      {favorites.includes(selectedCourse.id) ? 
                        "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                    <Button variant="outline" onClick={() => window.open(selectedCourse.externalLink, "_blank")}>
                      <BarChart className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                    <Button onClick={() => window.open(selectedCourse.externalLink, "_blank")}>
                      <Award className="h-4 w-4 mr-2" />
                      Take Assessment
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CourseCard({ course, onClick, isFavorite, onToggleFavorite }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full overflow-hidden">
        <div className="relative">
          <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover cursor-pointer" onClick={onClick} />
          <Badge
            className={`absolute top-2 right-2 ${
              course.level === "Beginner"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : course.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {course.level}
          </Badge>
          {isFavorite && (
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-full p-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </div>
          )}
          <Badge
            className="absolute bottom-2 left-2 bg-gray-800/70 text-white"
          >
            {course.platform}
          </Badge>
        </div>

        <CardHeader className="pb-2 cursor-pointer" onClick={onClick}>
          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          <CardDescription>{course.category}</CardDescription>
        </CardHeader>

        <CardContent className="cursor-pointer" onClick={onClick}>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm">{course.rating}</span>
            </div>
          </div>

          {course.progress > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button 
            variant="ghost" 
            className="p-2 h-9 w-9" 
            onClick={onToggleFavorite}
          >
            <Star className={`h-5 w-5 ${isFavorite ? "text-yellow-500 fill-yellow-500" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              window.open(course.externalLink, "_blank")
            }}
          >
            {course.progress === 0 && "Start Course"}
            {course.progress > 0 && course.progress < 100 && "Continue Course"}
            {course.progress === 100 && "View Certificate"}
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}