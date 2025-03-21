"use client"

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TrustScoreIndicator({ score }) {
  let icon
  let color
  let message

  if (score > 80) {
    icon = <ShieldCheck className="h-5 w-5" />
    color = "text-green-600 dark:text-green-400"
    message = "Your trust score is good. Keep following the assessment guidelines."
  } else if (score > 50) {
    icon = <Shield className="h-5 w-5" />
    color = "text-yellow-600 dark:text-yellow-400"
    message = "Your trust score is moderate. Please be mindful of the assessment guidelines."
  } else {
    icon = <ShieldAlert className="h-5 w-5" />
    color = "text-red-600 dark:text-red-400"
    message = "Your trust score is low. This may affect your assessment results."
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-1 ${color}`}>
            {icon}
            <span className="font-medium">{score}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

