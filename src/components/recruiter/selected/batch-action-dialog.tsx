"use client"

import { useState } from "react"
import { Loader2, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BatchActionDialog({ open, onOpenChange, candidates, onComplete }) {
  const [subject, setSubject] = useState(`Job Offer from TechCorp`)
  const [message, setMessage] = useState(
    `Dear Candidate,\n\nWe are pleased to offer you a position at TechCorp. We were impressed with your skills and experience, and we believe you would be a valuable addition to our team.\n\nPlease let us know if you have any questions or concerns.\n\nBest regards,\nHR Team\nTechCorp`,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSendOffers = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset and close after showing success
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        onComplete()
      }, 1500)
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.post('/api/recruiter/batch-send-offers', {
        candidateIds: candidates.map(c => c.id),
        subject,
        message
      })
      
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        onComplete()
      }, 1500)
    } catch (error) {
      console.error('Failed to send offers:', error)
      // Show error toast
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Offers Sent Successfully</h2>
            <p className="text-muted-foreground">Job offers have been sent to {candidates.length} candidates</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Send Job Offers</DialogTitle>
              <DialogDescription>Send job offers to {candidates.length} selected candidates</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Selected Candidates ({candidates.length})</h3>
                <ScrollArea className="h-24 rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{candidate.name}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Email Message</Label>
                  <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={10} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendOffers} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Offers...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send {candidates.length} Offers
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

