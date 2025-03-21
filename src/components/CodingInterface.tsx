"use client"

import { useState, useEffect } from "react"
import { Play, CheckCircle, XCircle, Code, BookOpen, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Question {
  initialCode?: string;
  language?: string;
  question: string;
  testCases: { input: any; expected: any }[];
}

export default function CodingInterface({ question, onSubmit }: { question: Question; onSubmit: (code: string) => void }) {
  const [code, setCode] = useState(question.initialCode || "")
  const [activeTab, setActiveTab] = useState("problem")
  const [testResults, setTestResults] = useState<{ id: number; input: any; expected: any; actual: any; passed: boolean; }[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(question.language || "javascript")

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
  ]

  const runTests = () => {
    setIsRunning(true)
    setConsoleOutput("Running tests...\n")
    
    // Simulate test execution with a delay
    setTimeout(() => {
      try {
        // This is a simplified simulation of test execution
        // In a real implementation, you would evaluate the code against test cases
        const results = question.testCases.map((testCase, index) => {
          // Simulate some test passes and some failures
          const passed = code.length > 20 && index % 2 === 0;
          
          return {
            id: index,
            input: testCase.input,
            expected: testCase.expected,
            actual: passed ? testCase.expected : `"${testCase.input.split('').reverse().join('')}"`,
            passed: passed,
          }
        })
        
        setTestResults(results)
        
        const allPassed = results.every(r => r.passed)
        const passCount = results.filter(r => r.passed).length
        
        setConsoleOutput(prev => prev +
          `Executed ${results.length} tests.\n` +
          `Passed: ${passCount}, Failed: ${results.length - passCount}\n` +
          (allPassed ? "All tests passed! ✓\n" : "Some tests failed. ✗\n")
        )
        
        setActiveTab("results")
      } catch (error) {
        setConsoleOutput(prev => prev + `Error executing code: ${error instanceof Error ? error.message : "Unknown error"}\n`)
      } finally {
        setIsRunning(false)
      }
    }, 1500)
  }

  const handleSubmit = () => {
    runTests()
    // Wait for tests to complete, then submit
    setTimeout(() => {
      onSubmit(code)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left panel - Problem statement and instructions */}
      <div className="space-y-4">
        <Card className="bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="problem" className="flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="results" className="flex-1">
                  <Terminal className="mr-2 h-4 w-4" />
                  Test Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="problem" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Instructions</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{question.question}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Test Cases</h3>
                    <div className="space-y-2">
                      {question.testCases.map((testCase, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md text-sm">
                          <p>
                            <span className="font-mono font-bold">Input:</span>{" "}
                            <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                              {JSON.stringify(testCase.input)}
                            </code>
                          </p>
                          <p>
                            <span className="font-mono font-bold">Expected:</span>{" "}
                            <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                              {JSON.stringify(testCase.expected)}
                            </code>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Test Results</h3>
                  {testResults.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Run tests to see results</p>
                  ) : (
                    <div className="space-y-3">
                      {testResults.map((result) => (
                        <div 
                          key={result.id} 
                          className={`p-3 rounded-md ${
                            result.passed 
                              ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900" 
                              : "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className={`font-medium ${result.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                              Test Case {result.id + 1} {result.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          
                          <div className="mt-2 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="font-mono text-xs font-bold mb-1">Input:</p>
                                <code className="font-mono text-xs bg-white dark:bg-slate-800 p-1 rounded block">
                                  {JSON.stringify(result.input)}
                                </code>
                              </div>
                              <div>
                                <p className="font-mono text-xs font-bold mb-1">Expected:</p>
                                <code className="font-mono text-xs bg-white dark:bg-slate-800 p-1 rounded block">
                                  {JSON.stringify(result.expected)}
                                </code>
                              </div>
                            </div>
                            {!result.passed && (
                              <div className="mt-2">
                                <p className="font-mono text-xs font-bold mb-1">Actual:</p>
                                <code className="font-mono text-xs bg-white dark:bg-slate-800 p-1 rounded block text-red-600 dark:text-red-400">
                                  {JSON.stringify(result.actual)}
                                </code>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Console output */}
                <div>
                  <h3 className="font-medium mb-2">Console Output</h3>
                  <div className="bg-slate-900 text-slate-100 p-3 rounded-md font-mono text-sm h-32 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{consoleOutput || "No output yet."}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right panel - Code editor */}
      <div className="space-y-4">
        <Card className="bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Code Editor</h3>
              </div>
              <div className="w-40">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Code editor textarea */}
            <div className="relative">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="font-mono w-full h-96 p-4 text-sm bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="outline">{selectedLanguage}</Badge>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={runTests}
                disabled={isRunning}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Run Tests
              </Button>
              
              <Button 
                variant="default"
                onClick={handleSubmit}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Submit Solution
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}