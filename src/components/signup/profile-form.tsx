"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProfileFormProps {
  resumeUploaded: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ProfileForm({ resumeUploaded, onSubmit, isLoading }: ProfileFormProps) {
  // Pre-filled data if resume was uploaded




  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    skills: string[];
    newSkill: string;
    experience: Experience[];
    education: Education[];
  }

  interface Experience {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }

  interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: resumeUploaded ? "John" : "",
    lastName: resumeUploaded ? "Doe" : "",
    email: resumeUploaded ? "john.doe@example.com" : "",
    phone: resumeUploaded ? "+1 (555) 123-4567" : "",
    location: resumeUploaded ? "San Francisco, CA" : "",
    title: resumeUploaded ? "Senior Frontend Developer" : "",
    summary: resumeUploaded
      ? "Experienced frontend developer with 5+ years of experience in building responsive web applications using React, JavaScript, and modern frontend technologies."
      : "",
    skills: resumeUploaded ? ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"] : [],
    newSkill: "",
    experience: resumeUploaded
      ? [
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
        ]
      : [],
    education: resumeUploaded
      ? [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            startDate: "2014-09",
            endDate: "2018-05",
            current: false,
          },
        ]
      : [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim() !== "" && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {resumeUploaded 
              ? "We've extracted this information from your resume. Please review and edit if necessary." 
              : "Please fill in your personal information."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Professional Summary</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Write a brief summary of your professional background and goals.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea 
              id="summary" 
              name="summary" 
              value={formData.summary} 
              onChange={handleChange} 
              placeholder="Experienced frontend developer with a passion for creating user-friendly interfaces..." 
              rows={4} 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Skills</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your technical and professional skills.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full"
              >
                <span>{skill}</span>
                <button 
                  type="button" 
                  onClick={() => removeSkill(skill)}
                  className="h-4 w-4 rounded-full hover:bg-primary/20 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="newSkill" 
                name="newSkill" 
                value={formData.newSkill} 
                onChange={handleChange} 
                className="pl-10" 
                placeholder="Add a skill (e.g., JavaScript, React)" 
              />
            </div>
            <Button type="button" onClick={addSkill}>Add</Button>
          </div>
        </div>
        
        <Accordion type="single" collapsible defaultValue="experience">
          <AccordionItem value="experience">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                      {exp.current 
                        ? ' Present' 
                        : ` ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{exp.description}</p>
                </div>
              ))}
              
              <Button type="button" variant="outline" className="w-full mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Work Experience
              </Button>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="education">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <span>Education</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                      {edu.current 
                        ? ' Present' 
                        : ` ${new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button type="button" variant="outline" className="w-full mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating your profile...
            </>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </form>
  )
}

