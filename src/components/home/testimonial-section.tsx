"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      content:
        "SkillPe completely changed my job search. The skill assessments helped me showcase my abilities, and I found a job that perfectly matches my skills.",
      author: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      content:
        "As someone who doesn't have a traditional educational background, SkillPe was a game-changer. I could prove my skills through assessments and challenges.",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      content:
        "The courses on SkillPe helped me upskill and land a better job. The credit system is also a great way to apply for jobs that truly match my abilities.",
      author: "Emily Rodriguez",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What our users say
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Thousands of job seekers have found their perfect job match through SkillPe.
          </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="rounded-xl border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

