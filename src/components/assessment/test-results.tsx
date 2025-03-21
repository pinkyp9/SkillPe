"use client"

import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function TestResults({ testCases, results, isRunning }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Test Cases</h3>
        {isRunning && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Running tests...
          </div>
        )}
      </div>

      <div className="space-y-3">
        {testCases.map((testCase, index) => {
          const result = results && results[index]

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                !result
                  ? "bg-muted"
                  : result.passed
                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Test Case {index + 1}</div>
                {result && (
                  <div className="flex items-center gap-1">
                    {result.passed ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-600 dark:text-green-400">Passed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-red-600 dark:text-red-400">Failed</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Input:</div>
                  <div className="font-mono bg-background p-2 rounded">{JSON.stringify(testCase.input)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Expected Output:</div>
                  <div className="font-mono bg-background p-2 rounded">{JSON.stringify(testCase.expected)}</div>
                </div>
                {result && !result.passed && (
                  <div className="col-span-2">
                    <div className="text-muted-foreground mb-1">Your Output:</div>
                    <div className="font-mono bg-background p-2 rounded">{JSON.stringify(result.actual)}</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

