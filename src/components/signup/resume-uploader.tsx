"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeUploader({ onUpload, isLoading }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    const fileType = file.type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!validTypes.includes(fileType)) {
      setError("Please upload a PDF or Word document")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return
    }

    setError("")
    setFile(file)
    onUpload(file)
  }

  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"}
          ${error ? "border-destructive/50 bg-destructive/5" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleChange} />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <div className="absolute -right-2 -top-2 rounded-full bg-primary p-1">
                  <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                </div>
              </div>
              <div>
                <p className="font-medium">Processing your resume...</p>
                <p className="text-sm text-muted-foreground">We're extracting information from your resume.</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-2 w-full rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </div>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <div className="absolute -right-2 -top-2 rounded-full bg-green-500 p-1">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button variant="outline" onClick={onButtonClick}>
                Choose a different file
              </Button>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  Drag and drop your resume here, or{" "}
                  <span className="text-primary cursor-pointer hover:underline" onClick={onButtonClick}>
                    browse
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX (Max 5MB)</p>
              </div>
              {error && (
                <div className="flex items-center text-destructive gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

