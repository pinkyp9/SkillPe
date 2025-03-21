"use client"

import type * as React from "react"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip as RechartsTooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from "recharts"

export const ChartContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export const Chart = ({
  data,
  valueFormatter,
  children,
}: { data: any[]; valueFormatter?: (value: any) => string; children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltipContent = () => {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="font-medium">Value:</div>
        <div className="text-right">100</div>
      </div>
    </div>
  )
}

export const ChartLine = ({
  dataKey,
  stroke,
  strokeWidth,
  children,
}: { dataKey: string; stroke: string; strokeWidth: number; children: React.ReactNode }) => {
  return (
    <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} activeDot={{ r: 8 }}>
      {children}
    </Line>
  )
}

export const ChartLineArea = ({ fill }: { fill: string }) => {
  return <Area type="monotone" dataKey="value" stroke={fill} fill={fill} fillOpacity={0.2} />
}

export const ChartLinePoint = () => {
  return null
}

export const ChartAxis = () => {
  return (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
    </>
  )
}

export const ChartRadar = ({
  dataKey,
  stroke,
  fill,
  children,
}: { dataKey: string; stroke: string; fill: string; children: React.ReactNode }) => {
  return (
    <RadarChart outerRadius={90} data={[]} cx="50%" cy="50%">
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar name="Value" dataKey={dataKey} stroke={stroke} fill={fill} fillOpacity={0.6} />
      {children}
      <RechartsTooltip />
    </RadarChart>
  )
}

export const ChartRadarLine = () => {
  return null
}

export const ChartRadarPoint = () => {
  return null
}

export const ChartRadarArea = () => {
  return null
}

export const ChartRadarLabel = ({ dataKey }: { dataKey: string }) => {
  return null
}

