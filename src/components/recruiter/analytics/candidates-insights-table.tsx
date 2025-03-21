"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type CandidateData = {
  id: string
  name: string
  role: string
  skillMatch: number
  assessmentScore: number
  interviewScore: number | null
  status: "Applied" | "Shortlisted" | "Interviewed" | "Offered" | "Hired" | "Rejected"
  source: string
}

const candidateData: CandidateData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Senior Frontend Developer",
    skillMatch: 92,
    assessmentScore: 88,
    interviewScore: 85,
    status: "Shortlisted",
    source: "LinkedIn",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "UX Designer",
    skillMatch: 95,
    assessmentScore: 92,
    interviewScore: 90,
    status: "Offered",
    source: "Referral",
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Backend Engineer",
    skillMatch: 87,
    assessmentScore: 90,
    interviewScore: null,
    status: "Applied",
    source: "Indeed",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Product Manager",
    skillMatch: 89,
    assessmentScore: 85,
    interviewScore: 82,
    status: "Interviewed",
    source: "Company Website",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Data Scientist",
    skillMatch: 94,
    assessmentScore: 96,
    interviewScore: 91,
    status: "Hired",
    source: "Glassdoor",
  },
]

const getStatusColor = (status: CandidateData["status"]) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800"
    case "Shortlisted":
      return "bg-purple-100 text-purple-800"
    case "Interviewed":
      return "bg-amber-100 text-amber-800"
    case "Offered":
      return "bg-green-100 text-green-800"
    case "Hired":
      return "bg-emerald-100 text-emerald-800"
    case "Rejected":
      return "bg-red-100 text-red-800"
  }
}

const CandidateInsightsTable = () => {
  // Axios call to fetch candidate insights data
  // useEffect(() => {
  //   const fetchCandidateInsights = async () => {
  //     try {
  //       const response = await axios.get('/api/analytics/candidate-insights');
  //       // Update state with response data
  //     } catch (error) {
  //       console.error('Error fetching candidate insights data:', error);
  //     }
  //   };
  //   fetchCandidateInsights();
  // }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Candidate Insights</CardTitle>
        <CardDescription>Performance metrics and status of top candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Skill Match</TableHead>
              <TableHead>Assessment Score</TableHead>
              <TableHead>Interview Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidateData.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="text-xs">{candidate.skillMatch}%</span>
                    </div>
                    <Progress value={candidate.skillMatch} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="text-xs">{candidate.assessmentScore}%</span>
                    </div>
                    <Progress value={candidate.assessmentScore} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  {candidate.interviewScore ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className="text-xs">{candidate.interviewScore}%</span>
                      </div>
                      <Progress value={candidate.interviewScore} className="h-2" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not interviewed</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(candidate.status)} variant="outline">
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default CandidateInsightsTable

