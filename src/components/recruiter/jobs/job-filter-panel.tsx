"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

export function JobFilterPanel() {
  const [salaryRange, setSalaryRange] = useState([50000, 150000])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-3">Salary Range</h3>
            <div className="px-2">
              <Slider defaultValue={salaryRange} min={30000} max={200000} step={5000} onValueChange={setSalaryRange} />
              <div className="flex justify-between mt-2">
                <span className="text-sm">${salaryRange[0].toLocaleString()}</span>
                <span className="text-sm">${salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Location Type</h3>
            <div className="space-y-2">
              {["Remote", "Hybrid", "Offline"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`location-${type}`} />
                  <Label htmlFor={`location-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Language</h3>
            <div className="space-y-2">
              {["English", "Spanish", "French", "German", "Mandarin", "Other"].map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox id={`language-${language}`} />
                  <Label htmlFor={`language-${language}`}>{language}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline">Reset Filters</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}

