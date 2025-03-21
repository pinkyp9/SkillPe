"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function ProfileForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    summary:
      "Experienced frontend developer with 5+ years of experience in building responsive web applications using React, JavaScript, and modern frontend technologies.",
    skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
    newSkill: "",
    experience: [
      {
        company: "TechCorp",
        title: "Senior Frontend Developer",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description: "Developed and maintained frontend applications using React and TypeScript.",
      },
      {
        company: "WebSolutions",
        title: "Frontend Developer",
        startDate: "2018-03",
        endDate: "2019-12",
        current: false,
        description: "Built responsive web applications and implemented UI components.",
      },
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2014-09",
        endDate: "2018-05",
        current: false,
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.com",
    },
    preferences: {
      jobAlerts: true,
      remoteOnly: false,
      salary: "100000",
      jobTypes: ["Full-time"],
      locations: ["San Francisco, CA"],
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNestedChange = (category, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value,
      },
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked,
      },
    }))
  }

  const addSkill = () => {
    if (formData.newSkill.trim() !== "" && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }))
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }))
  }

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...formData.experience]
    updatedExperience[index][field] = value
    
    // If current is set to true, clear the end date
    if (field === "current" && value === true) {
      updatedExperience[index].endDate = ""
    }
    
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }))
  }

  const removeExperience = (index) => {
    const updatedExperience = [...formData.experience]
    updatedExperience.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }))
  }

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...formData.education]
    updatedEducation[index][field] = value
    
    // If current is set to true, clear the end date
    if (field === "current" && value === true) {
      updatedEducation[index].endDate = ""
    }
    
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }))
  }

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education]
    updatedEducation.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1500)

    // Actual API call would look like this:
    /*
    try {
      await axios.put('/api/profile', formData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error('Profile update failed:', error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Frontend Developer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Experienced frontend developer with a passion for creating user-friendly interfaces..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newSkill">Add a Skill</Label>
                      <div className="flex gap-2">
                        <Input
                          id="newSkill"
                          name="newSkill"
                          value={formData.newSkill}
                          onChange={handleChange}
                          placeholder="Enter a skill"
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Existing Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
        
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(index, "company", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Title"
                            value={exp.title}
                            onChange={(e) =>
                              updateExperience(index, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(index, "startDate", e.target.value)
                            }
                          />
                          <Input
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(index, "endDate", e.target.value)
                            }
                            disabled={exp.current}
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(index, "description", e.target.value)
                          }
                          rows={3}
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) =>
                              updateExperience(index, "current", e.target.checked)
                            }
                          />
                          <Label>Currently working here</Label>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addExperience}
                      className="btn btn-primary"
                    >
                      Add Experience
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
        
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(index, "institution", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Start Date"
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(index, "startDate", e.target.value)
                            }
                          />
                          <Input
                            placeholder="End Date"
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(index, "endDate", e.target.value)
                            }
                            disabled={edu.current}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={edu.current}
                            onChange={(e) =>
                              updateEducation(index, "current", e.target.checked)
                            }
                          />
                          <Label>Currently studying here</Label>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addEducation}
                      className="btn btn-primary"
                    >
                      Add Education
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
        
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.preferences.jobAlerts}
                        onChange={(e) =>
                          handleSwitchChange("jobAlerts", e.target.checked)
                        }
                      />
                      <Label>Receive job alerts</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.preferences.remoteOnly}
                        onChange={(e) =>
                          handleSwitchChange("remoteOnly", e.target.checked)
                        }
                      />
                      <Label>Remote jobs only</Label>
                    </div>
                    <Input
                      placeholder="Desired Salary"
                      value={formData.preferences.salary}
                      onChange={(e) =>
                        handleNestedChange("preferences", "salary", e.target.value)
                      }
                    />
                  </CardContent>
                </Card>
              </motion.div>
        
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )
        }

