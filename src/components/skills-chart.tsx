"use client"

import { useTheme } from "next-themes"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts"

const data = [
  {
    name: "JavaScript",
    value: 92,
  },
  {
    name: "React",
    value: 88,
  },
  {
    name: "Node.js",
    value: 76,
  },
  {
    name: "CSS",
    value: 85,
  },
  {
    name: "Python",
    value: 72,
  },
  {
    name: "SQL",
    value: 78,
  },
]

export function SkillsChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="aspect-[4/3] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={isDark ? "#374151" : "#e5e7eb"} />
          <PolarAngleAxis dataKey="name" tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <Radar
            name="Skill Level"
            dataKey="value"
            stroke={isDark ? "#a78bfa" : "#8b5cf6"}
            fill={isDark ? "rgba(167, 139, 250, 0.2)" : "rgba(139, 92, 246, 0.2)"}
            fillOpacity={0.6}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">{payload[0].name}:</div>
                      <div className="text-right">{payload[0].value}%</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

