"use client"
import { motion } from "framer-motion"
import { MapPin, Calendar, Award, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export function SelectedCandidateCard({ candidate, onViewResume, onSendOffer, onReject, onSelect, isSelected }) {
  const handleCheckboxChange = (checked) => {
    onSelect(checked)
  }

  const getStatusBadge = () => {
    switch (candidate.status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0 flex items-center">
              <Checkbox
                checked={isSelected}
                onCheckedChange={handleCheckboxChange}
                className="mr-4"
                disabled={candidate.status !== "pending"}
              />
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
                  {getStatusBadge()}

                  <Badge className="bg-primary/10 text-primary">{candidate.interviewScore}% Interview Score</Badge>
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
                    Interviewed on {new Date(candidate.interviewDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {candidate.interviewNotes && (
                <div className="mt-3 p-3 bg-muted/30 rounded-md">
                  <p className="text-sm italic">"{candidate.interviewNotes}"</p>
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
                <Button variant="outline" size="sm" onClick={onViewResume}>
                  View Resume
                </Button>

                {candidate.status === "pending" && (
                  <>
                    <Button variant="outline" size="sm" onClick={onReject}>
                      Reject
                    </Button>
                    <Button size="sm" onClick={onSendOffer}>
                      Approve & Send Offer
                    </Button>
                  </>
                )}

                {candidate.status === "approved" && (
                  <Button size="sm" variant="outline" onClick={onReject}>
                    Revoke Offer
                  </Button>
                )}

                {candidate.status === "rejected" && (
                  <Button size="sm" variant="outline" onClick={onSendOffer}>
                    Reconsider
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

