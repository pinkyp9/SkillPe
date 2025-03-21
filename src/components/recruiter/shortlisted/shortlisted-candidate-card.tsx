"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ShortlistedCandidateCard({ candidate, onScheduleInterview, onViewResume, onRemoveCandidate }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium">{candidate.name}</h3>
                  <p className="text-muted-foreground">{candidate.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">{candidate.resumeScore}% Match</Badge>

                  {candidate.interviewScheduled && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Interview Scheduled
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.location}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.experience} experience</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Shortlisted {new Date(candidate.shortlistedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {candidate.notes && (
                <div className="mt-3 p-3 bg-muted/30 rounded-md">
                  <p className="text-sm italic">"{candidate.notes}"</p>
                </div>
              )}

              {candidate.interviewScheduled && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-md flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Interview scheduled for {new Date(candidate.interviewDate).toLocaleDateString()} at{" "}
                      {new Date(candidate.interviewDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-3">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 3 && (
                  <Badge variant="outline" className="bg-muted/50">
                    +{candidate.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={onRemoveCandidate}>
                  Remove
                </Button>
                <Button variant="outline" size="sm" onClick={onViewResume}>
                  View Resume
                </Button>
                <Button size="sm" onClick={onScheduleInterview} disabled={candidate.interviewScheduled}>
                  {candidate.interviewScheduled ? "Reschedule" : "Schedule Interview"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

