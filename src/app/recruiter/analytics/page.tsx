"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Briefcase, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/recruiter/page-header"
import { HiringFunnelChart } from "@/components/recruiter/analytics/hiring-funnel-chart"
import { TimeToHireChart } from "@/components/recruiter/analytics/time-to-hire-chart"
import { SourceQualityChart } from "@/components/recruiter/analytics/source-quality-chart"
import { SkillDistributionChart } from "@/components/recruiter/analytics/skill-distribution-chart"
import DiversityChart from "@/components/recruiter/analytics/diversity-chart"
import CostPerHireChart from "@/components/recruiter/analytics/cost-per-hire" // Ensure this file exists or update the path
import JobPerformanceTable from "@/components/recruiter/analytics/job-performance-table"
import CandidateInsightsTable from "@/components/recruiter/analytics/candidates-insights-table" // Ensure this file exists or correct the path

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Recruitment Analytics"
        description="Track and analyze your recruitment performance"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setTimeRange("7d")}>
              7 Days
            </Button>
            <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
              30 Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange("90d")}>
              90 Days
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Applicants"
          value="248"
          change="+12%"
          trend="up"
          description="vs. previous period"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Open Positions"
          value="12"
          change="+2"
          trend="up"
          description="vs. previous period"
          icon={<Briefcase className="h-5 w-5" />}
        />
        <StatsCard
          title="Hired"
          value="18"
          change="+5"
          trend="up"
          description="vs. previous period"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatsCard
          title="Time to Hire"
          value="14 days"
          change="-2 days"
          trend="down"
          description="vs. previous period"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="diversity">Diversity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Funnel</CardTitle>
                <CardDescription>Conversion rates through each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <HiringFunnelChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time to Hire</CardTitle>
                <CardDescription>Average days to fill positions by department</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeToHireChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Quality</CardTitle>
                <CardDescription>Applicant quality by source</CardDescription>
              </CardHeader>
              <CardContent>
                <SourceQualityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Per Hire</CardTitle>
                <CardDescription>Average cost per hire by department</CardDescription>
              </CardHeader>
              <CardContent>
                <CostPerHireChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Performance</CardTitle>
              <CardDescription>Performance metrics for active and closed jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <JobPerformanceTable />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Most common skills among applicants</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillDistributionChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time to Fill by Job Type</CardTitle>
                <CardDescription>Average days to fill different job types</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeToHireChart byJobType />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Insights</CardTitle>
              <CardDescription>Performance metrics for candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <CandidateInsightsTable />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Experience</CardTitle>
                <CardDescription>Feedback scores from candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Candidate experience data visualization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rejection Reasons</CardTitle>
                <CardDescription>Common reasons for candidate rejection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Rejection reasons data visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diversity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Gender breakdown of applicants and hires</CardDescription>
              </CardHeader>
              <CardContent>
                <DiversityChart type="gender" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Age breakdown of applicants and hires</CardDescription>
              </CardHeader>
              <CardContent>
                <DiversityChart type="age" />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Diversity Trends</CardTitle>
                <CardDescription>Diversity metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Diversity trends data visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, value, change, trend, description, icon }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
            {trend && (
              <div
                className={`flex items-center gap-1 ${trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

