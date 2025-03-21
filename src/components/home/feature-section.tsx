"use client"

import { motion } from "framer-motion"
import { Award, Briefcase, BookOpen, Trophy, Users, Zap } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Skill Assessments",
      description: "Take assessments to verify your skills and showcase your expertise to potential employers.",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Job Matching",
      description: "Our algorithm matches you with jobs based on your verified skills and preferences.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Courses",
      description: "Improve your skills with our curated courses and increase your job prospects.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Challenges",
      description: "Participate in company-hosted challenges to showcase your skills and win prizes.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Connect with Recruiters",
      description: "Direct connection with recruiters based on your skill profile and job applications.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Credit System",
      description: "Earn credits by completing assessments and courses, and use them to apply for jobs.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Features that make SkillPe unique
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our platform is designed to focus on your skills and abilities, not just your resume.
          </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-xl border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

