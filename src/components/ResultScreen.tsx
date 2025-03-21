"use client"

import { useState } from "react"
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Shield, 
  ArrowLeft, 
  Download, 
  Share2,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ResultScreenProps {
  onClose: () => void;
  assessment: {
    title: string;
    category: string;
    duration: string;
    questions: Array<{
      id: string;
      type: "mcq" | "coding" | "shortAnswer";
      question: string;
      options?: string[];
      correctAnswer?: string;
    }>;
  };
  answers: Record<string, string>;
  trustScore: number;
}

export default function ResultScreen({ onClose, assessment, answers, trustScore }: ResultScreenProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  // Calculate the score based on correct answers
  const calculateScore = () => {
    let correct = 0
    let total = 0
    
    assessment.questions.forEach(question => {
      if (question.type === "mcq" && answers[question.id]) {
        total++
        if (answers[question.id] === question.correctAnswer) {
          correct++
        }
      }
    })
    
    // For coding questions, assume 2 points per coding question
    const codingQuestions = assessment.questions.filter(q => q.type === "coding").length
    total += codingQuestions * 2
    
    // For demo purposes, we'll assume 50% of coding questions are correct
    correct += Math.round(codingQuestions * 0.5 * 2)
    
    // Short answer questions - assume 1 point each and 75% correct
    const shortAnswerQuestions = assessment.questions.filter(q => q.type === "shortAnswer").length
    total += shortAnswerQuestions
    correct += Math.round(shortAnswerQuestions * 0.75)
    
    return {
      score: correct,
      total: total,
      percentage: Math.round((correct / total) * 100)
    }
  }
  
  const score = calculateScore()
  
  // Calculate credits earned
  const calculateCredits = () => {
    const baseCredits = score.percentage / 10
    const trustBonus = (trustScore >= 95) ? 5 : (trustScore >= 85) ? 3 : 0
    return Math.round(baseCredits + trustBonus)
  }
  
  const credits = calculateCredits()
  
  // Get performance rating
  const getPerformanceRating = () => {
    if (score.percentage >= 90) return "Exceptional"
    if (score.percentage >= 80) return "Excellent"
    if (score.percentage >= 70) return "Good"
    if (score.percentage >= 60) return "Satisfactory"
    return "Needs Improvement"
  }
  
  // Get color class based on score
  const getScoreColorClass = () => {
    if (score.percentage >= 80) return "text-green-600 dark:text-green-400"
    if (score.percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }
  
  // Get color for trust score
  const getTrustScoreColor = () => {
    if (trustScore >= 90) return "text-green-600 dark:text-green-400"
    if (trustScore >= 75) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Assessment Results</h1>
        </div>
        
        {/* Summary Card */}
        <Card className="mb-8 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-4" />
          <CardHeader className="pb-0">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{assessment.category}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {assessment.duration}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Score */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="56" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="56" 
                      fill="none" 
                      stroke={score.percentage >= 80 ? "#22c55e" : score.percentage >= 60 ? "#eab308" : "#ef4444"} 
                      strokeWidth="8" 
                      strokeDasharray={`${Math.min(score.percentage / 100 * 351.68, 351.68)} 351.68`}
                      strokeDashoffset="87.92"
                      strokeLinecap="round"
                      transform="rotate(-90 64 64)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColorClass()}`}>
                      {score.percentage}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {score.score}/{score.total} pts
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 font-medium text-center">Assessment Score</h3>
              </div>
              
              {/* Trust Score */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="56" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="56" 
                      fill="none" 
                      stroke={trustScore >= 90 ? "#22c55e" : trustScore >= 75 ? "#eab308" : "#ef4444"} 
                      strokeWidth="8" 
                      strokeDasharray={`${Math.min(trustScore / 100 * 351.68, 351.68)} 351.68`}
                      strokeDashoffset="87.92"
                      strokeLinecap="round"
                      transform="rotate(-90 64 64)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getTrustScoreColor()}`}>
                      {trustScore}%
                    </span>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Shield className="h-3 w-3 mr-1" /> Integrity
                    </div>
                  </div>
                </div>
                <h3 className="mt-2 font-medium text-center">Trust Score</h3>
              </div>
              
              {/* Credits & Performance */}
              <div className="flex flex-col justify-center">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-4 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start">
                    <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-800 dark:text-blue-300">Credits Earned</h3>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{credits}</span>
                        <span className="ml-1 text-sm text-blue-700 dark:text-blue-300">platform credits</span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        Added to your account balance
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium mb-2">Performance Rating</h3>
                  <div className="font-bold text-lg">{getPerformanceRating()}</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {score.percentage >= 70 ? 
                      "Great job! You've demonstrated strong knowledge in this area." : 
                      "You're making progress. Consider reviewing the materials and trying again."}
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Section breakdown */}
            <div>
              <h3 className="font-medium mb-4">Performance by Question Type</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Multiple Choice</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Short Answer</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Coding</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              
              <Collapsible 
                open={showDetails} 
                onOpenChange={setShowDetails}
                className="mt-6"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span>View Detailed Breakdown</span>
                    {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="space-y-4">
                    {assessment.questions.map((question, index) => (
                      <Card key={index} className="bg-slate-50 dark:bg-slate-900">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{question.type === "mcq" ? "Multiple Choice" : question.type === "shortAnswer" ? "Short Answer" : "Coding"}</Badge>
                                <span className="text-sm text-slate-500 dark:text-slate-400">Question {index + 1}</span>
                              </div>
                              <p className="mt-2">{question.question}</p>
                              
                              {question.type === "mcq" && (
                                <div className="mt-2">
                                  <div className="grid grid-cols-2 gap-2 mt-1">
                                    {question.options?.map((option, optIndex) => (
                                      <div 
                                        key={optIndex} 
                                        className={`text-sm p-2 rounded-md ${
                                          option === question.correctAnswer
                                            ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                                            : option === answers[question.id] && option !== question.correctAnswer
                                              ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
                                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                                        }`}
                                      >
                                        {option === question.correctAnswer && (
                                          <CheckCircle className="h-4 w-4 text-green-500 inline-block mr-1" />
                                        )}
                                        {option}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="ml-4 flex-shrink-0">
                              {question.type === "mcq" && (
                                <Badge className={
                                  answers[question.id] === question.correctAnswer 
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }>
                                  {answers[question.id] === question.correctAnswer ? "Correct" : "Incorrect"}
                                </Badge>
                              )}
                              
                              {question.type === "coding" && (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                  Partially Correct
                                </Badge>
                              )}
                              
                              {question.type === "shortAnswer" && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  Satisfactory
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Back to Dashboard
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Next steps */}
        <Card className="bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-50 dark:bg-slate-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Practice More</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Take related assessments to improve your skills in this area.
                  </p>
                  <Button className="w-full mt-4" variant="outline">View Similar Tests</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Improve Your Score</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Review learning materials to strengthen your knowledge.
                  </p>
                  <Button className="w-full mt-4" variant="outline">Learning Resources</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Share Results</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Add this certification to your profile and share with recruiters.
                  </p>
                  <Button className="w-full mt-4" variant="outline">Add to Profile</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}