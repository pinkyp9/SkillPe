"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    date: "Jan",
    "Skill Assessments": 2,
    "Job Applications": 3,
    "Courses Completed": 1,
  },
  {
    date: "Feb",
    "Skill Assessments": 3,
    "Job Applications": 5,
    "Courses Completed": 2,
  },
  {
    date: "Mar",
    "Skill Assessments": 4,
    "Job Applications": 7,
    "Courses Completed": 2,
  },
  {
    date: "Apr",
    "Skill Assessments": 3,
    "Job Applications": 4,
    "Courses Completed": 3,
  },
  {
    date: "May",
    "Skill Assessments": 5,
    "Job Applications": 6,
    "Courses Completed": 1,
  },
  {
    date: "Jun",
    "Skill Assessments": 4,
    "Job Applications": 8,
    "Courses Completed": 2,
  },
]

export function ActivityChart({ fullSize = false }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={fullSize ? "aspect-[3/1] w-full" : "aspect-[4/3] w-full"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="date" tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <YAxis tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              color: isDark ? "#f9fafb" : "#111827",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Skill Assessments"
            stroke={isDark ? "#a78bfa" : "#8b5cf6"}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Job Applications"
            stroke={isDark ? "#f472b6" : "#ec4899"}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Courses Completed"
            stroke={isDark ? "#67e8f9" : "#06b6d4"}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

