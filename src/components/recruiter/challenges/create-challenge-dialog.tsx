"use client"

import { useState } from "react"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Challenge title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  difficulty: z.string({
    required_error: "Please select a difficulty level.",
  }),
  maxParticipants: z.coerce.number().min(1, {
    message: "Maximum participants must be at least 1.",
  }),
})

export function CreateChallengeDialog({ open, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [registrationDeadline, setRegistrationDeadline] = useState(null)
  const [prizes, setPrizes] = useState(["", "", ""])
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    timeLimit: 60, // minutes
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      maxParticipants: 100,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!startDate || !endDate || !registrationDeadline) {
      setActiveTab("schedule")
      return
    }

    if (tasks.length === 0) {
      setActiveTab("tasks")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      resetForm()

      // Show success toast or notification here
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.post('/api/recruiter/challenges', {
        ...values,
        startDate,
        endDate,
        registrationDeadline,
        prizes: prizes.filter(prize => prize.trim() !== ""),
        tasks
      })
      
      onOpenChange(false)
      resetForm()
      // Show success toast
    } catch (error) {
      console.error('Failed to create challenge:', error)
      // Show error toast
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  const resetForm = () => {
    form.reset()
    setStartDate(null)
    setEndDate(null)
    setRegistrationDeadline(null)
    setPrizes(["", "", ""])
    setTasks([])
    setCurrentTask({
      title: "",
      description: "",
      timeLimit: 60,
    })
    setActiveTab("details")
  }

  const handlePrizeChange = (index, value) => {
    const newPrizes = [...prizes]
    newPrizes[index] = value
    setPrizes(newPrizes)
  }

  const handleAddTask = () => {
    if (!currentTask.title || !currentTask.description) return

    setTasks([...tasks, currentTask])
    setCurrentTask({
      title: "",
      description: "",
      timeLimit: 60,
    })
  }

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Challenge</DialogTitle>
          <DialogDescription>Create a coding challenge or hackathon for candidates.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Challenge Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule & Prizes</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Web Development Hackathon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the challenge and its objectives..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                            <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                            <SelectItem value="DevOps">DevOps</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Participants</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("schedule")}>
                    Next: Schedule & Prizes
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Registration Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !registrationDeadline && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {registrationDeadline ? format(registrationDeadline, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={registrationDeadline}
                        onSelect={setRegistrationDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prizes.map((prize, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-shrink-0 font-medium">{index + 1}.</div>
                      <Input
                        placeholder={`Prize for ${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd"} place`}
                        value={prize}
                        onChange={(e) => handlePrizeChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                  Back to Details
                </Button>
                <Button type="button" onClick={() => setActiveTab("tasks")}>
                  Next: Tasks
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Task</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Task Title</FormLabel>
                    <Input
                      placeholder="e.g. Build a Responsive Landing Page"
                      value={currentTask.title}
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Task Description</FormLabel>
                    <Textarea
                      placeholder="Describe the task and its requirements..."
                      value={currentTask.description}
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Time Limit (minutes)</FormLabel>
                    <Input
                      type="number"
                      value={currentTask.timeLimit}
                      onChange={(e) => setCurrentTask({ ...currentTask, timeLimit: Number.parseInt(e.target.value) })}
                      min={1}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddTask}
                    disabled={!currentTask.title || !currentTask.description}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </CardContent>
              </Card>

              {tasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Added Tasks ({tasks.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.map((task, index) => (
                        <div key={index} className="flex justify-between items-start border-b pb-4">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Time Limit: {task.timeLimit} minutes
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveTask(index)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("schedule")}>
                  Back to Schedule
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting || tasks.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Challenge"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

