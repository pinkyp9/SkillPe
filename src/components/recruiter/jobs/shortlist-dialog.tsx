"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ShortlistDialog({ open, onOpenChange, applicant, jobTitle }) {
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleShortlist = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset and close after showing success
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        setNotes("")
      }, 1500)
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.post('/api/recruiter/shortlist', {
        applicantId: applicant.id,
        jobTitle,
        notes
      })
      
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        setNotes("")
      }, 1500)
    } catch (error) {
      console.error('Failed to shortlist applicant:', error)
      // Show error toast
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Applicant Shortlisted</h2>
            <p className="text-muted-foreground">{applicant.name} has been added to your shortlist</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Shortlist Applicant</DialogTitle>
              <DialogDescription>Add this applicant to your shortlist for the {jobTitle} position.</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={applicant.avatar} alt={applicant.name} />
                  <AvatarFallback>
                    {applicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{applicant.name}</h3>
                  <p className="text-sm text-muted-foreground">{applicant.title}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this applicant..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleShortlist} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Shortlisting...
                  </>
                ) : (
                  "Shortlist Applicant"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

