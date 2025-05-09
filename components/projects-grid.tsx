"use client"

import { motion } from "framer-motion"
import ProjectCard from "./project-card"

const projects = [
  {
    id: 1,
    title: "Pick and Fit",
    description:
      "An innovative e-commerce platform with virtual try-on capabilities, allowing users to visualize clothing items before purchase.",
    image: "/ecommerce-virtual-try-on.png",
    tags: ["React", "Node.js", "MongoDB", "Express", "WebGL"],
    githubLink: "https://github.com/lokhith/pick-and-fit",
    demoLink: "https://pick-and-fit.vercel.app",
  },
  {
    id: 2,
    title: "Golf E-commerce Website",
    description:
      "A comprehensive e-commerce solution for golf enthusiasts, featuring product listings, user reviews, and secure checkout.",
    image: "/golf-ecommerce-website.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Supabase"],
    githubLink: "https://github.com/lokhith/golf-ecommerce",
    demoLink: "https://golf-ecommerce.vercel.app",
  },
  {
    id: 3,
    title: "Sportify",
    description:
      "A sports analytics platform that provides real-time statistics, match predictions, and personalized content for sports fans.",
    image: "/sports-analytics-dashboard.png",
    tags: ["React", "Redux", "Node.js", "Express", "Socket.io", "Chart.js"],
    githubLink: "https://github.com/lokhith/sportify",
    demoLink: "https://sportify-app.vercel.app",
  },
]

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  )
}
