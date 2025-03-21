"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ApplicantCard({ applicant, onShortlist, onViewResume, isNew = false }) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                <AvatarFallback>
                  {applicant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium">{applicant.name}</h3>
                  <p className="text-muted-foreground">{applicant.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">{applicant.resumeScore}% Match</Badge>

                  {isNew && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">New</Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{applicant.location}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{applicant.experience} experience</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Skill Match</span>
                  <span className="text-sm font-medium">{applicant.skillMatch}%</span>
                </div>
                <Progress value={applicant.skillMatch} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {applicant.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={onViewResume}>
                  View Resume
                </Button>
                <Button onClick={onShortlist}>Shortlist</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

