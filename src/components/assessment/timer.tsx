"use client"

export function Timer({ timeRemaining }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  const getColorClass = () => {
    if (timeRemaining < 300) {
      // Less than 5 minutes
      return "text-red-600 dark:text-red-400"
    } else if (timeRemaining < 600) {
      // Less than 10 minutes
      return "text-yellow-600 dark:text-yellow-400"
    } else {
      return "text-primary"
    }
  }

  return <div className={`font-mono font-medium ${getColorClass()}`}>{formatTime(timeRemaining)}</div>
}

