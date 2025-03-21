"use client"

import { useTheme } from "next-themes"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    source: "SkillPe",
    applicantQuality: 85,
    hireRate: 65,
  },
  {
    source: "LinkedIn",
    applicantQuality: 75,
    hireRate: 55,
  },
  {
    source: "Indeed",
    applicantQuality: 65,
    hireRate: 45,
  },
  {
    source: "Referrals",
    applicantQuality: 90,
    hireRate: 70,
  },
  {
    source: "Job Fairs",
    applicantQuality: 60,
    hireRate: 40,
  },
  {
    source: "University",
    applicantQuality: 70,
    hireRate: 50,
  },
]

export function SourceQualityChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={isDark ? "#374151" : "#e5e7eb"} />
          <PolarAngleAxis dataKey="source" tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <Radar
            name="Applicant Quality"
            dataKey="applicantQuality"
            stroke={isDark ? "#a78bfa" : "#8b5cf6"}
            fill={isDark ? "rgba(167, 139, 250, 0.2)" : "rgba(139, 92, 246, 0.2)"}
            fillOpacity={0.6}
          />
          <Radar
            name="Hire Rate"
            dataKey="hireRate"
            stroke={isDark ? "#f472b6" : "#ec4899"}
            fill={isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(236, 72, 153, 0.2)"}
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

