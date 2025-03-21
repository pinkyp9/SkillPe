"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const departmentData = [
  {
    name: "Engineering",
    value: 14,
  },
  {
    name: "Design",
    value: 12,
  },
  {
    name: "Marketing",
    value: 10,
  },
  {
    name: "Sales",
    value: 8,
  },
  {
    name: "Support",
    value: 7,
  },
]

const jobTypeData = [
  {
    name: "Senior",
    value: 18,
  },
  {
    name: "Mid-level",
    value: 14,
  },
  {
    name: "Junior",
    value: 10,
  },
  {
    name: "Contract",
    value: 7,
  },
  {
    name: "Intern",
    value: 5,
  },
]

export function TimeToHireChart({ byJobType = false }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const data = byJobType ? jobTypeData : departmentData

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="name" tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <YAxis
            tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }}
            label={{
              value: "Days",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: isDark ? "#9ca3af" : "#4b5563" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              color: isDark ? "#f9fafb" : "#111827",
            }}
            formatter={(value) => [`${value} days`, "Time to Hire"]}
          />
          <Bar dataKey="value" fill={isDark ? "#a78bfa" : "#8b5cf6"} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

