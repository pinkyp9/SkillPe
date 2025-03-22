"use client"
import { Briefcase, Award, BookOpen, Trophy, TrendingUp, Clock, CheckCircle2, BookMarked } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ProfileHeader } from "@/components/profile-header"
import { SkillsChart } from "@/components/skills-chart"
import { ActivityChart } from "@/components/activity-chart"
import { AppliedJobsList } from "@/components/applied-jobs-list"
import { SavedJobsList } from "@/components/saved-jobs-list"
import { ResumeGenerator } from "@/components/profile/resume-generator"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <ProfileHeader />

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Credits Balance"
              value="100"
              description="Available credits"
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
            />
            <StatsCard
              title="Skills Assessed"
              value="8"
              description="Out of 24 recommended"
              icon={<Award className="h-5 w-5 text-primary" />}
            />
            <StatsCard
              title="Courses Completed"
              value="3"
              description="5 in progress"
              icon={<BookOpen className="h-5 w-5 text-primary" />}
            />
            <StatsCard
              title="Jobs Applied"
              value="12"
              description="4 responses received"
              icon={<Briefcase className="h-5 w-5 text-primary" />}
            />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
                <CardDescription>Your skill proficiency based on assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart />
                <div className="mt-4 space-y-4">
                  <ActivityItem
                    icon={<Award className="h-5 w-5 text-purple-500" />}
                    title="Completed React Assessment"
                    time="2 days ago"
                    score="92%"
                    company=""
                    progress=""
                    rank=""
                  />
                  <ActivityItem
                    icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                    title="Applied to Frontend Developer"
                    time="3 days ago"
                    company="TechCorp"
                    score=""
                    progress=""
                    rank=""
                  />
                  <ActivityItem
                    icon={<BookOpen className="h-5 w-5 text-green-500" />}
                    title="Completed Node.js Course"
                    time="1 week ago"
                    progress="100%"
                    score=""
                    company=""
                    rank=""
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Challenges</CardTitle>
                <CardDescription>Challenges you might be interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ChallengeItem
                    title="Web Development Hackathon"
                    company="Google"
                    date="May 15, 2023"
                    participants={120}
                  />
                  <ChallengeItem
                    title="AI Algorithm Challenge"
                    company="Microsoft"
                    date="May 22, 2023"
                    participants={85}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Skills</CardTitle>
                <CardDescription>Skills to improve your job prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RecommendedSkill name="TypeScript" relevance={92} jobsRequiring={156} />
                  <RecommendedSkill name="React Native" relevance={85} jobsRequiring={124} />
                  <RecommendedSkill name="GraphQL" relevance={78} jobsRequiring={98} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkillCard name="JavaScript" level="Advanced" score={92} lastAssessed="2 weeks ago" />
            <SkillCard name="React" level="Advanced" score={88} lastAssessed="2 days ago" />
            <SkillCard name="Node.js" level="Intermediate" score={76} lastAssessed="1 month ago" />
            <SkillCard name="Python" level="Intermediate" score={72} lastAssessed="3 months ago" />
            <SkillCard name="CSS/SCSS" level="Advanced" score={85} lastAssessed="2 weeks ago" />
            <SkillCard name="SQL" level="Intermediate" score={78} lastAssessed="1 month ago" />
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <ActivityChart fullSize />
          <div className="mt-6 space-y-4">
            <ActivityItem
              icon={<Award className="h-5 w-5 text-purple-500" />}
              title="Completed React Assessment"
              time="2 days ago"
              score="92%"
              company=""
              progress=""
              rank=""
              expanded
            />
            <ActivityItem
              icon={<Briefcase className="h-5 w-5 text-blue-500" />}
              title="Applied to Frontend Developer"
              time="3 days ago"
              company="TechCorp"
              score={undefined}
              progress={undefined}
              rank={undefined}
              expanded
            />
            <ActivityItem
              icon={<BookOpen className="h-5 w-5 text-green-500" />}
              title="Completed Node.js Course"
              time="1 week ago"
              progress="100%"
              score={undefined}
              company={undefined}
              rank={undefined}
              expanded
            />
            <ActivityItem
              icon={<Trophy className="h-5 w-5 text-yellow-500" />}
              title="Participated in Web Dev Challenge"
              time="2 weeks ago"
              score={undefined}
              company={undefined}
              progress={undefined}
              rank="12th"
              expanded
            />
            
          </div>
        </TabsContent>
        <TabsContent value="resume">
          <ResumeGenerator/></TabsContent>

        <TabsContent value="applied">
          <AppliedJobsList />
        </TabsContent>

        <TabsContent value="saved">
          <SavedJobsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, value, description, icon }: { title: string; value: string; description: string; icon: JSX.Element }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ icon, title, time, score, company, progress, rank, expanded = false }: { icon: JSX.Element; title: string; time: string; score?: string; company?: string; progress?: string; rank?: string; expanded?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${expanded ? "p-3 border rounded-lg" : ""}`}>
      <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        {score && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Score: {score}
            </Badge>
          </div>
        )}
        {company && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {company}
            </Badge>
          </div>
        )}
        {progress && (
          <div className="mt-2">
            <Progress value={Number.parseInt(progress)} className="h-2" />
          </div>
        )}
        {rank && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              Ranked {rank}
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}

function ChallengeItem({ title, company, date, participants }: { title: string; company: string; date: string; participants: number }) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      <div className="bg-primary/10 p-2 rounded-md">
        <Trophy className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">By {company}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {participants} participants
          </Badge>
        </div>
      </div>
    </div>
  )
}

function RecommendedSkill({ name, relevance, jobsRequiring }: { name: string; relevance: number; jobsRequiring: number }) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      <div className="bg-primary/10 p-2 rounded-md">
        <Award className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Relevance</span>
            <span className="text-xs font-medium">{relevance}%</span>
          </div>
          <Progress value={relevance} className="h-2" />
        </div>
        <div className="mt-2">
          <Badge variant="outline" className="text-xs">
            {jobsRequiring} jobs requiring this skill
          </Badge>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ name, level, score, lastAssessed }: { name: string; level: string; score: number; lastAssessed: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Badge
            className={`
            ${level === "Beginner" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : ""}
            ${level === "Intermediate" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : ""}
            ${level === "Advanced" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
          `}
          >
            {level}
          </Badge>
        </div>
        <CardDescription>Last assessed: {lastAssessed}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Proficiency</span>
          <span className="text-sm font-medium">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
        <div className="flex justify-between mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Verified
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BookMarked className="h-3 w-3" /> Take again
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

