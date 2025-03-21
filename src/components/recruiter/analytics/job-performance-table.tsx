"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

type JobPerformanceData = {
  id: string
  title: string
  department: string
  applicants: number
  interviews: number
  offers: number
  timeToFill: number
  conversionRate: number
  trend: "up" | "down" | "neutral"
}

const jobData: JobPerformanceData[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    applicants: 145,
    interviews: 12,
    offers: 3,
    timeToFill: 28,
    conversionRate: 2.1,
    trend: "up",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    applicants: 98,
    interviews: 10,
    offers: 2,
    timeToFill: 35,
    conversionRate: 2.0,
    trend: "down",
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    applicants: 76,
    interviews: 8,
    offers: 2,
    timeToFill: 21,
    conversionRate: 2.6,
    trend: "up",
  },
  {
    id: "4",
    title: "Backend Engineer",
    department: "Engineering",
    applicants: 112,
    interviews: 15,
    offers: 4,
    timeToFill: 32,
    conversionRate: 3.6,
    trend: "up",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    applicants: 64,
    interviews: 7,
    offers: 2,
    timeToFill: 18,
    conversionRate: 3.1,
    trend: "neutral",
  },
]

const JobPerformanceTable = () => {
  // Axios call to fetch job performance data
  // useEffect(() => {
  //   const fetchJobPerformance = async () => {
  //     try {
  //       const response = await axios.get('/api/analytics/job-performance');
  //       // Update state with response data
  //     } catch (error) {
  //       console.error('Error fetching job performance data:', error);
  //     }
  //   };
  //   fetchJobPerformance();
  // }, []);

  const renderTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "neutral":
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Job Performance</CardTitle>
        <CardDescription>Performance metrics for active job postings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Applicants</TableHead>
              <TableHead className="text-right">Interviews</TableHead>
              <TableHead className="text-right">Offers</TableHead>
              <TableHead className="text-right">Time to Fill (days)</TableHead>
              <TableHead className="text-right">Conversion Rate (%)</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobData.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{job.department}</Badge>
                </TableCell>
                <TableCell className="text-right">{job.applicants}</TableCell>
                <TableCell className="text-right">{job.interviews}</TableCell>
                <TableCell className="text-right">{job.offers}</TableCell>
                <TableCell className="text-right">{job.timeToFill}</TableCell>
                <TableCell className="text-right">{job.conversionRate.toFixed(1)}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">{renderTrendIcon(job.trend)}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default JobPerformanceTable

