"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Camera, 
  Webcam,
  Mic,
  AlertCircle,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CodingInterface from "@/components/CodingInterface"
import ResultScreen from "@/components/ResultScreen"

// Sample assessment data
const assessment = {
  title: "JavaScript Fundamentals",
  category: "Programming",
  duration: "45 minutes",
  totalQuestions: 20,
  questions: [
    {
      id: 1,
      type: "mcq",
      question: "Which of the following is not a primitive data type in JavaScript?",
      options: ["String", "Number", "Object", "Boolean"],
      correctAnswer: "Object",
    },
    {
      id: 2,
      type: "mcq",
      question: "What will be the output of: console.log(typeof null)?",
      options: ["null", "undefined", "object", "string"],
      correctAnswer: "object",
    },
    {
      id: 3,
      type: "shortAnswer",
      question: "Explain the difference between '==' and '===' operators in JavaScript with an example.",
      maxLength: 250,
    },
    {
      id: 4,
      type: "coding",
      question: "Write a function that reverses a string without using the built-in reverse() method.",
      language: "javascript",
      initialCode: "function reverseString(str) {\n  // Your code here\n}",
      testCases: [
        { input: "hello", expected: "olleh" },
        { input: "JavaScript", expected: "tpircSavaJ" },
      ],
    },
    {
      id: 5,
      type: "mcq",
      question: "Which method is used to add elements to the end of an array?",
      options: ["push()", "pop()", "unshift()", "shift()"],
      correctAnswer: "push()",
    },
    // More questions would be added here for a real assessment
  ],
};

interface AssessmentInterfaceProps {
  onClose: () => void;
}

export default function AssessmentInterface({ onClose }: AssessmentInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [proctorWarnings, setProctorWarnings] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("question");
  const [trustScore, setTrustScore] = useState(100);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulated proctor warnings
    const warningTimeout = setTimeout(() => {
      setProctorWarnings((prev) => [...prev, "Multiple faces detected"]);
      setTrustScore(92);
    }, 20000);

    return () => {
      clearInterval(timer);
      clearTimeout(warningTimeout);
    };
  }, []);

const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
};

  const handleComplete = () => {
    setIsComplete(true);
  };

interface FormatTimeProps {
    seconds: number;
}

const formatTime = (seconds: FormatTimeProps['seconds']): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

  const question = assessment.questions[currentQuestion];

  if (isComplete) {
    return <ResultScreen onClose={onClose} assessment={assessment} answers={answers} trustScore={trustScore} />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header with timer and progress */}
      <div className="bg-white dark:bg-slate-800 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">{assessment.title}</h1>
            <Badge>{assessment.category}</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-green-500" />
              <Mic className="h-4 w-4 text-green-500" />
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Trust: {trustScore}%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{currentQuestion + 1} / {assessment.totalQuestions}</span>
          </div>
          <Progress value={(currentQuestion + 1) / assessment.totalQuestions * 100} className="h-2" />
        </div>
      </div>

      {/* Proctor warnings */}
      {proctorWarnings.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto mt-4"
        >
          <Card className="bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Proctor Warning</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-400 list-disc pl-5 mt-1">
                    {proctorWarnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                  <p className="text-xs mt-1 text-yellow-700 dark:text-yellow-400">
                    These warnings may affect your trust score. Please ensure you're in a private environment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Question content */}
      <div className="container mx-auto py-6 px-4">
        {question.type === "coding" ? (
          <div className="mb-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-4">
              <h2 className="text-xl font-bold mb-3">Question {currentQuestion + 1}</h2>
              <p className="mb-4">{question.question}</p>
            </div>
            <CodingInterface 
              question={question as CodingQuestion} 
              onSubmit={(code: string) => handleAnswer(question.id, code)} 
            />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Question {currentQuestion + 1}</h2>
              <Badge variant="outline">{question.type === "mcq" ? "Multiple Choice" : "Short Answer"}</Badge>
            </div>
            
            <p className="text-lg mb-6">{question.question}</p>
            
            {question.type === "mcq" && (
              <RadioGroup 
                value={answers[question.id]} 
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {question.type === "shortAnswer" && (
              <div className="space-y-2">
                <Textarea 
                  placeholder="Type your answer here..." 
                  className="min-h-32"
                  maxLength={question.maxLength}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
                <div className="text-right text-sm text-muted-foreground">
                  {(answers[question.id]?.length || 0)}/{question.maxLength} characters
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {currentQuestion < assessment.questions.length - 1 ? (
            <Button 
              onClick={() => setCurrentQuestion(prev => Math.min(assessment.questions.length - 1, prev + 1))}
              disabled={!answers[question.id]}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={Object.keys(answers).length < assessment.questions.length}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Assessment <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}