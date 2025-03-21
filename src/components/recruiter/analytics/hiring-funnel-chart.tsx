"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  {
    name: "Applications",
    value: 248,
    fill: "#8b5cf6",
  },
  {
    name: "Screened",
    value: 180,
    fill: "#a78bfa",
  },
  {
    name: "Interviews",
    value: 95,
    fill: "#c4b5fd",
  },
  {
    name: "Offers",
    value: 35,
    fill: "#ddd6fe",
  },
  {
    name: "Hired",
    value: 18,
    fill: "#ede9fe",
  },
]

export function HiringFunnelChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="name" tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <YAxis tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              color: isDark ? "#f9fafb" : "#111827",
            }}
            formatter={(value) => [`${value} candidates`, "Count"]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

