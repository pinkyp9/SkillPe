"use client"

import { useState } from "react"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Download, FileText, Eye } from "lucide-react"

// Define TypeScript interfaces
interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  links: {
    LinkedIn?: string;
    GitHub?: string;
    Portfolio?: string;
  };
}

interface SkillData {
  skills: string[];
  score: number;
  percentage: number;
}

interface CareerPrediction {
  recommended_field: string;
  field_scores: {
    [key: string]: number;
  };
}

interface Experience {
  role: string;
  skills: string[];
  duration: string;
  description: string;
}

interface ResumeData {
  personal_details: PersonalDetails;
  skills_analysis: {
    [category: string]: SkillData;
  };
  career_prediction: CareerPrediction;
  experiences: Experience[];
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #eaeaea",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 5,
  },
  skillItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  skillName: {
    fontSize: 10,
  },
  skillScore: {
    fontSize: 10,
    color: "#8b5cf6",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  experienceCompany: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 3,
  },
  experienceDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 3,
  },
  experienceDescription: {
    fontSize: 9,
    marginBottom: 5,
  },
})

// Resume PDF Document Component based on original resume data
const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData.personal_details.name}</Text>
        <Text style={styles.title}>{resumeData.career_prediction.recommended_field} Specialist</Text>
        <View style={styles.contactInfo}>
          <Text>{resumeData.personal_details.email}</Text>
          <Text>{resumeData.personal_details.phone}</Text>
          <Text>{resumeData.personal_details.links.LinkedIn || ""}</Text>
        </View>
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {Object.entries(resumeData.skills_analysis)
          .sort(([, a], [, b]) => b.percentage - a.percentage)
          .slice(0, 5)
          .map(([category, data]) => (
            <View key={category} style={{ marginBottom: 10 }}>
              <Text style={styles.skillCategory}>
                {category} ({data.percentage.toFixed(1)}%)
              </Text>
              {data.skills.map((skill) => (
                <View key={skill} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill}</Text>
                  <Text style={styles.skillScore}>Advanced</Text>
                </View>
              ))}
            </View>
          ))}
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {resumeData.experiences.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.experienceTitle}>{exp.role.split("|")[1] || exp.role}</Text>
            <Text style={styles.experienceCompany}>{exp.role.split("|")[0] || "Company"}</Text>
            <Text style={styles.experienceDate}>{exp.duration || "Present"}</Text>
            <Text style={styles.experienceDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export function ResumeGenerator() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("preview")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [resumeContent, setResumeContent] = useState<string>("")
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsUploading(true)

      // Create a URL for the uploaded file for preview
      const fileUrl = URL.createObjectURL(file)
      setResumeUrl(fileUrl)

      // Read file content if needed (for text files)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setResumeContent(content)
      }
      
      // For PDFs you would only use the URL above, not the content
      // But for demo purposes, we'll read text content too
      if (file.type === 'text/plain') {
        reader.readAsText(file)
      }

      // Simulate API call to analyze resume
      setTimeout(() => {
        // Here we still set the analysis data based on the resume
        setResumeData({
          personal_details: {
            name: file.name.split('.')[0].replace(/_/g, ' '),
            email: "your.email@example.com",
            phone: "+1 (555) 123-4567",
            links: {
              LinkedIn: "https://linkedin.com/in/yourprofile",
            },
          },
          skills_analysis: {
            "Software Development": {
              skills: ["JavaScript", "React", "TypeScript", "Node.js", "Git"],
              score: 10,
              percentage: 27.03,
            },
            "Web Development": {
              skills: ["HTML", "CSS", "React", "JavaScript", "Bootstrap"],
              score: 7,
              percentage: 18.92,
            },
            "Data Science & Analytics": {
              skills: ["Python", "SQL", "Pandas", "NumPy", "Data Visualization"],
              score: 7,
              percentage: 18.92,
            },
            "Machine Learning & AI": {
              skills: ["TensorFlow", "NLP", "Neural Networks"],
              score: 3,
              percentage: 8.11,
            },
            "Database Management": {
              skills: ["SQL", "MongoDB", "MySQL", "PostgreSQL"],
              score: 4,
              percentage: 10.81,
            },
          },
          career_prediction: {
            recommended_field: "Full Stack Development",
            field_scores: {
              "Web Development": 38.89,
              "Software Development": 36.67,
              "Data Science & Analytics": 22.22,
              "Machine Learning & AI": 12.22,
            },
          },
          experiences: [
            {
              role: "TechCorp | Senior Frontend Developer",
              skills: ["React", "TypeScript", "Redux"],
              duration: "2020 - Present",
              description:
                "Led the development of responsive web applications using React and TypeScript.",
            },
            {
              role: "WebSolutions Inc. | Frontend Developer",
              skills: ["JavaScript", "HTML", "CSS"],
              duration: "2018 - 2020",
              description:
                "Developed and maintained client websites using JavaScript, HTML, and CSS.",
            },
          ],
        })
        
        setIsUploading(false)
      }, 2000)
    }
  }

  // Function to render the uploaded file preview
  const renderFilePreview = () => {
    if (!uploadedFile || !resumeUrl) return null

    // Based on file type, render appropriate preview
    if (uploadedFile.type === 'application/pdf') {
      return (
        <div className="h-full flex items-center justify-center">
          <iframe 
            src={resumeUrl} 
            className="w-full h-screen max-h-[800px]" 
            title="Resume PDF Preview"
          />
        </div>
      )
    } else if (uploadedFile.type.includes('image')) {
      return (
        <div className="flex items-center justify-center">
          <img 
            src={resumeUrl} 
            alt="Resume" 
            className="max-w-full max-h-[800px] object-contain" 
          />
        </div>
      )
    } else if (uploadedFile.type === 'text/plain' || resumeContent) {
      return (
        <div className="p-6 border rounded-lg bg-white">
          <pre className="whitespace-pre-wrap">{resumeContent}</pre>
        </div>
      )
    } else {
      // For other file types (like docx), show a message
      return (
        <div className="text-center p-8">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium mb-2">File Preview Not Available</h3>
          <p className="text-muted-foreground">
            Preview is not available for this file type, but your resume has been analyzed.
          </p>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your existing resume to extract information and analyze your skills.
            </p>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("resume-upload")?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                "Choose File"
              )}
            </Button>
            {uploadedFile && <p className="mt-2 text-sm text-muted-foreground">{uploadedFile.name}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Only show results after file upload */}
      {resumeData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Skills Analysis</h3>
                <div className="space-y-4">
                  {Object.entries(resumeData.skills_analysis)
                    .sort(([, a], [, b]) => b.percentage - a.percentage)
                    .map(([category, data]) => (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm font-medium">{data.percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={data.percentage} className="h-2" />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {data.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-primary/10">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Career Recommendation</h3>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Recommended Field</span>
                    <Badge className="bg-primary/20 text-primary">{resumeData.career_prediction.recommended_field}</Badge>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(resumeData.career_prediction.field_scores)
                      .sort(([, a], [, b]) => b - a)
                      .map(([field, score]) => (
                        <div key={field}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{field}</span>
                            <span className="text-sm">{score.toFixed(1)}%</span>
                          </div>
                          <Progress value={score} className="h-1" />
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Original Resume</TabsTrigger>
                  <TabsTrigger value="enhanced">Enhanced Resume</TabsTrigger>
                  <TabsTrigger value="download">Download Resume</TabsTrigger>
                </TabsList>

                {/* Original Resume Preview */}
                <TabsContent value="preview" className="mt-0">
                  {renderFilePreview()}
                </TabsContent>

                {/* Enhanced Resume Preview */}
                <TabsContent value="enhanced" className="mt-0">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="mb-6 border-b pb-4">
                      <h1 className="text-2xl font-bold">{resumeData.personal_details.name}</h1>
                      <p className="text-lg text-muted-foreground">
                        {resumeData.career_prediction.recommended_field} Specialist
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{resumeData.personal_details.email}</span>
                        <span>{resumeData.personal_details.phone}</span>
                        <span>{resumeData.personal_details.links.LinkedIn}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-3 pb-1 border-b">Skills</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(resumeData.skills_analysis)
                          .sort(([, a], [, b]) => b.percentage - a.percentage)
                          .slice(0, 5)
                          .map(([category, data]) => (
                            <div key={category}>
                              <h3 className="font-medium">{category}</h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {data.skills.slice(0, 5).map((skill) => (
                                  <Badge key={skill} variant="outline" className="bg-primary/10">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-3 pb-1 border-b">Experience</h2>
                      {resumeData.experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-medium">{exp.role.split("|")[1] || exp.role}</h3>
                          <p className="text-sm text-muted-foreground italic">
                            {exp.role.split("|")[0] || "Company"} | {exp.duration || "Present"}
                          </p>
                          <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Download Option */}
                <TabsContent value="download" className="mt-0">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="mb-6 text-center">
                      <Eye className="h-16 w-16 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Your Enhanced Resume is Ready!</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Your resume has been enhanced with skills analysis and career recommendations.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <PDFDownloadLink
                        document={<ResumePDF resumeData={resumeData} />}
                        fileName={`${resumeData.personal_details.name.replace(/\s+/g, "_")}_Enhanced_Resume.pdf`}
                        className="inline-flex"
                      >
                        {({ blob, url, loading, error }) => (
                          <Button disabled={loading}>
                            {loading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            Download Enhanced Resume
                          </Button>
                        )}
                      </PDFDownloadLink>

                      <Button variant="outline" onClick={() => setActiveTab("preview")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Original
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}