"use client"

import { useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RemoveCandidateDialog({ open, onOpenChange, candidate }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemove = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.delete(`/api/recruiter/shortlisted/${candidate.id}`)
      onOpenChange(false)
      // Show success toast
    } catch (error) {
      console.error('Failed to remove candidate:', error)
      // Show error toast
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Remove Candidate
          </DialogTitle>
          <DialogDescription>Are you sure you want to remove this candidate from your shortlist?</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.title}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The candidate will be removed from your shortlist for the {candidate.jobTitle}{" "}
            position.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleRemove} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Candidate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

