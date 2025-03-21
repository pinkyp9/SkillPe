"use client"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, Mail, Phone, Calendar, Award, Briefcase, GraduationCap, FileText } from "lucide-react"

export function ResumeViewDialog({ open, onOpenChange, applicant }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applicant Resume</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                <AvatarFallback>
                  {applicant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className="bg-primary/10 text-primary">{applicant.resumeScore}% Match</Badge>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{applicant.name}</h2>
              <p className="text-lg text-muted-foreground mb-4">{applicant.title}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{applicant.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{applicant.name.toLowerCase().replace(" ", ".")}@example.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="resume">
            <TabsList className="mb-4">
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="resume">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Work Experience
                  </h3>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Senior Frontend Developer</h4>
                          <p className="text-muted-foreground">TechCorp</p>
                        </div>
                        <div className="text-sm text-muted-foreground">Jan 2020 - Present</div>
                      </div>
                      <p className="mt-2 text-sm">
                        Led the development of responsive web applications using React and TypeScript. Implemented state
                        management solutions and optimized performance.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Frontend Developer</h4>
                          <p className="text-muted-foreground">WebSolutions Inc.</p>
                        </div>
                        <div className="text-sm text-muted-foreground">Mar 2018 - Dec 2019</div>
                      </div>
                      <p className="mt-2 text-sm">
                        Developed and maintained client websites using JavaScript, HTML, and CSS. Collaborated with
                        designers to implement UI components.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </h3>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{applicant.education}</h4>
                        <p className="text-muted-foreground">University of Technology</p>
                      </div>
                      <div className="text-sm text-muted-foreground">2014 - 2018</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Skills
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {applicant.skills.map((skill, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{skill}</span>
                          <Badge variant="outline">Advanced</Badge>
                        </div>
                        <Progress value={85 + Math.floor(Math.random() * 15)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skill Assessment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Overall Score</span>
                          <span className="font-medium">{applicant.resumeScore}%</span>
                        </div>
                        <Progress value={applicant.resumeScore} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">JavaScript Assessment</h4>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Score</span>
                            <span className="text-sm">92%</span>
                          </div>
                          <Progress value={92} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">Completed on April 10, 2023</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">React Assessment</h4>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Score</span>
                            <span className="text-sm">88%</span>
                          </div>
                          <Progress value={88} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">Completed on April 12, 2023</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">TypeScript Assessment</h4>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Score</span>
                            <span className="text-sm">85%</span>
                          </div>
                          <Progress value={85} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">Completed on April 15, 2023</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">CSS/HTML Assessment</h4>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Score</span>
                            <span className="text-sm">90%</span>
                          </div>
                          <Progress value={90} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">Completed on April 8, 2023</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Coding Challenge Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Frontend Development Challenge</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Score</span>
                        <span className="text-sm">95%</span>
                      </div>
                      <Progress value={95} className="h-2 mb-2" />
                      <p className="text-sm mt-2">
                        The candidate demonstrated excellent problem-solving skills and code quality. Their solution was
                        well-structured, efficient, and followed best practices.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-insights">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Strengths
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Strong technical skills in JavaScript, React, and TypeScript</li>
                        <li>Extensive experience with frontend development (5+ years)</li>
                        <li>Excellent problem-solving abilities demonstrated in coding challenges</li>
                        <li>Good communication skills based on written responses</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Areas for Improvement
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Limited experience with backend technologies</li>
                        <li>Could benefit from more exposure to large-scale applications</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Job Fit Analysis
                      </h4>
                      <p className="mb-2">
                        This candidate is a{" "}
                        <span className="font-medium text-green-600 dark:text-green-400">strong match</span> for the{" "}
                        {applicant.title} position.
                      </p>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Overall Job Fit</span>
                        <span className="text-sm">{applicant.resumeScore}%</span>
                      </div>
                      <Progress value={applicant.resumeScore} className="h-2" />
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Recommended Interview Questions
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Describe a challenging project you worked on and how you overcame obstacles.</li>
                        <li>How do you approach optimizing performance in React applications?</li>
                        <li>What experience do you have with state management libraries?</li>
                        <li>How do you stay updated with the latest frontend technologies?</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

