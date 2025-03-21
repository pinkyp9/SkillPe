"use client"

import { useState, useEffect } from "react"

export function CodeEditor({ code, language, onChange }) {
  const [value, setValue] = useState(code || "")

  useEffect(() => {
    setValue(code || "")
  }, [code])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="relative rounded-md border">
      <div className="flex items-center justify-between px-3 py-2 bg-muted border-b">
        <span className="text-sm font-medium">{language}</span>
        <span className="text-xs text-muted-foreground">{value.split("\n").length} lines</span>
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        className="min-h-[400px] w-full resize-none font-mono text-sm p-4 bg-background focus:outline-none"
        spellCheck="false"
      />
    </div>
  )
}

